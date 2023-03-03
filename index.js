const yargs = require("yargs");
const notes = require("./notes");

//add
yargs.command({
  command: "add",
  describe: "Add a new note!",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
        describe: "Content of Note",
        demandOption: true,
        type: 'string'
    }
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

//remove
yargs.command({
  command: "remove",
  describe: "Remove a note!",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

//list
yargs.command({
  command: "list",
  describe: "List your Notes!",
  handler() {
    notes.listNotes()
  },
});

//read
yargs.command({
  command: "read",
  describe: "Read a Note!",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    }
  },
  handler(argv) {
    notes.readNote(argv.title)
  },
});

yargs.parse();
