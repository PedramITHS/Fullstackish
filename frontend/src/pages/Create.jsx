import { useState } from "react";
import { Button } from "react-bootstrap";

export default function Crud() {
  const [insert, setInsert] = useState({
    genre: "",
    title: "",
    date: "",
    description: "",
    image: "",
  });

  function onChange(e) {
    setInsert({ ...insert, [e.target.name]: e.target.value });
    console.log(insert);
  }

  // function onPatchChange(e) {
  //   setPatch({ ...patch, [e.target.name]: e.target.value });
  //   console.log(patch);
  // }

  const insertGame = (e) => {
    e.preventDefault();
    fetch("/add", {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(insert),
    })
      .then((resp) => resp.text())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      {/*///////////////// CREATE form /////////////////7*/}

      <h1>Send a POST request</h1>
      <section>
        <form
          id="postForm"
          onSubmit={insertGame}
          className="d-flex flex-column"
          style={{ gap: "10px" }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "20px",
              }}
            >
              <label htmlFor="genre">Choose genre:</label>
              <select id="genre" name="genre" onChange={onChange}>
                <option value="1">Action</option>
                <option value="2">Adventure</option>
                <option value="3">Platformer</option>
                <option value="4">FPS</option>
                <option value="5">RPG</option>
                <option value="6">Shoot&apos;em up</option>
                <option value="7">Racing</option>
                <option value="8">Strategy</option>
                <option value="9">Horror</option>
                <option value="10">Sports</option>
                <option value="11">Puzzle</option>
                <option value="12">Beat&apos;em up</option>
              </select>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "20px",
              }}
            >
              <label htmlFor="title">Name of the game:</label>
              <input
                id="title"
                type="text"
                placeholder="Game title"
                name="title"
                onChange={onChange}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "20px",
              }}
            >
              <label htmlFor="date">The release date:</label>
              <input id="date" type="date" name="date" onChange={onChange} />
            </div>
          </div>

          <label htmlFor="image">Choose an image:</label>
          <select id="image" name="image" onChange={onChange}>
            <option value="assets/covers/temporary.png">Placeholder</option>
            <option value="assets/covers/action.png">Action</option>
            <option value="assets/covers/rpg.png">RPG</option>
            <option value="assets/covers/racing.png">Racing</option>
            <option value="assets/covers/shootemup.png">
              Shoot&apos;em up
            </option>
            <option value="assets/covers/sport.png">Sport</option>
            <option value="assets/covers/FPS.png">FPS</option>
          </select>

          <label htmlFor="descrip">Game description:</label>
          <textarea
            name="description"
            id="descrip"
            type=""
            placeholder="Game description"
            style={{ height: "200px" }}
            onChange={onChange}
          />

          <Button style={{ width: "20%", margin: "0px auto" }} type="submit">
            Submit
          </Button>
        </form>
      </section>

      {/*///////////////// PATCH form /////////////////*/}

      {/*///////////////// DELETE form /////////////////*/}
    </>
  );
}
