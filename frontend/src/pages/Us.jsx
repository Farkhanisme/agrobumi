import React from "react";
import "../styles/Us.css";

function TeamAgrobumi() {
  return (
    <div className="container my-28">
      <h1>Team Agrobumi Indonesia</h1>
      <div className="level">
        <div
          className="person"
          style={{ backgroundImage: `url('/fay.jpg')` }}
        />
      </div>
      <div className="level">
        <div
          className="person"
          style={{ backgroundImage: `url('/farhan.jpg')` }}
        />
        <div
          className="person"
          style={{ backgroundImage: `url('/fakhriyyah.jpg')` }}
        />
        <div
          className="person"
          style={{ backgroundImage: `url('/amar.jpg')` }}
        />
      </div>
      <div className="level">
        <div
          className="person"
          style={{ backgroundImage: `url('/vito.jpg')` }}
        />
        <div
          className="person"
          style={{ backgroundImage: `url('/putri.jpg')` }}
        />
        <div
          className="person"
          style={{ backgroundImage: `url('/person1.jpg')` }}
        />
      </div>
    </div>
  );
}

export default TeamAgrobumi;
