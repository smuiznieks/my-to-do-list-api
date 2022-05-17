import express from "express";
import { Low, JSONFile } from "lowdb";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";

const app = express();
app.use(cors());

// Port must be unique!
// Must update before deploying because localhost:3001 is for local use only
console.log(process.env.port)
const port = process.env.port || 3001;

// Use JSON file for storage
const file = path.join(path.resolve(), "db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);

// Read data from JSON file, this will set db.data content
await db.read();

// If file.json doesn't exist, db.data will be null
// Set default data
// WARNING! ||= was added in Node.js 15.0.0 
// You can check your node version by executing node -v 
// What would you do if you were on an older version of node? 
// Switch this to do this another way (see comments below)
db.data ||= { users: [], tasks: [] }
// for node < v15.x
// db.data = db.data || { users: [], tasks: [] };
console.log(db.data);

// app.get("/", (req, res) => {
//   res.json({ name: "selga" });
// });

// app.get("/test", (req, res) => {
//   res.json({ test: true });
// });

app.get("/data", (req, res) => {

});

// CREATE --- typically app.post
app.get('/create', (req, res) => {

});

// DELETE --- typically app.delete
app.get('/delete/:id', (req, res) => {
 
});

// UPDATE --- typically app.put
app.get('/update/:id/:state', (req, res) => {
  
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
