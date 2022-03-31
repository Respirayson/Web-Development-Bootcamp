import React from "react";

function CreateArea(props) {

  const [note, setNote] = React.useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const {value, name} = event.target;

    setNote(prevNotes => {
      return {
        ...prevNotes,
        [name]: value,
      }
    });
    // console.log(note)
  }

  return (
    <div>
      <form>
        <input value={note.title} onChange={handleChange} name="title" placeholder="Title" />
        <textarea value={note.content} onChange={handleChange} name="content" placeholder="Take a note..." rows="3" />
        <button onClick={(event) => {
          props.addNotes(note)
          event.preventDefault()
          setNote({
            title: "",
            content: ""
          })}}>
          Add
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
