import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import Spinner from "react-bootstrap/Spinner";

export default function Delete() {
  const [del, setDel] = useState({
    gameID: "",
  });

  const [games, setGames] = useState([]);
  const [state, setState] = useState(false);

  function onDelChange(e) {
    setDel({ ...del, gameID: e.target.value });
    console.log(del);
  }

  useEffect(() => {
    AOS.init({
      duration: 700,
      offset: 80,
      easing: "ease-in-out",
      once: true,
    });

    fetch("/api")
      .then((resp) => resp.json())
      .then((data) => {
        setGames(data.data);
        setState(true);
      });
  }, []);

  const deleteGame = (e) => {
    e.preventDefault();
    fetch("/del", {
      method: "DELETE",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(del),
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Response did not go trough!");
        }
        return resp.text();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <h1 style={{ paddingTop: "100px" }}>Send a DELETE request</h1>
      <section
        style={{
          paddingTop: "50px",
          paddingBottom: "100px",
          display: "flex",
          flexDirection: "row",
          gap: "30px",
        }}
      >
        <form
          id="delForm"
          onSubmit={deleteGame}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <label htmlFor="delete">Delete a game (by ID)</label>
          <input
            id="delete"
            name="gameID"
            type="number"
            placeholder="Place ID here"
            onChange={onDelChange}
          />
          <Button type="submit">Submit</Button>
        </form>
        <div
          style={{
            width: "250px",
            height: "250px",
            border: "3px outset lightgrey",
            boxSizing: "content-box",
            overflowY: "scroll",
          }}
        >
          {state ? (
            games.map((game, index) => (
              <p key={index}>
                Name: {game.title} -{" "}
                <span style={{ fontWeight: "bold" }}>ID: {game.game_id}</span>{" "}
              </p>
            ))
          ) : (
            <Spinner animation="border" />
          )}
        </div>
      </section>
    </>
  );
}
