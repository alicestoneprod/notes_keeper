import { Grid, Container } from "@mui/material"
import { useContext } from "react"
import { Context } from "../.."
import { deleteDoc, collection } from "firebase/firestore"
import { message } from "antd"
import { useCollectionData } from "react-firebase-hooks/firestore"
import Loader from "../UI/Loader"
import { useAuthState } from "react-firebase-hooks/auth"
import NoteCard from "../UI/NoteCard"
const Notes = () => {
  const { firestore, auth } = useContext(Context)
  const [user] = useAuthState(auth)
  const [data, loading, error] = useCollectionData(
    collection(firestore, `${user.uid}`)
  )
  const [paths, pathsLoading, pathsError] = useCollectionData(
    collection(firestore, `paths`)
  )
  const deleteDocument = async (ref) => {
    message.info("Запрос на удаление заметки был отправлен", 1.5)
    await deleteDoc(ref).then(() =>
      message.success("Заметка была успешно удалена!", 1.5)
    )
  }
  const deleteNoteHandler = (noteid) => {
    paths.forEach((array) => {
      if (array.ID === noteid) {
        deleteDocument(array.path)
        console.log(array.path)
      }
    })
  }
  if (loading) {
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
    <Grid container style={{ height: window.innerHeight - 500 }}>
      <Grid
        style={{
          display: "inline-flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}>
        {data.length !== 0 ? (
          data.map((el, index) => {
            return (
              <div>
                <NoteCard
                  deleteNoteHandler={deleteNoteHandler}
                  id={el.ID}
                  index={index}
                  text={el.noteText}
                  name={el.name}
                  priority={el.priority}></NoteCard>
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
