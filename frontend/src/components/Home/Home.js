import React from "react";
import AddNote from "../AddNote/AddNote";
import NoteBox from "../NoteBox/NoteBox";
export default function Home() {
  return (
    <>
      <AddNote/>
      <hr/>
      <NoteBox/>
    </>
  );
}
