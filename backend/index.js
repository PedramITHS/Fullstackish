const cors = require("cors");
const bodyParser = require("body-parser");

const express = require("express"),
  path = require("path");

const dotenv = require("dotenv"),
  { Client } = require("pg");

port = process.env.PORT || 3000;

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});

const app = express();
client.connect();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api", async (req, res) => {
  try {
    const { rows } = await client.query(
      "SELECT * FROM games ORDER BY game_id ASC"
    );
    res.send({
      connect: "Succesfully pulling from the backend!",
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error connecting to the database!");
  }
});

app.get("/api/:id", async (req, res) => {
  const id = req.params.id;
  const arrVal = [id];
  try {
    const { rows } = await client.query(
      "SELECT * FROM games WHERE game_id = $1",
      arrVal
    );
    res.send({
      connect: "Succesfully pulling from the backend!",
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error connecting to the database!");
  }
});

app.post("/add", async (req, res) => {
  const { genre, title, date, description, image } = req.body;
  const query =
    "INSERT INTO games (genre_id, title, release_date, description, image) VALUES ($1, $2, $3, $4, $5)";
  const arrVal = [parseInt(genre, 10), title, date, description, image];
  try {
    await client.query(query, arrVal);
    res.send("Data received successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to submit!");
  }
});

app.patch("/upd/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).send("Invalid game ID!");
  }

  // "pusha" in våra queries
  const fields = [];
  // "pusha" in våra värden
  const arrVal = [];

  // med dubbla '$' inkluderar du det i din template literal sträng
  // ParseInt i och med att det är siffra som type från databas ände
  // arrVal börja på siffran som ökar med +1 med varje insättning
  if (req.body.genre) {
    fields.push(`genre_id = $${arrVal.length + 1}`);
    arrVal.push(parseInt(req.body.genre, 10));
  }

  if (req.body.title) {
    fields.push(`title = $${arrVal.length + 1}`);
    arrVal.push(req.body.title);
  }

  if (req.body.release) {
    fields.push(`release_date = $${arrVal.length + 1}`);
    arrVal.push(req.body.release);
  }

  if (req.body.description) {
    fields.push(`description = $${arrVal.length + 1}`);
    arrVal.push(req.body.description);
  }

  if (req.body.image) {
    fields.push(`image = $${arrVal.length + 1}`);
    arrVal.push(req.body.image);
  }

  // slå ihop till en enda statement och eftersom game_id är i slutet av våran query, bör det sluta på "$6"
  if (fields.length > 0) {
    const query = `UPDATE games SET ${fields.join(", ")} WHERE game_id = $${
      arrVal.length + 1
    }`;
    arrVal.push(id);

    try {
      await client.query(query, arrVal);
      res.json({ message: "Update query received successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to submit!" });
    }
  } else {
    res.status(400).json({ error: "Field missing!" });
  }
});

app.delete("/del", async (req, res) => {
  const { gameID } = req.body;

  if (!gameID) {
    return res.status(400).send("game ID missing!");
  }
  const query = "DELETE FROM games WHERE game_id = $1";
  const arrVal = [parseInt(gameID, 10)];
  try {
    await client.query(query, arrVal);
    res.send("Successfully deleted record!");
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("Something went wrong trying to delete record from table!");
  }
});

app.use(express.static(path.join(path.resolve(), "dist")));

app.listen(port, () => {
  console.log(`Connected to http://localhost:${port}/`);
});
