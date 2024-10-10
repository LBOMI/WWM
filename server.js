// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/walkingPaths', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// 경로 데이터 스키마 정의
const pathSchema = new mongoose.Schema({
  start: String,  // 출발지
  end: String,    // 도착지
  tags: String,   // 경로 태그
});

const Path = mongoose.model('Path', pathSchema);

// 경로 저장 API 엔드포인트
app.post('/savePath', (req, res) => {
  const newPath = new Path({
      start: req.body.start,
      end: req.body.end,
      tags: req.body.tags,
  });

  newPath.save((err) => {
      if (err) {
          console.error('Error saving path:', err);
          return res.status(500).send('Error saving path');
      }
      res.status(200).send('Path saved successfully');
  });
});

// 서버 시작
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


