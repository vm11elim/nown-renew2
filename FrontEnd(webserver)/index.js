// const { json } = require('express');
const express = require('express');
const path = require('path');


const app = express();

app.use(express.json());

app.listen(3000, function () {
  console.log('listening on 3000')
}); 

app.use(express.static(path.join(__dirname, '/')));//이렇게 해야 하위폴더에 접근 가능해짐..
app.get('/', function (요청, 응답) {
  // 응답.json("Front 임.")
  응답.sendFile(path.join(__dirname, 'index.html'));
});

