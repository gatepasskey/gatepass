const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.resolve(__dirname, '../client')));

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})