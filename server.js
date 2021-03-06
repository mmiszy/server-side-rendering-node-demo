require('isomorphic-fetch');

const express = require('express');
const app = express();
const { Renderer } = require('./common/renderer');

app.use(express.static('static'));
app.use('/common', express.static('common'));

app.get('/*', async (req, res) => {
  const view = await Renderer({originalUrl: req.originalUrl}, false);

  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="style.css">
    <title>Siema</title>
  </head>
  <body>
    <ul>
      <li><a href="/home">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/something-else">Something else</a></li>
    </ul>
    
    <div id="view">
      ${view}
    </div>

    <script src="common/renderer.js"></script>
    <script src="browser.js"></script>
  </body>
  </html>
  `);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
