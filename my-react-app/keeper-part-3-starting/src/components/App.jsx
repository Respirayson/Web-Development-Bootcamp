import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {

  const [allNotes, setAllNotes] = React.useState([]);

  function addNote(newNote) {
    setAllNotes((currentNotes) => {
      return [...currentNotes, newNote]
    })
  };

  function deleteNote(id) {
    setAllNotes((currentNotes) => {
      return currentNotes.filter((element, index) => {
        return id !== index;
      })
    })
  }

  return (
    <div>
      <Header />
      <CreateArea addNotes={addNote} />
      {allNotes.map((note, index) => {
        return <Note key={index} id={index} onDelete={deleteNote} title={note.title} content={note.content} />
      })}
      <Footer />
    </div>
  );
}

export default App;
