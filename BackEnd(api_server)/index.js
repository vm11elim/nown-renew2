const express = require('express');
const app = express();

app.use(express.json());

app.listen(3000, function () {
  console.log('listening on 3000')
}); 

app.get('/', function (요청, 응답) {
  응답.json("BackEND")
  // 응답.sendFile(path.join(__dirname, '/dist/spa/index.html'));
});

