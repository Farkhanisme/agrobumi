import React from "react";
import "../styles/About.css";

function AboutUs() {
  return (
    <div className="">
      <main>
        <section className="mb-16">
          <h1 className="text-primary-3 text-xl text-center my-5">
            Narmada <span className="text-primary-2">Botanic</span> Garden
          </h1>
          <p className="text-justify border-b border-black">
            Selamat datang di Narmada Botanic Garden, destinasi agrowisata yang
            menggabungkan keindahan alam, edukasi, dan konservasi di tengah
            kawasan Narmada. Kami berkomitmen untuk menghadirkan pengalaman unik
            yang mempertemukan pengunjung dengan kekayaan flora lokal dan
            berbagai aktivitas pertanian modern.
          </p>
          <h2>
            <h2 className="text-left text-primary-1 text-lg my-3">Visi</h2>
          </h2>
          <p className="text-justify border-b border-black">
            Menjadi pusat agrowisata terkemuka di Indonesia yang memberikan
            pengalaman edukasi, konservasi, dan rekreasi berkelanjutan untuk
            semua kalangan.
          </p>
          <h2>
            <h2 className="text-left text-primary-1 text-lg my-3">Misi</h2>
          </h2>
          <p className="text-justify border-b border-black space-y-2 flex flex-col">
            <span>
              Mengedukasi masyarakat tentang pentingnya konservasi tanaman dan
              pertanian berkelanjutan.
            </span>{" "}
            <span>
              Menyediakan lingkungan yang mendukung penelitian dan inovasi di
              bidang botani dan agrikultur.
            </span>{" "}
            <span>
              Menyajikan pengalaman wisata yang menyatu dengan alam, sekaligus
              mempromosikan budaya lokal.
            </span>
          </p>
        </section>
      </main>
    </div>
  );
}

export default AboutUs;
