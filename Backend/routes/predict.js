// routes/predict.js
const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/predict", async (req, res) => {
  const { symptoms } = req.body;

  try {
    const response = await axios.post("http://localhost:5000/predict", {
      symptoms,
    });
    return res.json(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error calling ML service" });
  }
});

module.exports = router;
