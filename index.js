const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your new Google Apps Script endpoint
const GAS_URL = "https://script.google.com/macros/s/AKfycbyi7Umb82JWCKeJ0F0oH0jimKP9ZCr4boFvfpp7PWhDvZ4LbGrfjd_oJhlXTdKcJcNpPA/exec";

app.use(cors());
app.use(bodyParser.json());

// Handle POST
app.post("/submit", async (req, res) => {
  try {
    const response = await axios.post(GAS_URL, req.body);
    res.status(200).send(response.data);
  } catch (error) {
    console.error("POST error:", error.message);
    res.status(500).send({ error: "Failed to submit data" });
  }
});

// Handle GET
app.get("/fetch", async (req, res) => {
  try {
    const response = await axios.get(GAS_URL);
    res.status(200).send(response.data);
  } catch (error) {
    console.error("GET error:", error.message);
    res.status(500).send({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy listening on port ${PORT}`);
});
