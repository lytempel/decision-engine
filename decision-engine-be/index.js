const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Persons API Routes
app.use("/api/persons", require("./routes/api/persons"));

// Homepage Route
app.get("/", (req, res) => {
  res.send("<h1>Persons app</h1>");
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
