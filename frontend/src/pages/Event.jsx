import React, { useState } from 'react';
import "../styles/Event.css";

const App = () => {
  const [showDetails, setShowDetails] = useState({
    card1: false,
    card2: false,
    card3: false,
    card4: false,
  });

  const handleDetailClick = (card) => {
    setShowDetails((prevState) => ({
      ...prevState,
      [card]: !prevState[card],
    }));
  };

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
                className="w-fit flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-2 rounded-lg"
                href="#"
              >
                <span>Explore Now</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-caret-right-fill"
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
                  className="bi bi-caret-right-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="img">
          <img className="image image1" src="/images/gambar1.png" alt="Image 1" />
          <img className="image image2" src="/images/gambar2.png" alt="Image 2" />
          <img className="image image3" src="/images/gambar3.png" alt="Image 3" />
        </div>
      </div>

      <div className="container">
        <div className="card-container">
          <div className="card">
            <img
              alt="Botanic1"
              height="150"
              src="/images/event/botanic1.png"
              width="300"
            />
            <h3 className="mt-8">Cooking Class</h3>
            <a>Sepuasnya</a>
            <a>Family Plan</a>
            <a>Lokasi</a>

            <div className="flex justify-end space-x-5 border-t-2 py-5">
              <button
                className="outline outline-1 outline-black bg-white text-blue-800 rounded-md py-1 px-4"
                onClick={() => handleDetailClick("card1")}
              >
                Detail
              </button>
              <button className="outline outline-1 outline-black bg-white text-blue-800 rounded-md py-1 px-4">
                Pesan
              </button>
            </div>

            {showDetails.card1 && (
              <div className="details mt-4">
                <p>Acara Memasak masakan Tradisional untuk para pelancong mancanegara.</p>
              </div>
            )}
          </div>

          <div className="card">
            <img
              alt="Botanic2"
              height="150"
              src="/images/event/botanic2.png"
              width="300"
            />
            <h3 className="mt-8">Education Class</h3>
            <a>Sepuasnya</a>
            <a>Family Plan</a>
            <a>Lokasi</a>
            <div className="flex justify-end space-x-5 border-t-2 py-5">
              <button
                className="outline outline-1 outline-black bg-white text-blue-800 rounded-md py-1 px-4"
                onClick={() => handleDetailClick("card2")}
              >
                Detail
              </button>
              <button className="outline outline-1 outline-black bg-white text-blue-800 rounded-md py-1 px-4">
                Pesan
              </button>
            </div>
            {showDetails.card2 && (
              <div className="details mt-4">
                <p>Education Class di Narmada Botanic Garden menggabungkan pembelajaran dengan pengalaman alam terbuka.</p>
              </div>
            )}
          </div>

          <div className="card">
            <img
              alt="Botanic3"
              height="150"
              src="/images/event/botanic3.png"
              width="300"
            />
            <h3 className="mt-8">Garden Party</h3>
            <a>Sepuasnya</a>
            <a>Family Plan</a>
            <a>Lokasi</a>
            <div className="flex justify-end space-x-5 border-t-2 py-5">
              <button
                className="outline outline-1 outline-black bg-white text-blue-800 rounded-md py-1 px-4"
                onClick={() => handleDetailClick("card3")}
              >
                Detail
              </button>
              <button className="outline outline-1 outline-black bg-white text-blue-800 rounded-md py-1 px-4">
                Pesan
              </button>
            </div>
            {showDetails.card3 && (
              <div className="details mt-4">
                <p>Narmada Botanic Garden menawarkan ruang untuk acara privat seperti garden party, pesta ulang tahun, reuni keluarga, hingga acara perusahaan.</p>
              </div>
            )}
          </div>

          <div className="card">
            <img
              alt="Botanic4"
              height="150"
              src="/images/event/botanic4.png"
              width="300"
            />
            <h3 className="mt-8">Spot Foto ala ala korea Jepang</h3>
            <a>Sepuasnya</a>
            <a>Family Plan</a>
            <a>Lokasi</a>
            <div className="flex justify-end space-x-5 border-t-2 py-5">
              <button
                className="outline outline-1 outline-black bg-white text-blue-800 rounded-md py-1 px-4"
                onClick={() => handleDetailClick("card4")}
              >
                Detail
              </button>
              <button className="outline outline-1 outline-black bg-white text-blue-800 rounded-md py-1 px-4">
                Pesan
              </button>
            </div>
            {showDetails.card4 && (
              <div className="details mt-4">
                <p>Para pengunjung dapat merasakan atmosfer khas Korea dan Jepang melalui berbagai spot foto tematik yang kami disediakan .</p>
              </div>
            )}
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
