import express from "express";
import { Low, JSONFile } from "lowdb";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Port must be unique!
// Must update before deploying because localhost:3001 is for local use only
// console.log(process.env.port)
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

function selgaMiddleware(req, res, next) {
  console.log('I AM MIDDLEWARE!!!');
  next();
}

function anotherOne(req, res, next) {
  console.log(req.params);
  next();
}

// GET
app.get("/tasks", selgaMiddleware, (req, res) => {
  res.json(db.data.tasks);
});

// CREATE --- typically app.post
// app.get('/create', (req, res) => {
//   db.data.tasks.push({
//     id: uuidv4(),
//     userId: 101,
//     description: 'Learn more about cloud computing',
//     isComplete: false
//   });
//   db.write();
//   res.send('Task created!');
// });
app.post('/create', (req, res) => {
  console.log(req.body);
    db.data.tasks.push({
      id: uuidv4(),
      userId: req.body.userId,
      description: req.body.description,
      isComplete: false
    });
    db.write();
  res.send("Task Created!");
})

// DELETE --- typically app.delete
app.get('/delete/:id', (req, res) => {
  // console.log(req.params.id);
  db.data.tasks = db.data.tasks.filter((task) => task.id !== req.params.id);
  db.write();
  res.send('Task deleted');
});

// UPDATE --- typically app.put
app.get('/update/:id/:description', selgaMiddleware, anotherOne, (req, res) => {
  console.log(req.params);
  // let updatedTask = db.data.tasks.filter((task) => task.id === req.params.id);
  let updatedTask = db.data.tasks.find((task) => task.id === req.params.id);
  console.log(updatedTask);
  // updatedTask[0].description = req.params.description;
  updatedTask.description = req.params.description;
  db.write();
  res.send('Task updated!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
