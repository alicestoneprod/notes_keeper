import React, { useContext, useState } from "react"
import { Grid, Input, TextField, Button } from "@mui/material"
import { Alert, Space } from "antd"
import { Context } from "../../index"
import { addDoc, collection } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import Typography from "@mui/material/Typography"
import PriorityDropdown from "../UI/PriorityDropdown"
import completedMessages from "./../completedTexts/completedMessages"
const NoteForm = () => {
  const { auth, firestore } = useContext(Context)
  const [user] = useAuthState(auth)
  const [disabled, setDisabled] = useState(false)
  const [note, setNote] = useState("")
  const [name, setName] = useState("")
  const [warning, setWarning] = useState()
  const [isSuccessful, setIsSuccessful] = useState(false)
  const [selectedPriority, setSelectedPriority] = useState(null)
  const [resetPriority, setResetPriority] = useState(false)
  const [attention, setAttention] = useState("")
  const handleTextChange = (e) => {
    setNote(e.target.value)
  }
  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handlePrioritySelect = (priority) => {
    setSelectedPriority(priority)
  }

  const handleNoteSubmit = async () => {
    if (name === "" || note === "") {
      if (name === "" && note === "") {
        setWarning(completedMessages.WARNING_NO_NAME_AND_TEXT)
        return
      } else if (name === "") {
        setWarning(completedMessages.WARNING_NO_NAME)
        return
      } else if (note === "") {
        setWarning(completedMessages.WARNING_NO_TEXT)
        return
      }
    } else if (selectedPriority === null) {
      setAttention(completedMessages.ATTENTION_NO_PRIORITY)
    } else if (selectedPriority !== null) {
      setAttention(completedMessages.ATTENTION_NOTE_ADDED)
    }
    const resultNote = {
      ID: Date.now(),
      name,
      noteText: note,
      color: "default",
      priority: selectedPriority ? selectedPriority : "Неважно",
    }
    setWarning()
    try {
      setDisabled(true)
      await addDoc(collection(firestore, `${user.uid}`), resultNote).then(
        async (reference) => {
          const pathID = {
            path: reference,
            ID: resultNote.ID,
          }
          await addDoc(collection(firestore, `paths`), pathID)
        }
      )

      setName("")
      setNote("")
      setResetPriority(true)
      setIsSuccessful(true)
      setDisabled(false)
      setTimeout(() => {
        setIsSuccessful(false)
      }, 7000)
    } catch (e) {
      setWarning("Произошла какая-то ошибка, заметка не была добавлена.")
      setDisabled(false)
    }
  }

  return (
    <Grid
      container
      border={"2px solid #357a38"}
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
      style={{
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        maxWidth: "500px",
        margin: "0 auto",
      }}>
      <Typography variant='h5' style={{ marginBottom: "20px" }}>
        Меню добавления заметки
      </Typography>
      <Space
        direction='vertical'
        style={{ width: "100%", marginBottom: "20px" }}>
        <Alert
          message={warning}
          style={{
            display: warning ? "flex" : "none",
            visibility: warning ? "visible" : "none",
            fontWeight: "500",
            textAlign: "center",
          }}
          type='error'
        />
        <Alert
          message={attention}
          style={{
            textAlign: "center",
            fontWeight: "500",
            visibility: isSuccessful ? "visible" : "none",
            display: isSuccessful ? "flex" : "none",
          }}
          type='info'
        />
      </Space>
      <Input
        placeholder='Введите заголовок заметки'
        style={{ width: "100%", marginBottom: "10px" }}
        value={name}
        onChange={handleNameChange}
      />
      <Space style={{ marginBottom: "20px" }}>
        <PriorityDropdown
          onSelectPriority={handlePrioritySelect}
          resetPriority={resetPriority}
          setResetPriority={setResetPriority}
        />
      </Space>
      <TextField
        placeholder='Введите содержание заметки'
        multiline
        value={note}
        onChange={handleTextChange}
        rows={8}
        variant='outlined'
        InputProps={{
          endAdornment: (
            <span
              style={{
                position: "absolute",
                bottom: 8,
                right: 8,
                color: note.length > 300 ? "red" : "",
              }}>
              {note.length}/300
            </span>
          ),
        }}
        style={{ width: "100%", marginBottom: "20px", position: "relative" }}
      />
      <Button
        onClick={handleNoteSubmit}
        disabled={disabled}
        variant='contained'
        style={{
          backgroundColor: "#8bc34a",
          width: "100%",
          cursor: disabled ? "not-allowed" : "pointer",
        }}>
        Добавить заметку
      </Button>
    </Grid>
  )
}

export default NoteForm
