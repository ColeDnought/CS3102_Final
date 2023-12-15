import React,{useEffect,useState} from 'react'
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import NoteContainer from "./NoteContainer";

 function App() {
  const [backendData, setBackendData] = useState([{}]);
  const [dataUpdated, setDataUpdated] = useState(true);

  function submitNote(note) {
    async function postData () {
      console.log("Adding Note: ", note.title);
      const response = await fetch("http://localhost:5000/api/postData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title: note.title,
          content: note.content
        })
      })
      if(response?.status === 200) {
        setDataUpdated(!dataUpdated);
      }
    };
    postData();
   }

  useEffect(()=>{
    fetch("/api").then(
      response => response.json() 
    ).then(
      data =>{
        setBackendData(data);
        // console.log(data);
      }
    )
  },[dataUpdated])

  function deleteNote(note) {
    async function postData () {
      console.log("Deleting: ", note.title);
      const response = await fetch("http://localhost:5000/api/deleteData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title: note.tile,
          content: note.content
        })
      })
      if(response?.status === 200) {
        setDataUpdated(!dataUpdated);
      }
    };
    postData();
   }

  useEffect(()=>{
    fetch("/api").then(
      response => response.json() 
    ).then(
      data =>{
        setBackendData(data);
        // console.log(data);
      }
    )
  },[dataUpdated])

  return (
    <div>
      <Header />
      <NoteContainer onAdd={submitNote}/>
      {(backendData.length === 0)? (
        <h1>Loading...</h1>
      ):((
      backendData.map((note, i) => {
        return (
          <Note
            id={i}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
            />
          );
        }))
      )}
      <Footer />
    </div>
  )
}
export default App


/*
1. form create 
2. hit api upon submitting form 
3. fetch db after submitting form 
*/
