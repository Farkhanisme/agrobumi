import app from "./app.js";
import { testConnection } from "./database/db.js";

const PORT = 3000;

app.get("/", (req, res) => {
  res.send(`server berjalan di ${PORT}`);
});

app.listen(PORT, async () => {
  await testConnection();
  console.log(`running on port ${PORT}`);
});
