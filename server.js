     const express = require('express');
const SneaksAPI = require('sneaks-api');
const cors = require('cors');
const app = express();

app.use(cors());
const sneaks = new SneaksAPI();

app.get('/api/sneakers', (req, res) => {
  sneaks.getProducts("Nike", 15, (err, products) => {
    if (err) return res.status(500).json({ error: "Lỗi gọi API" });
    res.json(products);
  });
});

app.listen(3002, () => {
  console.log("✅ Backend chạy tại http://localhost:3002");
});