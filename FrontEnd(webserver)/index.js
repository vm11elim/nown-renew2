const { json } = require('express');
const express = require('express');
const app = express();

app.use(express.json());

app.listen(5001, function () {
  console.log('listening on 5001')
}); 

app.get('/', function (요청, 응답) {
  응답.json("Front 임.")
  // 응답.sendFile(path.join(__dirname, '/dist/spa/index.html'));
});

