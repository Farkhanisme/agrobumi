import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";
import "../styles/Beranda.css";

const Card = ({ title, image, reviews, onDetailClick }) => {
  return (
    <div className="card bg-white rounded-lg shadow-lg max-w-xs">
      <img
        alt={title}
        src={image}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600 mt-2">Sepuasnya</p>
        <p className="text-gray-600 mt-2">Family Plan</p>
        <p className="text-gray-600 mt-2">Lokasi</p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col items-center">
            <div className="flex text-yellow-400">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
            </div>
            <span className="mt-1 text-gray-600 text-sm">
              {reviews} reviews
            </span>
          </div>
          <button
            className="outline outline-1 outline-black bg-white text-blue-800 rounded-md py-1 px-4"
            onClick={onDetailClick}
          >
            Detail
          </button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  function openModal(imageSrc) {
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modalImage");

    modal.style.display = "flex";
    modalImage.src = imageSrc;
  }

  function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
  }

  window.onclick = function (event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
      closeModal();
    }
  };

  return (
    <div>
      <div className="flex mb-14 w-screen justify-center items-center">
        <div className="isi">
          <div className="font-bold text-8xl -z-10 absolute -rotate-90 -left-20 text-text-6">
            <h1>
              Narmada <br /> Botanic <br /> Garden
            </h1>
          </div>
          <div className="content pb-10 text-secondary-2 font-bold">
            <p className="flex font-normal">
              <img src="/logos/compass.svg" className="mr-2" />
              Let’s Discover the Wonders of Lombok’s Agrotourism
            </p>
            <h1>Let's Explore Now</h1>
            <h1>
              And{" "}
              <span className="text-primary-3 font-taprom font-normal">
                Discover Nature
              </span>
              ,
            </h1>
            <h1>Beauty in Lombok.</h1>
            <p className="font-normal">
              Don’t wait, now’s the time to explore Lombok <br />
              and uncover its unique agrotourism wonders.
            </p>
            <div className="flex justify-start space-x-10 mt-10">
              <Link
                to="/event"
                className="w-fit flex items-center justify-center space-x-2 bg-primary-3 text-text-4 px-6 py-2 rounded-lg"
              >
                <span>Explore Now</span>
                <i className="fas fa-caret-right"></i>
              </Link>

              <Link
                to="/booking"
                className="w-fit flex items-center justify-center space-x-2 bg-secondary-2 text-text-4 px-6 py-2 rounded-lg"
              >
                <span>Booking</span>
                <i className="fas fa-caret-right"></i>
              </Link>
            </div>
          </div>
        </div>

        <div className="img">
          <img
            className="image image1"
            src="/images/gambar1.png"
            alt="Image 1"
          />
          <img
            className="image image2"
            src="/images/gambar2.png"
            alt="Image 2"
          />
          <img
            className="image image3"
            src="/images/gambar3.png"
            alt="Image 3"
          />
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
          <Card
            title="Narmada Botanic Garden"
            image="/images/botanic1.png"
            reviews={584}
            onDetailClick={openPopup}
          />
          <Card
            title="Narmada Botanic Garden"
            image="/images/botanic2.png"
            reviews={584}
            onDetailClick={openPopup}
          />
          <Card
            title="Narmada Botanic Garden"
            image="/images/botanic3.png"
            reviews={584}
            onDetailClick={openPopup}
          />
          <Card
            title="Narmada Botanic Garden"
            image="/images/botanic4.png"
            reviews={584}
            onDetailClick={openPopup}
          />
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
            <h2 className="text-lg font-semibold mb-4">Detail Lokasi</h2>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.0403029793238!2d116.2033429740816!3d-8.592123587229137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dcdb86cd9a8363f%3A0xb0684580815801d3!2sNarmada%20Botanic%20Garden!5e0!3m2!1sid!2sid!4v1733707628982!5m2!1sid!2sid"
              className="w-full h-64 rounded-lg mt-4"
              frameBorder="0"
              allowFullScreen
              title="Map"
            ></iframe>
            <button
              onClick={closePopup}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      <div className="w-screen flex flex-wrap justify-center items-center p-10">
        <h2 className="gallery-title">Narmada Botanic Garden Gallery</h2>
        <div className="gallery ml-10 p-0">
          <img
            alt="Tampilan 1"
            src="/images/Tampilan1.png"
            className="gallery-image"
            onClick={() => openModal("/images/Tampilan1.png")}
          />
          <img
            alt="Tampilan 2"
            src="/images/Tampilan2.png"
            className="gallery-image"
            onClick={() => openModal("/images/Tampilan2.png")}
          />
          <img
            alt="Tampilan 3"
            src="/images/Tampilan3.png"
            className="gallery-image"
            onClick={() => openModal("/images/Tampilan3.png")}
          />
          <img
            alt="Tampilan 4"
            src="/images/Tampilan4.png"
            className="gallery-image"
            onClick={() => openModal("/images/Tampilan4.png")}
          />
          <img
            alt="Tampilan 5"
            src="/images/Tampilan5.png"
            className="gallery-image"
            onClick={() => openModal("/images/Tampilan5.png")}
          />
          <img
            alt="Tampilan 6"
            src="/images/Tampilan6.png"
            className="gallery-image"
            onClick={() => openModal("/images/Tampilan6.png")}
          />
          <img
            alt="Tampilan 7"
            src="/images/Tampilan7.png"
            className="gallery-image"
            onClick={() => openModal("/images/Tampilan7.png")}
          />
          <img
            alt="Tampilan 8"
            src="/images/Tampilan8.png"
            className="gallery-image"
            onClick={() => openModal("/images/Tampilan8.png")}
          />
        </div>
      </div>

      <div id="modal" className="modal">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <img id="modalImage" className="modal-content" alt="Popup" />
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.0403029793238!2d116.2033429740816!3d-8.592123587229137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dcdb86cd9a8363f%3A0xb0684580815801d3!2sNarmada%20Botanic%20Garden!5e0!3m2!1sid!2sid!4v1733707628982!5m2!1sid!2sid"
        className="w-full"
        height="450"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default App;
