import React from "react";
import "./Beranda.css";

const App = () => {
  return (
    <div className="overflow-hidden">
      <div className="flex my-14 w-screen justify-center items-center">
        <div className="isi">
          <div className="content">
            <p>Let’s Discover the Wonders of Lombok’s Agrotourism</p>
            <h1>Let's Explore Now</h1>
            <h1>
              And <span>Discover Nature</span>,
            </h1>
            <h1>Beauty in Lombok.</h1>
            <p>
              Don’t wait, now’s the time to explore Lombok <br />
              and uncover its unique agrotourism wonders.
            </p>
            <div className="buttons">
              <a className="explore w-fit flex" href="#">
                <span>Explore Now</span>
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-caret-right-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg> */}
              </a>
              <a className="fitur w-fit flex" href="#">
                <span>Booking</span>
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-caret-right-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg> */}
              </a>
            </div>
          </div>
        </div>

        <div className="img">
          <img className="image image1" src="gambar1.jpg" alt="Image 1" />
          <img className="image image2" src="gambar2.jpg" alt="Image 2" />
          <img className="image image3" src="gambar3.jpg" alt="Image 3" />
        </div>
      </div>

      <div className="explore2">
        <h5 className="font-bold text-5xl my-10">
          Explore Narmada Botanic Garden
        </h5>
        <a className="subtitle text-md">
          Selamat di Narmada Botanic Garden, <br />
          destinasi Agrowisata Lombok
        </a>
        <div className="mb-10">
          <img src="section.png" alt="" srcset="" />
        </div>
        <div className="card-container">
          <div className="card">
            <img alt="Botanic1" height="150" src="#" width="300" />
            <h3>Narmada Botanic Garden</h3>
            <a>Open: 9am - 5pm</a>
            <a>Location: Lombok</a>
            <a className="price">Rp. 35,000</a>
          </div>
          <div className="card">
            <img alt="Botanic2" height="150" src="#" width="300" />
            <h3>Narmada Botanic Garden</h3>
            <a>Open: 9am - 5pm</a>
            <a>Location: Lombok</a>
            <a className="price">Rp. 35,000</a>
          </div>
          <div className="card">
            <img alt="Botanic3" height="150" src="#" width="300" />
            <h3>Narmada Botanic Garden</h3>
            <a>Open: 9am - 5pm</a>
            <a>Location: Lombok</a>
            <a className="price">Rp. 35,000</a>
          </div>
          <div className="card">
            <img alt="Botanic4" height="150" src="#" width="300" />
            <h3>Narmada Botanic Garden</h3>
            <a>Open: 9am - 5pm</a>
            <a>Location: Lombok</a>
            <a className="price">Rp. 35,000</a>
          </div>
        </div>
      </div>

      <div className="w-screen flex flex-wrap justify-center items-center p-10">
        <h2 className="gallery-title">Narmada Botanic Garden gallery</h2>
        <div className="gallery ml-10 p-0">
          <img alt="Tampilan 1" height="150" src="#" width="300" />
          <img alt="Tampilan 2" height="150" src="#" width="300" />
          <img alt="Tampilan 3" height="150" src="#" width="300" />
          <img alt="Tampilan 4" height="150" src="#" width="300" />
          <img alt="Tampilan 5" height="150" src="#" width="300" />
          <img alt="Tampilan 6" height="150" src="#" width="300" />
          <img alt="Tampilan 7" height="150" src="#" width="300" />
          <img alt="Tampilan 8" height="150" src="#" width="300" />
        </div>
      </div>
    </div>
  );
};

export default App;