const express = require('express');
const app = express();
const conn = require('./db/conn');
const dotenv = require('dotenv');
dotenv.config();
const userRoutes = require('./router/userRouters');
const authRoutes = require('./router/authRouters');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

app.use(cors());

//database connection
conn();
app.use(express.json());

app.use('/',express.static(__dirname + '/../client'));
//userRoutes
app.use(userRoutes);

//authRoutes
app.use(authRoutes);

app.get('/test',(req,res) =>{res.status(200).send()});

// app.listen(process.env.PORT, () => {
//     console.log(`server running at http://localhost:${process.env.PORT}`)
// });

https.createServer({key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
  }, app).listen(process.env.PORT, () => {
    console.log(`Listening on port https://13.233.4.160:${process.env.PORT}`);
  });