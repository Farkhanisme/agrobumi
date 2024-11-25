import React from "react";
import { Link } from "react-router-dom";
import "../styles/Beranda.css";

const App = () => {
  return (
    <div>
      <div className="flex mb-14 w-screen justify-center items-center">
        <div className="isi">
          <div className="font-bold text-8xl -z-10 absolute -rotate-90 -left-20 text-text-6">
            <h1>Narmada <br /> Botanic <br /> Garden</h1>
          </div>
          <div className="content pb-10 text-secondary-2 font-bold">
            <p className="flex font-normal"><img src="/logos/compass.svg" className="mr-2"/>Let’s Discover the Wonders of Lombok’s Agrotourism</p>
            <h1>Let's Explore Now</h1>
            <h1>
              And <span className="text-primary-3 font-taprom font-normal">Discover Nature</span>,
            </h1>
            <h1>Beauty in Lombok.</h1>
            <p className="font-normal">
              Don’t wait, now’s the time to explore Lombok <br />
              and uncover its unique agrotourism wonders.
            </p>
            <div className="flex justify-start space-x-10 mt-10">
              <Link to="/event" class="w-fit flex items-center justify-center space-x-2 bg-primary-3 text-text-4 px-6 py-2 rounded-lg">
                <span>Explore Now</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-caret-right-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
              </Link>

              <Link to="/booking" className="w-fit flex items-center justify-center space-x-2 bg-secondary-2 text-text-4 px-6 py-2 rounded-lg">
                <span>Booking</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-caret-right-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="img">
          <img className="image image1" src="/images/gambar1.png" alt="Image 1" />
          <img className="image image2" src="/images/gambar2.png" alt="Image 2" />
          <img className="image image3" src="/images/gambar3.png" alt="Image 3" />
        </div>
      </div>

      <div className="explore2">
        <h5 className="font-bold text-5xl my-10 font-volkhov">
          Explore Narmada Botanic Garden
        </h5>
        <a className="subtitle text-md font-poppins">
          Selamat di Narmada Botanic Garden, <br />
          destinasi Agrowisata Lombok
        </a>
        <div className="mb-10">
          <img src="images/section.png" alt="" />
        </div>
        <div className="card-container">
          <div className="card">
            <img alt="Botanic1" height="150" src="/images/botanic1.png" width="300" />
            <h3>Narmada Botanic Garden</h3>
            <a>Open: 9am - 5pm</a>
            <a>Location: Lombok</a>
            <a className="price">Rp. 35,000</a>
          </div>
          <div className="card">
            <img alt="Botanic2" height="150" src="/images/botanic2.png" width="300" />
            <h3>Narmada Botanic Garden</h3>
            <a>Open: 9am - 5pm</a>
            <a>Location: Lombok</a>
            <a className="price">Rp. 35,000</a>
          </div>
          <div className="card">
            <img alt="Botanic3" height="150" src="/images/botanic3.png" width="300" />
            <h3>Narmada Botanic Garden</h3>
            <a>Open: 9am - 5pm</a>
            <a>Location: Lombok</a>
            <a className="price">Rp. 35,000</a>
          </div>
          <div className="card">
            <img alt="Botanic4" height="150" src="/images/botanic4.png" width="300" />
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
          <img alt="Tampilan 1" src="/images/Tampilan1.png" />
          <img alt="Tampilan 2" src="/images/Tampilan2.png" />
          <img alt="Tampilan 3" src="/images/Tampilan3.png" />
          <img alt="Tampilan 4" src="/images/Tampilan4.png" />
          <img alt="Tampilan 5" src="/images/Tampilan5.png" />
          <img alt="Tampilan 6" src="/images/Tampilan6.png" />
          <img alt="Tampilan 7" src="/images/Tampilan7.png" />
          <img alt="Tampilan 8" src="/images/Tampilan8.png" />
        </div>
      </div>
    </div>
  );
};

export default App;
