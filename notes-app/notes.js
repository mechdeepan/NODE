const chalk = require("chalk");
const fs = require("fs");
const chalks = require("chalk");

//Adding Notes
const addNote =  (title, body) => {
  const notes = loadNotes();
  const duplicationNotes = notes.filter((note) => note.title === title)
  // debugger
  if (duplicationNotes.length === 0) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.bgGreen("New note added!"));
  } else {
    console.log(chalk.bgRed("Note title taken !"));
  }
};

const readNote = (title) =>{
  const notes = loadNotes()
  const note = notes.find((note) => note.title === title)
  if(note){
    console.log(chalk.green.inverse(note.title))
    console.log(note.body)
  }else{
    console.log(chalk.red.inverse("Note not found !"))
  }
}

const saveNotes =  (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
  console.log(dataJSON);
};

//remove title from the notes.json
const removeNotes = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title)
  if (notes.length > notesToKeep.length) {
    //if you want to compare the result and input use lenght
    console.log(chalk.bgGreen("Title is removed successfully!"));
  } else {
    console.log(chalk.bgRed("Failed to remove"));
  }

  saveNotes(notesToKeep)
};

const loadNotes =  () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

//Listing the notes fron note.js 
const listNotes = () => {
  const notes = loadNotes()
console.log(chalk.inverse('Your Notes'))
notes.forEach((notes)=> {
  console.log(notes.title)
});
}



module.exports = {
  addNote: addNote,
  removeNotes: removeNotes,
  listNotes : listNotes,
  readNote : readNote
};
