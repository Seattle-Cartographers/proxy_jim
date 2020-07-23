const httpProxy = require('http-proxy');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mainHost = 'http://localhost:3000';
const reviewHost = 'http://localhost:3004';
const attractionHost = 'http://localhost:3003';
const experienceHost = process.env.expURL;

const app = express();
const proxy = httpProxy.createProxyServer({});
const port = 80;

app.use(morgan('dev'));
app.use(cors());
app.use('/:id', express.static('./public'));


// loader.io verification route
app.get('/' + process.env.token, (req, res) => {
  res.send(process.env.token)
});


app.get('/favicon.ico/', (req, res) => {
  res.sendStatus(200);
});

// app.get('/:id/imageMain/bundle.js', (req, res) => {
//   proxy.web(req, res, {target: mainHost});
// });

// app.get('/api/carousels/:id', (req, res) => {
//   proxy.web(req, res, {target: mainHost});
// });

app.get('/:id/exp/bundle.js', (req, res) => {
  proxy.web(req, res, {target: experienceHost});
});
app.get('/:id/exp/*', (req, res) => {
  proxy.web(req, res, {target: experienceHost});
});

app.get('/:id/fonts/*', (req, res) => {
  proxy.web(req, res, {target: experienceHost});
});

// app.get('/:id/bestNearby/bundle.js', (req, res) => {
//   proxy.web(req, res, {target: attractionHost});
// });

// app.get('/:id/api/nearbyattractions', (req, res) => {
//   proxy.web(req, res, {target: attractionHost});
// });

// app.get('/:id/reviewsModule/bundle.js', (req, res) => {
//   proxy.web(req, res, {target: reviewHost});
// });
// app.get('/:id/api/reviews', (req, res) => {
//   proxy.web(req, res, {target: reviewHost});
// });
// app.patch('/:id/api/reviews/:reviewId', (req, res) => {
//   proxy.web(req, res, {target: reviewHost});
// });
// app.patch('/:id/api/reviews/:reviewId/:imageId', (req, res) => {
//   proxy.web(req, res, {target: reviewHost});
// });

proxy.on('error', function (err, req, res) {
  console.log(res);
  res.status(500).send(err);
});

app.listen(port);

