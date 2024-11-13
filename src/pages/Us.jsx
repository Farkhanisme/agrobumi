import React from "react";
import "./Us.css";

function TeamAgrobumi() {
  return (
    <div className="container">
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
          style={{ backgroundImage: `url('/person1.jpg')` }}
        />
      </div>
      <div className="level">
        <div
          className="person"
          style={{ backgroundImage: `url('/person2.jpg')` }}
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
