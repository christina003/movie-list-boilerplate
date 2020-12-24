const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.static('public'));

app.use(express.json());


app.use((req, res, next) => {
  console.log(`${req.method} request coming in for ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send("Hello world")
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})