import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import dotenv from "dotenv";
import db from "../database/db.js";
import nodemailer from "nodemailer";
import fs from "node:fs";
import { promisify } from "node:util";

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
  const readFileAsync = promisify(fs.readFile);
  const imageAttachment = await readFileAsync("email/brand.png");

  //   const transport = nodemailer.createTransport({
  //     host: "sandbox.smtp.mailtrap.io",
  //     port: 2525,
  //     auth: {
  //       user: "996f553054b946",
  //       pass: "c108a12b3d31f6",
  //     },
  //   });

  let transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.MAIL_CLIENT_ID,
      clientSecret: process.env.MAIL_CLIENT_SECRET,
      refreshToken: process.env.MAIL_REFRESH_TOKEN,
    },
  });

  const mailOptions = {
    from: "narmadabotanicgarden@gmail.com",
    to: email,
    subject: "Narmada Tiket Code",
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

        /*
! tailwindcss v3.4.15 | MIT License | https://tailwindcss.com
*/
        /*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/
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

        /*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/
        hr {
            height: 0;
            /* 1 */
            color: inherit;
            /* 2 */
            border-top-width: 1px;
            /* 3 */
        }

        /*
Add the correct text decoration in Chrome, Edge, and Safari.
*/
        abbr:where([title]) {
            text-decoration: underline dotted;
        }

        /*
Remove the default font size and weight for headings.
*/
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            font-size: inherit;
            font-weight: inherit;
        }

        /*
Reset links to optimize for opt-in styling instead of opt-out.
*/
        a {
            color: inherit;
            text-decoration: inherit;
        }

        /*
Add the correct font weight in Edge and Safari.
*/
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

        /*
Add the correct font size in all browsers.
*/
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

        /*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/
        table {
            text-indent: 0;
            /* 1 */
            border-color: inherit;
            /* 2 */
            border-collapse: collapse;
            /* 3 */
        }

        /*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/
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

        /*
Remove the inheritance of text transform in Edge and Firefox.
*/
        button,
        select {
            text-transform: none;
        }

        /*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/
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

        /*
Use the modern Firefox focus style for all focusable elements.
*/
        :-moz-focusring {
            outline: auto;
        }

        :-moz-ui-invalid {
            box-shadow: none;
        }

        /*
Add the correct vertical alignment in Chrome and Firefox.
*/
        progress {
            vertical-align: baseline;
        }

        /*
Correct the cursor style of increment and decrement buttons in Safari.
*/
        ::-webkit-inner-spin-button,
        ::-webkit-outer-spin-button {
            height: auto;
        }

        /*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/
        [type='search'] {
            -webkit-appearance: textfield;
            /* 1 */
            outline-offset: -2px;
            /* 2 */
        }

        /*
Remove the inner padding in Chrome and Safari on macOS.
*/
        ::-webkit-search-decoration {
            -webkit-appearance: none;
        }

        ::-webkit-file-upload-button {
            -webkit-appearance: button;
            /* 1 */
            font: inherit;
            /* 2 */
        }

        /*
Add the correct display in Chrome and Safari.
*/
        summary {
            display: list-item;
        }

        /*
Removes the default spacing and border for appropriate elements.
*/
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

        /*
Reset default styling for dialogs.
*/
        dialog {
            padding: 0;
        }

        /*
Prevent resizing textareas horizontally by default.
*/
        textarea {
            resize: vertical;
        }

        /*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/
        input::placeholder,
        textarea::placeholder {
            opacity: 1;
            /* 1 */
            color: #9ca3af;
            /* 2 */
        }

        /*
Set the default cursor for buttons.
*/
        button,
        [role="button"] {
            cursor: pointer;
        }

        /*
Make sure disabled buttons don't get the pointer cursor.
*/
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

        /*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/
        img,
        video {
            max-width: 100%;
            height: auto;
        }

        /* Make elements with the HTML hidden attribute stay hidden by default */
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

        .mb-10 {
            margin-bottom: 2.5rem;
        }

        .mt-4 {
            margin-top: 1rem;
        }

        .flex {
            display: flex;
        }

        .table {
            display: table;
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

        .w-40 {
            width: 10rem;
        }

        .w-fit {
            width: fit-content;
        }

        .w-full {
            width: 100%;
        }

        .table-auto {
            table-layout: auto;
        }

        .border-separate {
            border-collapse: separate;
        }

        .border-spacing-x-10 {
            --tw-border-spacing-x: 2.5rem;
            border-spacing: var(--tw-border-spacing-x) var(--tw-border-spacing-y);
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

        .space-x-10> :not([hidden])~ :not([hidden]) {
            --tw-space-x-reverse: 0;
            margin-right: calc(2.5rem * var(--tw-space-x-reverse));
            margin-left: calc(2.5rem * calc(1 - var(--tw-space-x-reverse)));
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

        .pl-5 {
            padding-left: 1.25rem;
        }

        .pt-8 {
            padding-top: 2rem;
        }

        .text-right {
            text-align: right;
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
                <div class="flex flex-col mb-10 mt-4 mx-16 w-full">
                    <div class="flex justify-between items-end space-x-10 p-3">
                        <div class="h-fit w-40">
                            <img src="cid:brand" alt="Narmada Botanic Garden">
                        </div>
                        <div class="text-right">
                            No. Pemesanan <br>
                            ${tiketCode}
                        </div>
                    </div>
                    <div class="border-t-2 pt-8">
                        <table class="border-separate table-auto border-spacing-x-10">
                            <tr>
                                <td>Nama Pemesan</td>
                                <td>${nama}</td>
                            </tr>
                            <tr>
                                <td>Jumlah Tiket</td>
                                <td>${jumlah}</td>
                            </tr>
                            <tr>
                                <td>Tanggal Kunjungan</td>
                                <td>${tanggal}</td>
                            </tr>
                            <tr>
                                <td>Jenis Tiket</td>
                                <td>${tiket}</td>
                            </tr>
                        </table>
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
            <div class="list border w-3/4 h-fit border-black rounded-xl p-5">
                Note:
                <ul class="list-disc pl-5">
                    <li>Tiket ini hanya berlaku untuk satu kali kunjungan.</li>
                    <li>Harap datang 15 menit sebelum jadwal yang tertera.</li>
                    <li>Pastikan untuk membawa perlengkapan pribadi seperti topi atau kacamata hitam.</li>
                </ul>
            </div>
        </div>
    </div>
</body>

</html>
    `,
    attachments: [
      {
        filename: "brand.png",
        content: imageAttachment,
        encoding: "base64",
        cid: "brand",
      },
    ],
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
  const select = "SELECT * FROM booking ORDER BY tanggal ASC";
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
