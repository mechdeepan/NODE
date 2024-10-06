const yargs = require('yargs')
const chalks = require('chalk')
const notes = require('./notes')
yargs.version("1.1.0")

//create add command
yargs.command({
  command: 'add',
  describe: "Add new note",
  builder: {
    title: {
      describe: 'note title',
      demandOption: true,
      type: 'string'
    },
    body : {
       describe : 'Note body',
       demandOption : true,
       type : 'string'
    }
  },
  handler(argv) {
   notes.addNote(argv.title,argv.body)
  }
});

//create remove command
yargs.command({
  command: 'remove',
  describe: 'Removing the notes',
  builder:{
    title:{
      describe: 'note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv){
    notes.removeNotes(argv.title)
    console.log("Removing the note!");
  },

});

//creating list note
yargs.command({
  command: "list",
  description: "List the notes",
  handler() {
    notes.listNotes()
  }
})

yargs.command({
  command: "read",
  description: "read the notes",
  builder : {
    title : {
      describe : 'read the notes',
      demandOption : true,
      type : 'string'
    }
  },
  handler:  (argv) => {
    notes.readNote(argv.title)
    console.log("Read the notes");
  },
});

// add,remove,read,list
console.log(yargs.argv);
