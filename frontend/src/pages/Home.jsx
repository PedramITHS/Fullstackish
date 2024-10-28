import { useState, useEffect } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "bootstrap/dist/css/bootstrap.min.css";
// import Button from "react-bootstrap/Button";
import AOS from "aos";
import "aos/dist/aos.css";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/App.css";

function App() {
  // const [count, setCount] = useState(0);
  const [games, setGames] = useState([]);
  const [state, setState] = useState(false);

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

  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}

      {state ? (
        <Container
          fluid="sm"
          data-aos="fade-up"
          style={{ paddingTop: "100px", paddingBottom: "100px" }}
        >
          <Row md={4} className="justify-content-md-center">
            {games.map((game, index) => (
              <Col key={index}>
                <div style={{ padding: "10px", textAlign: "center" }}>
                  <img
                    onClick={() => console.log("ID is ", game.game_id)}
                    style={{ width: "100px", height: "150px" }}
                    src={game.image}
                    alt="image of a game"
                  />
                  <p>{game.title}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <Spinner animation="border" />
      )}
    </>
  );
}

export default App;
