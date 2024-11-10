import React from 'react';
import './Beranda.css';

const App = () => {
    return (
    <div>
        <div className="navbar">
        <img alt="Narmada Botanic Garden Logo" src="logo.png" />
        <ul>
            <li>
            <a href="beranda2.html" className="active">Beranda</a>
            </li>
            <li>
            <a href="destinasi.html">Destinations</a>
            </li>
            <li>
            <a href="booking.html">Booking</a>
            </li>
        </ul>

        <ul className="about">
            <li>
            <a href="about.html">About Us</a>
            </li>
        </ul>
        </div>

        <div className="isi">
        <div className="content">
            <p>Mari Temukan Keajaiban Agrowisata Lombok</p>
            <h1>Mari Jelajahi Sekarang</h1>
            <h1>Dan <span>Temukan Alam</span>,</h1>
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
        <img className="image image1" src="gambar1.jpg" alt="Image 1" />
        <img className="image image2" src="gambar2.jpg" alt="Image 2" />
        <img className="image image3" src="gambar3.jpg" alt="Image 3" />
    </div>

    <div className="explore2">
        <h5>Explore Popular Cities</h5>
        <a className="subtitle">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
        </a>
        <div className="main-image"></div>
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
    
    <h2 className="gallery-title">Narmada Botanic Garden gallery</h2>
        <div className="gallery">
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
