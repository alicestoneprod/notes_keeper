import React from "react"
import { Grid, Container } from "@mui/material"
import { useContext } from "react"
import { Context } from "../.."
import { useState } from "react"
import { deleteDoc, collection, updateDoc } from "firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore"
import Loader from "../UI/Loader"
import { useAuthState } from "react-firebase-hooks/auth"
import NoteCard from "../UI/NoteCard"
import { FloatButton } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import DeleteAllNotesModal from "../UI/DeleteAllNotesModal"
const Notes = () => {
  const { firestore, auth } = useContext(Context)
  const [user] = useAuthState(auth)
  const [isModalAllNotes, setIsModalAllNotes] = useState(false)
  const [data, loading] = useCollectionData(
    collection(firestore, `${user.uid}`)
  )
  const [paths, pathsLoading] = useCollectionData(
    collection(firestore, `paths`)
  )

  const showModal = () => {
    setIsModalAllNotes(true)
  }

  const deleteAllNotesHandler = () => {
    showModal()
  }
  const deleteNoteHandler = (noteid) => {
    paths.forEach((el) => {
      if (el.ID === noteid) {
        deleteDoc(el.path)
      }
    })
  }
  const completeNoteHandler = (noteid, el) => {
    paths.forEach((element) => {
      if (element.ID === noteid) {
        updateDoc(element.path, { ...el, acctuality: !el.acctuality })
      }
    })
  }

  const hideNoteHandler = (noteid, el) => {
    paths.forEach((array) => {
      if (array.ID === noteid) {
        updateDoc(array.path, { ...el, isHidden: !el.isHidden })
      }
    })
  }

  if (loading || pathsLoading) {
    return (
      <Container>
        <Grid
          container
          style={{ height: window.innerHeight - 150 }}
          justifyContent='center'>
          <Loader text={"Загружаю список заметок"} />
        </Grid>
      </Container>
    )
  }
  return (
    <Grid container style={{ height: window.innerHeight - 100 }}>
      <FloatButton
        style={{
          display: data.length > 0 ? "flex" : "none",
          position: "relative",
          left: `${window.innerWidth * 0.5}px`,
        }}
        icon={
          <DeleteOutlined
            style={{ color: "red" }}
            onClick={() => deleteAllNotesHandler(user.uid)}
          />
        }
        tooltip={<div>Удалить заметки</div>}
      />
      <Grid
        style={{
          display: "inline-flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}>
        <DeleteAllNotesModal
          isModalAllNotes={isModalAllNotes}
          setIsModalAllNotes={setIsModalAllNotes}
          paths={paths}
          UID={user.uid}
        />

        {data.length !== 0 ? (
          data
            .sort((el1, el2) => el1.ID - el2.ID)
            .map((el, index) => {
              return (
                <div>
                  <NoteCard
                    deleteNoteHandler={deleteNoteHandler}
                    completeNoteHandler={completeNoteHandler}
                    hideNoteHandler={hideNoteHandler}
                    id={el.ID}
                    paths={paths}
                    el={el}
                    index={index}></NoteCard>
                </div>
              )
            })
        ) : (
          <div>СПИСОК ПУСТ!</div>
        )}
      </Grid>
    </Grid>
  )
}

export default Notes
