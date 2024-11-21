import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import dotenv from "dotenv";
import db from "../database/db.js";
import nodemailer from "nodemailer";
dotenv.config();

export const getSnapToken = async (req, res) => {
  const { name, email, tanggal, jumlah, tiket, harga, totalHarga } = req.body;
  const orderId = uuidv4();

  const parameter = {
    transaction_details: {
      order_id: orderId,
      gross_amount: totalHarga,
    },
    customer_details: {
      first_name: name,
      email: email,
    },
  };

  const insert =
    "INSERT INTO booking (order_id, nama, tanggal, jumlah, jenis, status) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    insert,
    [orderId, name, tanggal, jumlah, tiket, "pending"],
    (err, result) => {
      if (err) {
        console.error("pemesanan gagal ditambahkan ke database, error: ", err);
        return res
          .status(500)
          .json({ error: "pesanan gagal ditambahkan ke database" });
      }

      axios
        .post(
          "https://app.sandbox.midtrans.com/snap/v1/transactions",
          parameter,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${Buffer.from(
                process.env.MIDTRANS_SERVER_KEY
              ).toString("base64")}`,
            },
          }
        )
        .then((response) => {
          res.json({ token: response.data.token, order_id: orderId });
        })
        .catch((error) => {
          console.error(
            "snap token gagal dibuat:",
            error.response?.data || error.message
          );
          res.status(500).json({ error: "gagal membuat snap token" });
        });
    }
  );
};

export const emailNotif = async (req, res) => {
  const { email, nama, jumlah, tanggal, tiket, tiketCode } = req.body;

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "996f553054b946",
      pass: "c108a12b3d31f6",
    },
  });

  const mailOptions = {
    from: "narmadabotanicgarden@email.com",
    to: email,
    subject: "Narmada Tiket Code",
    // text: `Hey ${nama} Here your tiket code ${tiketCode}`,
    html: `
<!DOCTYPE html>
<html>

<head>
    <style>
        *,
        ::before,
        ::after {
            --tw-border-spacing-x: 0;
            --tw-border-spacing-y: 0;
            --tw-translate-x: 0;
            --tw-translate-y: 0;
            --tw-rotate: 0;
            --tw-skew-x: 0;
            --tw-skew-y: 0;
            --tw-scale-x: 1;
            --tw-scale-y: 1;
            --tw-pan-x: ;
            --tw-pan-y: ;
            --tw-pinch-zoom: ;
            --tw-scroll-snap-strictness: proximity;
            --tw-gradient-from-position: ;
            --tw-gradient-via-position: ;
            --tw-gradient-to-position: ;
            --tw-ordinal: ;
            --tw-slashed-zero: ;
            --tw-numeric-figure: ;
            --tw-numeric-spacing: ;
            --tw-numeric-fraction: ;
            --tw-ring-inset: ;
            --tw-ring-offset-width: 0px;
            --tw-ring-offset-color: #fff;
            --tw-ring-color: rgb(59 130 246 / 0.5);
            --tw-ring-offset-shadow: 0 0 #0000;
            --tw-ring-shadow: 0 0 #0000;
            --tw-shadow: 0 0 #0000;
            --tw-shadow-colored: 0 0 #0000;
            --tw-blur: ;
            --tw-brightness: ;
            --tw-contrast: ;
            --tw-grayscale: ;
            --tw-hue-rotate: ;
            --tw-invert: ;
            --tw-saturate: ;
            --tw-sepia: ;
            --tw-drop-shadow: ;
            --tw-backdrop-blur: ;
            --tw-backdrop-brightness: ;
            --tw-backdrop-contrast: ;
            --tw-backdrop-grayscale: ;
            --tw-backdrop-hue-rotate: ;
            --tw-backdrop-invert: ;
            --tw-backdrop-opacity: ;
            --tw-backdrop-saturate: ;
            --tw-backdrop-sepia: ;
            --tw-contain-size: ;
            --tw-contain-layout: ;
            --tw-contain-paint: ;
            --tw-contain-style: ;
        }

        ::backdrop {
            --tw-border-spacing-x: 0;
            --tw-border-spacing-y: 0;
            --tw-translate-x: 0;
            --tw-translate-y: 0;
            --tw-rotate: 0;
            --tw-skew-x: 0;
            --tw-skew-y: 0;
            --tw-scale-x: 1;
            --tw-scale-y: 1;
            --tw-pan-x: ;
            --tw-pan-y: ;
            --tw-pinch-zoom: ;
            --tw-scroll-snap-strictness: proximity;
            --tw-gradient-from-position: ;
            --tw-gradient-via-position: ;
            --tw-gradient-to-position: ;
            --tw-ordinal: ;
            --tw-slashed-zero: ;
            --tw-numeric-figure: ;
            --tw-numeric-spacing: ;
            --tw-numeric-fraction: ;
            --tw-ring-inset: ;
            --tw-ring-offset-width: 0px;
            --tw-ring-offset-color: #fff;
            --tw-ring-color: rgb(59 130 246 / 0.5);
            --tw-ring-offset-shadow: 0 0 #0000;
            --tw-ring-shadow: 0 0 #0000;
            --tw-shadow: 0 0 #0000;
            --tw-shadow-colored: 0 0 #0000;
            --tw-blur: ;
            --tw-brightness: ;
            --tw-contrast: ;
            --tw-grayscale: ;
            --tw-hue-rotate: ;
            --tw-invert: ;
            --tw-saturate: ;
            --tw-sepia: ;
            --tw-drop-shadow: ;
            --tw-backdrop-blur: ;
            --tw-backdrop-brightness: ;
            --tw-backdrop-contrast: ;
            --tw-backdrop-grayscale: ;
            --tw-backdrop-hue-rotate: ;
            --tw-backdrop-invert: ;
            --tw-backdrop-opacity: ;
            --tw-backdrop-saturate: ;
            --tw-backdrop-sepia: ;
            --tw-contain-size: ;
            --tw-contain-layout: ;
            --tw-contain-paint: ;
            --tw-contain-style: ;
        }

        *,
        ::before,
        ::after {
            box-sizing: border-box;
            /* 1 */
            border-width: 0;
            /* 2 */
            border-style: solid;
            /* 2 */
            border-color: #e5e7eb;
            /* 2 */
        }

        ::before,
        ::after {
            --tw-content: '';
        }

        html,
        :host {
            line-height: 1.5;
            /* 1 */
            -webkit-text-size-adjust: 100%;
            /* 2 */
            -moz-tab-size: 4;
            /* 3 */
            tab-size: 4;
            /* 3 */
            font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
            /* 4 */
            font-feature-settings: normal;
            /* 5 */
            font-variation-settings: normal;
            /* 6 */
            -webkit-tap-highlight-color: transparent;
            /* 7 */
        }

        body {
            margin: 0;
            /* 1 */
            line-height: inherit;
            /* 2 */
        }

        hr {
            height: 0;
            /* 1 */
            color: inherit;
            /* 2 */
            border-top-width: 1px;
            /* 3 */
        }

        abbr:where([title]) {
            text-decoration: underline dotted;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            font-size: inherit;
            font-weight: inherit;
        }

        a {
            color: inherit;
            text-decoration: inherit;
        }

        b,
        strong {
            font-weight: bolder;
        }

        code,
        kbd,
        samp,
        pre {
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
            /* 1 */
            font-feature-settings: normal;
            /* 2 */
            font-variation-settings: normal;
            /* 3 */
            font-size: 1em;
            /* 4 */
        }

        small {
            font-size: 80%;
        }

        sub,
        sup {
            font-size: 75%;
            line-height: 0;
            position: relative;
            vertical-align: baseline;
        }

        sub {
            bottom: -0.25em;
        }

        sup {
            top: -0.5em;
        }

        table {
            text-indent: 0;
            /* 1 */
            border-color: inherit;
            /* 2 */
            border-collapse: collapse;
            /* 3 */
        }

        button,
        input,
        optgroup,
        select,
        textarea {
            font-family: inherit;
            /* 1 */
            font-feature-settings: inherit;
            /* 1 */
            font-variation-settings: inherit;
            /* 1 */
            font-size: 100%;
            /* 1 */
            font-weight: inherit;
            /* 1 */
            line-height: inherit;
            /* 1 */
            letter-spacing: inherit;
            /* 1 */
            color: inherit;
            /* 1 */
            margin: 0;
            /* 2 */
            padding: 0;
            /* 3 */
        }

        button,
        select {
            text-transform: none;
        }

        button,
        input:where([type='button']),
        input:where([type='reset']),
        input:where([type='submit']) {
            -webkit-appearance: button;
            /* 1 */
            background-color: transparent;
            /* 2 */
            background-image: none;
            /* 2 */
        }

        :-moz-focusring {
            outline: auto;
        }

        :-moz-ui-invalid {
            box-shadow: none;
        }

        progress {
            vertical-align: baseline;
        }

        ::-webkit-inner-spin-button,
        ::-webkit-outer-spin-button {
            height: auto;
        }

        [type='search'] {
            -webkit-appearance: textfield;
            /* 1 */
            outline-offset: -2px;
            /* 2 */
        }

        ::-webkit-search-decoration {
            -webkit-appearance: none;
        }

        ::-webkit-file-upload-button {
            -webkit-appearance: button;
            /* 1 */
            font: inherit;
            /* 2 */
        }

        summary {
            display: list-item;
        }

        blockquote,
        dl,
        dd,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        hr,
        figure,
        p,
        pre {
            margin: 0;
        }

        fieldset {
            margin: 0;
            padding: 0;
        }

        legend {
            padding: 0;
        }

        ol,
        ul,
        menu {
            list-style: none;
            margin: 0;
            padding: 0;
        }

        dialog {
            padding: 0;
        }

        textarea {
            resize: vertical;
        }

        input::placeholder,
        textarea::placeholder {
            opacity: 1;
            /* 1 */
            color: #9ca3af;
            /* 2 */
        }

        button,
        [role="button"] {
            cursor: pointer;
        }

        :disabled {
            cursor: default;
        }
        img,
        svg,
        video,
        canvas,
        audio,
        iframe,
        embed,
        object {
            display: block;
            /* 1 */
            vertical-align: middle;
            /* 2 */
        }

        img,
        video {
            max-width: 100%;
            height: auto;
        }

        [hidden]:where(:not([hidden="until-found"])) {
            display: none;
        }

        .absolute {
            position: absolute;
        }

        .relative {
            position: relative;
        }

        .-right-4 {
            right: -1rem;
        }

        .bottom-10 {
            bottom: 2.5rem;
        }

        .top-2 {
            top: 0.5rem;
        }

        .top-8 {
            top: 2rem;
        }

        .m-10 {
            margin: 2.5rem;
        }

        .mx-16 {
            margin-left: 4rem;
            margin-right: 4rem;
        }

        .my-10 {
            margin-top: 2.5rem;
            margin-bottom: 2.5rem;
        }

        .me-48 {
            margin-inline-end: 12rem;
        }

        .flex {
            display: flex;
        }

        .h-20 {
            height: 5rem;
        }

        .h-fit {
            height: fit-content;
        }

        .w-10 {
            width: 2.5rem;
        }

        .w-20 {
            width: 5rem;
        }

        .w-3\/4 {
            width: 75%;
        }

        .w-fit {
            width: fit-content;
        }

        .w-full {
            width: 100%;
        }

        .list-disc {
            list-style-type: disc;
        }

        .flex-col {
            flex-direction: column;
        }

        .items-end {
            align-items: flex-end;
        }

        .items-center {
            align-items: center;
        }

        .justify-center {
            justify-content: center;
        }

        .justify-between {
            justify-content: space-between;
        }

        .space-y-20> :not([hidden])~ :not([hidden]) {
            --tw-space-y-reverse: 0;
            margin-top: calc(5rem * calc(1 - var(--tw-space-y-reverse)));
            margin-bottom: calc(5rem * var(--tw-space-y-reverse));
        }

        .space-y-5> :not([hidden])~ :not([hidden]) {
            --tw-space-y-reverse: 0;
            margin-top: calc(1.25rem * calc(1 - var(--tw-space-y-reverse)));
            margin-bottom: calc(1.25rem * var(--tw-space-y-reverse));
        }

        .overflow-hidden {
            overflow: hidden;
        }

        .rounded-3xl {
            border-radius: 1.5rem;
        }

        .rounded-full {
            border-radius: 9999px;
        }

        .rounded-xl {
            border-radius: 0.75rem;
        }

        .rounded-r-full {
            border-top-right-radius: 9999px;
            border-bottom-right-radius: 9999px;
        }

        .border {
            border-width: 1px;
        }

        .border-t-2 {
            border-top-width: 2px;
        }

        .border-black {
            --tw-border-opacity: 1;
            border-color: rgb(0 0 0 / var(--tw-border-opacity, 1));
        }

        .bg-green-600 {
            --tw-bg-opacity: 1;
            background-color: rgb(22 163 74 / var(--tw-bg-opacity, 1));
        }

        .bg-white {
            --tw-bg-opacity: 1;
            background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
        }

        .p-3 {
            padding: 0.75rem;
        }

        .p-5 {
            padding: 1.25rem;
        }

        .px-10 {
            padding-left: 2.5rem;
            padding-right: 2.5rem;
        }

        .pl-5 {
            padding-left: 1.25rem;
        }

        .pt-8 {
            padding-top: 2rem;
        }

        .text-xl {
            font-size: 1.25rem;
            line-height: 1.75rem;
        }

        .text-white {
            --tw-text-opacity: 1;
            color: rgb(255 255 255 / var(--tw-text-opacity, 1));
        }
    </style>
</head>

<body>
    <div class="flex flex-col space-y-20 m-10">
        <div class="flex flex-col items-center justify-center">
            <div class="bg-green-600 rounded-3xl w-fit h-fit top-2 flex overflow-hidden relative text-white">
                <div class="bg-white rounded-r-full top-8 h-20 w-10 absolute"></div>
                <div class="flex flex-col my-10 mx-16 w-full">
                    <div class="flex justify-between items-end p-3">
                        <div class="h-20 w-20">
                            asdas
                        </div>
                        <div>
                            No. Pemesanan <br>
                            ${tiketCode}
                        </div>
                    </div>
                    <div class="border-t-2 pt-8 px-10 flex">
                        <div class="flex flex-col space-y-5 me-48">
                            <h1 class="text-xl">Nama Pemesan</h1>
                            <h1 class="text-xl">Jumlah Pengunjung</h1>
                            <h1 class="text-xl">Tanggal Kunjungan</h1>
                            <h1 class="text-xl">Tiket</h1>
                            <h1 class="text-xl">Jasa Fotografer</h1>
                        </div>
                        <div class="flex flex-col space-y-5">
                            <h1 class="text-xl">${nama}</h1>
                            <h1 class="text-xl">${jumlah}</h1>
                            <h1 class="text-xl">${tanggal}</h1>
                            <h1 class="text-xl">${tiket}</h1>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-full bottom-10 -right-4 h-20 w-20 absolute"></div>
            </div>
        </div>
        <div class="flex flex-col space-y-5 justify-center items-center">
            <div class="list border w-3/4 h-fit border-black rounded-xl p-5">
                Fasilitas yang Tersedia:
                <ul class="list-disc pl-5">
                    <li>
                        🌱 Spot Foto: Beragam spot foto yang instagrammable
                    </li>
                    <li>
                        📚 Kelas Edukasi: Belajar tentang tanaman lokal dan teknik berkebun
                    </li>
                    <li>
                        🎟️ Acara Khusus: Penyewaan fotografer untuk acara atau kebutuhan khusus
                    </li>
                </ul>
            </div>
            <div class="border w-3/4 h-fit border-black rounded-xl p-5">
                Note
                <ul>
                    <li>Tiket ini hanya berlaku untuk satu kali kunjungan.</li>
                    <li>Harap datang 15 menit sebelum jadwal yang tertera.</li>
                    <li>Pastikan untuk membawa perlengkapan pribadi seperti topi atau kacamata hitam.</li>
                </ul>
            </div>
        </div>
    </div>
</body>

</html>`,
  };

  transport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export const getTransaction = (req, res) => {
  const select = "SELECT * FROM booking";
  db.query(select, (err, result) => {
    if (err) {
      console.error("data gagal diambil", err);
      return res.status(500).json({ error: "gagal mengambil data transaksi" });
    }
    res.json({ transaction: result });
  });
};

export const updateTransaction = (req, res) => {
  const { order_id } = req.params;

  const update = "UPDATE booking SET status = ? WHERE order_id = ?";
  db.query(update, ["success", order_id], (err, result) => {
    if (err) {
      console.error("data gagal diupdate", err);
      return res.status(500).json({ error: "transaksi gagal diupdate" });
    }

    if (result.affectedRows === 0) {
      console.log("tidak ada data yang memiliki id tersebut");
      return res.status(404).json({ error: "data tidak ditemukan" });
    }
    res.status(200).json({ message: "data berhasil diupdate" });
  });
};
