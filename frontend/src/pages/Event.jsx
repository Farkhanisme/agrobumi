import React from "react";
import "../styles/Event.css";

const App = () => {
  return (
    <div className="space-y-40 my-24">
      <div className="flex my-14 w-screen justify-center items-center">
        <div className="isi">
        <div className="font-bold text-8xl -z-10 absolute -rotate-90 -left-20 text-gray-300">
            <h1>Narmada <br /> Botanic <br /> Garden</h1>
          </div>
          <div className="content pb-10">
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
            <div className="flex justify-start space-x-10 mt-10">
              <a
                class="w-fit flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-2 rounded-lg"
                href="#"
              >
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
              </a>

              <a
                className="w-fit flex items-center justify-center space-x-2 bg-cyan-700 text-white px-6 py-2 rounded-lg"
                href="#"
              >
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
              </a>
            </div>
          </div>
        </div>

        <div className="img">
          <img className="image image1" src="gambar1.jpg" alt="image1" />
          <img className="image image2" src="gambar2.jpg" alt="image2" />
          <img className="image image3" src="gambar3.jpg" alt="image3" />
        </div>
      </div>

      <div className="container">
        {/* <div className="search-bar mb-32">
          <input placeholder="Search" type="text" />
          <a className="fas fa-search"></a>
        </div> */}

        <div className="card-container">
          <div className="card">
            <img
              alt="Botanic1"
              height="150"
              src="https://images.pexels.com/photos/849403/pexels-photo-849403.jpeg"
              width="300"
            />
            <h3 className="mt-8">Spot Foto ala ala korea Jepang</h3>
            <a>Sepuasnya</a>
            <a>Family Plan</a>
            <a>Lokasi</a>
            <div className="flex justify-end space-x-5 border-t-2 py-5">
              <button className="outline outline-1 outline-black bg-white text-blue-800 rounded-md py-1 px-4">
                Detail
              </button>
              <button className="outline outline-1 outline-black bg-white text-blue-800 rounded-md py-1 px-4">
                Pesan
              </button>
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
