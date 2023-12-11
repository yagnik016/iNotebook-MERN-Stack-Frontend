import { useState } from "react";
import noteContext from "./Notecontext";
import React from "react";

export default function NoteState(props) {
  const [notes, setNotes] = useState([]);
  const getnotes = async () => {
    const response = await fetch("http://localhost:8000/notes/v1/getallnotes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem("token")

      },
    });
    const json = await response.json();
    setNotes(json);
  };
  const addnotes = async (title, description, tag) => {
    const response = await fetch("http://localhost:8000/notes/v1/addnote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem("token")

      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };
  const deleteNote = async (id) => {
    const response = await fetch(
      `http://localhost:8000/notes/v1/deletenote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
          localStorage.getItem("token")

        },
      }
    );
    const json = await response.json();
    console.log(json);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  const editnotes = async (id, title, description, tag) => {
    const response = await fetch(
      `http://localhost:8000/notes/v1/updatenote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem("token")
        },
        body: JSON.stringify({ title, description, tag }),
      }
    );
    const json = await response.json();
    console.log(json);
    const newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  return (
    <noteContext.Provider
      value={{ notes, getnotes, addnotes, deleteNote, editnotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
}
