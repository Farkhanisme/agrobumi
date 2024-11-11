import React from "react";
import Us from "./Us";

function AboutUs() {
  return (
    <div className="container">
      <header>
        <h2>Narmada Botanic Garden</h2>
      </header>

      <main>
        <section>
          <h2>Tentang Kami</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <h2>Visi</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <h2>Misi</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          {/* Repeat similar sections for Visi and Misi */}
        </section>
      </main>

      <footer>
        <p>&copy; 2023 Narmada Botanic Garden</p>
      </footer>
      <Us />
    </div>
  );
}

export default AboutUs;