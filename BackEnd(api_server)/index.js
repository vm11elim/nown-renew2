const express = require('express');
const app = express();

const cors = require('cors');

const PORT = 6000;

app.use(cors());

app.use(express.json());

// app.listen(3000, '127.0.0.1');

app.listen(PORT, function () {
  console.log('listening on '+PORT)
}); 

app.get('/', function (요청, 응답) {
  응답.json("BackEND"+PORT)
  // 응답.sendFile(path.join(__dirname, '/dist/spa/index.html'));
});

const customerRoutes = require('./rest/mysql/routes/customer.routes.js');
// app.use('/rest', customerRoutes);

