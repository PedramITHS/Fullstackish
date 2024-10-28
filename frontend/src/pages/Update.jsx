import { Button } from "react-bootstrap";

export default function Update() {
  const patchGame = (e) => {
    e.preventDefault();

    const patchValues = {};

    const gameID = document.getElementById("gamePatch").value;

    const genre = document.getElementById("genrePatch").value;
    if (genre) patchValues.genre_id = parseInt(genre, 10);

    const title = document.getElementById("titlePatch").value;
    if (title) patchValues.title = title;

    const release = document.getElementById("datePatch").value;
    if (release) patchValues.release_date = release;

    const description = document.getElementById("descripPatch").value;
    if (description) patchValues.description = description;

    const image = document.getElementById("imagePatch").value;
    if (image) patchValues.image = image;

    fetch(`/upd/${gameID}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(patchValues),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <section>
      <h1>Send a PATCH request</h1>
      <form
        id="patchForm"
        onSubmit={patchGame}
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
            <label htmlFor="gamePatch">the Game ID:</label>
            <input id="gamePatch" type="number" name="gamePatch" />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginRight: "20px",
            }}
          >
            <label htmlFor="genrePatch">Choose genre:</label>
            <select id="genrePatch" name="genrePatch">
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
            <label htmlFor="titlePatch">Name of the game:</label>
            <input
              id="titlePatch"
              type="text"
              placeholder="Game title"
              name="titlePatch"
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginRight: "20px",
            }}
          >
            <label htmlFor="datePatch">The release date:</label>
            <input id="datePatch" type="date" name="datePatch" />
          </div>
        </div>

        <label htmlFor="imagePatch">Choose an image:</label>
        <select id="imagePatch" name="imagePatch">
          <option value="assets/covers/temporary.png">Placeholder</option>
          <option value="assets/covers/action.png">Action</option>
          <option value="assets/covers/rpg.png">RPG</option>
          <option value="assets/covers/racing.png">Racing</option>
          <option value="assets/covers/shootemup.png">Shoot&apos;em up</option>
          <option value="assets/covers/sport.png">Sport</option>
          <option value="assets/covers/FPS.png">FPS</option>
        </select>

        <label htmlFor="descripPatch">Game description:</label>
        <textarea
          name="descripPatch"
          id="descripPatch"
          type="text"
          placeholder="Game description"
          style={{ height: "100px" }}
        />

        <Button style={{ width: "20%", margin: "0px auto" }} type="submit">
          Submit
        </Button>
      </form>
    </section>
  );
}
