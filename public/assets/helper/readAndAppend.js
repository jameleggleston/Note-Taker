const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(file, parsedData);
      }
    });
};

const deleteNote = (file, passedId) => {
    fs.readFile(file, 'utf8', (err,data) => {
      if(err){
        console.error(err);
      } else {
        const ogNotes = JSON.parse(data);
        let newNotes = ogNotes.filter(({ id }) => id !== passedId);
        fs.writeFile(file, JSON.stringify(newNotes), (err) => {
          if(err){
            console.error(err);
          } else {
            console.log('successfully deleted note');
          }
        });
        }
    });
}

module.exports = {readAndAppend, writeToFile, deleteNote, readFile};