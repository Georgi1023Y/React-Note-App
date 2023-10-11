import React, { Component } from "react";

export class NoteApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [], // An array that will store notes
      newNote: "", // The current input for adding a new note
      editingIndex: -1, // Index of the note being edited (initially set to -1)
      editedNote: "" // Stores the note that is being edited
    };
  }

  // Function that will handle changes in the input for adding a new note
  handleNoteChange = (e) => {
    this.setState({ newNote: e.target.value });
  };

  // Function that will add a new note to the list
  handleAddNote = () => {
    if (this.state.newNote !== "") {
      const notes = [...this.state.notes, this.state.newNote];
      this.setState({ notes, newNote: "" });
    }
  };

  // Function that deletes a note at a specified index
  handleDeleteNote = (index) => {
    const notes = [...this.state.notes];
    notes.splice(index, 1);
    this.setState({ notes });
  };

  // Function that handles editing a note
  handleEditNote = (index) => {
    const noteToEdit = this.state.notes[index];
    this.setState({ editingIndex: index, editedNote: noteToEdit });
  };

  // Function taht saves changes after editing a note
  handleSaveNote = (index, updatedNote) => {
    const notes = [...this.state.notes];
    notes[index] = updatedNote;
    this.setState({ notes, editingIndex: -1, editedNote: "" });
  };

  render() {
    return (
      <div className="container">
        <h1>React Note App</h1>
        <input
          type="text"
          placeholder="Enter your text"
          value={this.state.newNote}
          onChange={this.handleNoteChange}
        />
        <button onClick={this.handleAddNote}>Add Note</button>
        <ul>
          {this.state.notes.map((note, index) => (
            <li key={index}>
              {this.state.editingIndex === index ? (
                <div>
                  <input
                    type="text"
                    value={this.state.editedNote}
                    onChange={(e) =>
                      this.setState({ editedNote: e.target.value })
                    }
                  />
                  <button
                    className="edit-button"
                    onClick={() =>
                      this.handleSaveNote(index, this.state.editedNote)
                    }
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  {note}
                  <button
                    className="edit-button"
                    onClick={() => this.handleEditNote(index)}
                  >
                    Edit
                  </button>
                  <button onClick={() => this.handleDeleteNote(index)}>
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
