import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Event.css";

const App = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupHeader, setPopupHeader] = useState("");
  const [popupContent_1, setPopupContent_1] = useState("");
  const [popupContent_2, setPopupContent_2] = useState("");
  const [popupContent_3, setPopupContent_3] = useState("");

  const handleDetailClick = (card, content_1, content_2, content_3) => {
    setPopupHeader(card);
    setPopupContent_1(content_1);
    setPopupContent_2(content_2);
    setPopupContent_3(content_3);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="space-y-40">
      <div className="flex w-screen justify-center items-center">
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
              <a
                class="w-fit flex items-center justify-center space-x-2 bg-primary-3 text-text-4 px-6 py-2 rounded-lg"
                href="#explore"
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

              <Link
                to="/booking"
                className="w-fit flex items-center justify-center space-x-2 bg-secondary-2 text-text-4 px-6 py-2 rounded-lg"
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

      <div className="mx-auto p-10" id="explore">
        <div className="card-container my-20">
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
              <Link>
                <button
                  className="outline outline-1 outline-black bg-white text-blue-800 rounded-md py-1 px-4"
                  onClick={() =>
                    handleDetailClick(
                      "Cooking Class",
                      "Acara Memasak masakan Tradisional untuk para pelancong mancanegara",
                      "Biaya: 450,000/group(include bahan masakan)",
                      "Catatan: Peserta bisa menikmati hasil masakannya sendiri atau membawanya pulang sebagai oleh-oleh."
                    )
                  }
                >
                  Detail
                </button>
              </Link>
              <Link to="/booking">
                <button className="outline outline-1 outline-black bg-white text-blue-800 rounded-md py-1 px-4">
                  Pesan
                </button>
              </Link>
            </div>
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
              <Link>
                <button
                  className="outline outline-1 outline-black bg-white text-blue-800 rounded-md py-1 px-4"
                  onClick={() =>
                    handleDetailClick(
                      "Education Class",
                      "Education Class di Narmada Botanic Garden menggabungkan pembelajaran dengan pengalaman alam terbuka.",
                      "Mengenal Jenis Tanaman Tropis dan Manfaatnya.",
                      "Biaya: 350,00/group (termasuk semua perlengkapan dan sertifikat partisipasi)."
                    )
                  }
                >
                  Detail
                </button>
              </Link>
              <Link to="/booking">
                <button className="outline outline-1 outline-black bg-white text-blue-800 rounded-md py-1 px-4">
                  Pesan
                </button>
              </Link>
            </div>
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
              <Link>
                <button
                  className="outline outline-1 outline-black bg-white text-blue-800 rounded-md py-1 px-4"
                  onClick={() =>
                    handleDetailClick(
                      "Garden Party",
                      "Narmada Botanic Garden menawarkan ruang untuk acara privat seperti garden party, pesta ulang tahun, reuni keluarga, hingga acara perusahaan.",
                      `<ul class='list-disc'>
                        <li>Paket 1: Untuk 10-20 orang, Rp2.000.000 (termasuk dekorasi sederhana).</li>
                        <li>Paket 2: Untuk 20-50 orang, Rp5.000.000 (termasuk dekorasi, sound system, dan area eksklusif).</li>
                        <li>Paket 3/Premium: Untuk lebih dari 50 orang, mulai dari Rp10.000.000 (termasuk dekorasi tematik, sound system, dan pencahayaan khusus).</li>
                      </ul>`,
                      `Fasilitas Tambahan: </br>
                      <ul class='list-disc'>
                        <li>Catering dengan hidangan tradisional atau internasional.</li>
                        <li>Sewa fotografer khusus untuk dokumentasi acara.</li>
                      </ul>`
                    )
                  }
                >
                  Detail
                </button>
              </Link>
              <Link to="/booking">
                <button className="outline outline-1 outline-black bg-white text-blue-800 rounded-md py-1 px-4">
                  Pesan
                </button>
              </Link>
            </div>
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
              <Link>
                <button
                  className="outline outline-1 outline-black bg-white text-blue-800 rounded-md py-1 px-4"
                  onClick={() =>
                    handleDetailClick(
                      "Spot Foto ala ala korea Jepang",
                      "Para pengunjung dapat merasakan atmosfer khas Korea dan Jepang melalui berbagai spot foto tematik yang kami disediakan.",
                      `<ul class='list-disc'>
                        <li>Set taman bergaya Jepang dengan bunga sakura.</li>
                        <li>Area ala hanok (rumah tradisional Korea) untuk nuansa Korea.</li>
                        <li>Aksesori tradisional seperti payung Jepang dan Hanbok untuk menambah keseruan sesi foto.</li>
                      </ul>`,
                      `<ul class='list-disc'>
                        <li>Harga Tiket: Rp50.000 per orang (termasuk akses ke area spot foto dan peminjaman aksesori sederhana).</li>
                        <li>Harga Ticket Biasa:10.000/orang(biaya masuk biasa tanpa perlengkapan)</li>
                      </ul>`
                    )
                  }
                >
                  Detail
                </button>
              </Link>
              <Link to="/booking">
                <button className="outline outline-1 outline-black bg-white text-blue-800 rounded-md py-1 px-4">
                  Pesan
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content p-5">
            <h1 className="text-center text-succes-3 text-3xl">
              Narmada <span className="text-secondary-2">Botanic</span> Garden
            </h1>
            <br />
            <h2 className="font-semibold text-left">{popupHeader}</h2>
            <div className="popup-body mx-14">
              <p className="border-b-2 py-3">{popupContent_1}</p>
              <p
                className="border-b-2 py-3"
                dangerouslySetInnerHTML={{ __html: popupContent_2 }}
              ></p>
              <p className="border-b-2 py-3" dangerouslySetInnerHTML={{ __html: popupContent_3 }}></p>
              <div className="popup-button flex flex-row justify-end items-center space-x-5  my-3">
                <button
                  className="outline outline-1 outline-danger-1 text-danger-1 py-1 px-5 rounded-md"
                  onClick={closePopup}
                >
                  Tutup
                </button>
                <Link
                  to="/booking"
                  className="outline outline-1 outline-button-1 text-button-1 py-1 px-5 rounded-md"
                >
                  Pesan
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
