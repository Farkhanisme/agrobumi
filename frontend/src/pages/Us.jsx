import React from "react";
import "../styles/Us.css";

function TeamAgrobumi() {
  return (
    <div className="container">
      <h1 className="font-poppins font-semibold text-2xl text-primary-3">Team Agrobumi Indonesia</h1>
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
          style={{ backgroundImage: `url('/roihan.jpg')` }}
        />
      </div>
    </div> 
  );
}

export default TeamAgrobumi;
