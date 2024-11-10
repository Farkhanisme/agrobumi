import React from "react";
import "./Event.css";

const App = () => {
  return (
    <div>
      <div className="isi">
        <div className="content">
          <p>Mari Temukan Keajaiban Agrowisata Lombok</p>
          <h1>Mari Jelajahi Sekarang</h1>
          <h1>
            Dan <span>Temukan Alam</span>,
          </h1>
          <h1>Keindahan di Lombok.</h1>
          <p>Jangan Tunggu, Sekarang Waktunya Menjelajahi Lombok</p>
          <p>Dan Temukan Keunikan Agrowisatanya.</p>
          <div className="buttons">
            <a className="explore" href="#">
              Jelajahi Sekarang
              <i className="fas fa-arrow-right"></i>
            </a>
            <a className="fitur" href="#">
              Fitur Lain
              <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="img">
        <img className="image image1" src="gambar1.jpg" alt="image1" />
        <img className="image image2" src="gambar2.jpg" alt="image2" />
        <img className="image image3" src="gambar3.jpg" alt="image3" />
      </div>

      <div className="container">
        <div className="search-bar">
          <input placeholder="Search" type="text" />
          <a className="fas fa-search"></a>
        </div>

        <div className="card-container">
          <div className="card">
            <img
              alt="Botanic1"
              height="150"
              src="https://images.pexels.com/photos/849403/pexels-photo-849403.jpeg"
              width="300"
            />
            <h3>Spot Foto ala ala korea Jepang</h3>
            <a>September</a>
            <a>Location: Lombok</a>
            <div className="details">
              <button>Detail</button>
              <button>Pesan</button>
            </div>
          </div>
          <div className="card">
            <img
              alt="Botanic2"
              height="150"
              src="https://images.pexels.com/photos/1540330/pexels-photo-1540330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              width="300"
            />
            <h3>Garden Party</h3>
            <a>September</a>
            <a>Location: Lombok</a>
            <div className="details">
              <button>Detail</button>
              <button>Pesan</button>
            </div>
          </div>
          <div className="card">
            <img
              alt="Botanic3"
              height="150"
              src="https://images.pexels.com/photos/3036366/pexels-photo-3036366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              width="300"
            />
            <h3>Cooking Class</h3>
            <a>September</a>
            <a>Location: Lombok</a>
            <div className="details">
              <button>Detail</button>
              <button>Pesan</button>
            </div>
          </div>
          <div className="card">
            <img
              alt="Botanic4"
              height="150"
              src="https://images.pexels.com/photos/3036366/pexels-photo-3036366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              width="300"
            />
            <h3>Education Class</h3>
            <a>September</a>
            <a>Location: Lombok</a>
            <div className="details">
              <button>Detail</button>
              <button>Pesan</button>
            </div>
          </div>
        </div>

        <div className="more-link">
          <a href="#">Lainnya</a>
        </div>
      </div>
    </div>
  );
};

export default App;
