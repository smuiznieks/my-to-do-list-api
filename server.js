// console.log(process.argv);
const express = require('express');
// console.log(express);

const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.json({"name": "selga"});
});

app.get("/test", (req, res) => {
  res.json({"test": true});
})

// create = post
// read = get
// update = put/patch
// delete = delete

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
