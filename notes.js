const fs = require("fs");
const chalk = require('chalk');

const addNote = (title, body) => {
  const notes = loadNotes();
  // The filter() method creates a new array filled with elements that pass a test provided by a function.
  // filter method filter all elements
  // const duplicateNotes = notes.filter((note)=>{
  //   return note.title === title;
  // })

  //The find() method returns the value of the first element that passes a test.
  //The find() method returns undefined if no elements are found.
  const duplicateNote = notes.find((note)=> note.title === title)

  debugger
  
  // if duplicateNotes array is empty means there is duplicate elements
  if(duplicateNote === undefined){
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes)
    console.log(chalk.green.inverse('New Note added!'));
  }else{
    console.log(chalk.red.inverse('Note Title taken!'));  
  }

};

const removeNote = (title) => {
  const notes = loadNotes();

  const notesToKeep = notes.filter((note)=> {
    return note.title !== title;
  });

  if(notes.length > notesToKeep.length){
    console.log(chalk.green.inverse('Note Removed'));
    saveNotes(notesToKeep);
  }else{
    console.log(chalk.red.inverse('No note found!'));
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
}

const loadNotes = () => {
  try{
      const dataBuffer = fs.readFileSync("notes.json");
      const dataJSON = dataBuffer.toString();
      return JSON.parse(dataJSON);
  }catch(err){
      return [];
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.green.underline.bold.inverse("\nYour Notes:"));
  notes.forEach((note)=> {
    console.log(chalk.green("\nTitle: ") + note.title + chalk.green("\nNote: ") + note.body);
  })
}

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note)=> note.title === title)
  
  if(note){
    console.log(chalk.green("Title: ") + note.title + chalk.green("\nNote: ") + note.body);
  }else{
    console.log(chalk.red.inverse("Note Not found!"));
  }
}

module.exports = { addNote: addNote, removeNote: removeNote, listNotes: listNotes, readNote: readNote};
