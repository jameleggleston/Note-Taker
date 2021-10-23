const express = require('express');
const path = require('path');
//adding uuid to create a unique identifier for each note
const { v4: uuidv4 } = require('uuid'); 
const {readAndAppend, readFile, deleteNote} = require('./public/assets/helper/readAndAppend');
const database = './db/db.json';

const PORT = process.env.port || 3001;

const app = express();
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    readFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

app.post('/api/notes', (req, res) => {
    console.log(req.body);
    const {title, text} = req.body;

    if (req.body) {
        const newNote = {
          title,
          text,
          id: uuidv4(),
        };
    
        readAndAppend(newNote, './db/db.json');
        res.json('note added');
    } else {
        res.error('error in saving note');
    }
}); 

app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id;
    deleteNote(database, id);
    res.json({ id: id });
});

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);