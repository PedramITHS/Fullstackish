import { useState } from "react";
import { Link } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Button } from "react-bootstrap";

export default function Header() {
  const [offCan, setOffCan] = useState(false);
  const close = () => setOffCan(false);
  const open = () => setOffCan(true);

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "80px",
          background: "green",
          top: "0",
          left: "0",
          position: "fixed",
          zIndex: "1000",
          borderBottom: "2px solid black",
        }}
      >
        <nav>
          <div>
            <Button
              variant="primary"
              onClick={open}
              style={{ marginLeft: "10px", marginTop: "20px" }}
            >
              Menu
            </Button>
          </div>

          <Offcanvas show={offCan} onHide={close}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Navigation</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body style={{ background: "#161616" }}>
              <ul>
                <li onClick={close}>
                  <Link to={"/"}>Home</Link>
                </li>
                <li onClick={close}>
                  <Link to={"add"}>Add a game</Link>
                </li>
                <li onClick={close}>
                  <Link to={"upd"}>Update a game</Link>
                </li>
                <li onClick={close}>
                  <Link to={"del"}>Delete a game</Link>
                </li>
              </ul>
            </Offcanvas.Body>
          </Offcanvas>
        </nav>
      </div>
    </>
  );
}
