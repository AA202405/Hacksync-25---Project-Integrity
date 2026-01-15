require("dotenv").config();
const express = require("express");

const filterRoutes = require("./src/modules/filtering/filter.routes");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Filtering backend is running");
});

app.use("/api/filter", filterRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
