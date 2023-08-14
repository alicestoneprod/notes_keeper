import React, { useContext, useState } from "react"
import { Grid, TextField, Button } from "@mui/material"
import { Alert, Space } from "antd"
import { Context } from "../../index"
import { addDoc, collection } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import Typography from "@mui/material/Typography"
import PriorityDropdown from "../UI/PriorityDropdown"
import completedMessages from "./../completedTexts/completedMessages"
import "./NoteForm.css"
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
    } else if (name.length > 40) {
      setWarning(completedMessages.WARNING_LONG_NAME)
      return
    } else if (note.length > 300) {
      setWarning(completedMessages.WARNING_LONG_NOTE_TEXT)
      return
    } else if (name) {
      setAttention(completedMessages.ATTENTION_NOTE_ADDED)
    }
    const resultNote = {
      ID: Date.now(),
      name,
      noteText: note,
      priority: selectedPriority ? selectedPriority : "Не указан",
      acctuality: true,
      isHidden: false,
    }
    setWarning()
    try {
      setDisabled(true)
      await addDoc(collection(firestore, `${user.uid}`), resultNote).then(
        async (reference) => {
          const pathID = {
            path: reference,
            ID: resultNote.ID,
            UID: user.uid,
          }
          await addDoc(collection(firestore, "paths"), pathID)
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
      className='note-add-menu'
      container
      border={"2px solid #357a38"}
      justifyContent='center'
      alignItems='center'
      flexDirection='column'>
      <Typography variant='h5' style={{ marginBottom: "20px" }}>
        Добавить заметку
      </Typography>
      <Space
        direction='vertical'
        style={{ width: "100%", marginBottom: "20px" }}>
        <Alert
          className='warning-placeholder'
          message={warning}
          type='error'
          style={{
            display: warning ? "flex" : "none",
            visibility: warning ? "visible" : "none",
          }}
        />
        <Alert
          className='attention-placeholder'
          message={attention}
          style={{
            visibility: isSuccessful ? "visible" : "none",
            display: isSuccessful ? "flex" : "none",
          }}
          type='info'
        />
      </Space>
      <TextField
        placeholder='Введите заголовок заметки'
        style={{ width: "100%", marginBottom: "10px" }}
        value={name}
        onChange={handleNameChange}
        InputProps={{
          endAdornment: (
            <span
              style={{
                position: "absolute",
                bottom: 2,
                right: 6,
                color: name.length > 40 ? "red" : "",
              }}>
              {name.length}/40
            </span>
          ),
        }}
      />
      <Space style={{ marginBottom: "20px" }}>
        <PriorityDropdown
          onSelectPriority={handlePrioritySelect}
          resetPriority={resetPriority}
          setResetPriority={setResetPriority}
        />
      </Space>
      <TextField
        onKeyDown={(e) => {
          if (e.code === "Enter" && e.ctrlKey) {
            handleNoteSubmit()
          }
        }}
        className='note-input'
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
      />
      <Button
        onClick={handleNoteSubmit}
        disabled={disabled}
        variant='contained'
        style={{
          backgroundColor: "#8bc34a",
          width: "100%",
          marginTop: "20px",
          cursor: disabled ? "not-allowed" : "pointer",
        }}>
        Добавить (ctrl + enter)
      </Button>
    </Grid>
  )
}

export default NoteForm
