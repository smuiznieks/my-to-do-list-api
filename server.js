// console.log(process.argv);
import express from "express";
// console.log(express);
import { join, dirname } from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";

const app = express();
const port = 3001;

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, "db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);

// Read data from JSON file, this will set db.data content
await db.read();

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
