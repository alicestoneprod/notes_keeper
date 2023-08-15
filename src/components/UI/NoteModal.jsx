import { Modal } from "antd"
import { Avatar, Grid } from "@mui/material"
import { FiEdit3 } from "react-icons/fi"
import { useState } from "react"
import "./NoteModal.css"
import Input from "antd/es/input/Input"
import { FaSyncAlt } from "react-icons/fa"
import PriorityDropdown from "./PriorityDropdown"
import { updateDoc } from "firebase/firestore"
const NoteModal = ({ isModalOpen, setIsModalOpen, index, el, paths, ID }) => {
  const [selectedPriority, setSelectedPriority] = useState(el.priority)
  const [resetPriority, setResetPriority] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [oldAccctuality, setAcctuality] = useState(el.acctuality)
  const [newNoteName, setNewNoteName] = useState(el.name)
  const [newNoteText, setNewNoteText] = useState(el.noteText)
  const handleSendChanges = async () => {
    const elByPath = paths.filter((el) => el.ID === ID)[0].path
    console.log(elByPath)
    const newData = {
      name: newNoteName,
      noteText: newNoteText,
      priority: selectedPriority,
      acctuality: oldAccctuality,
    }
    updateDoc(elByPath, newData)
    setEditMode(false)
    setIsModalOpen(false)
  }
  const handleOk = () => {
    if (editMode) {
      handleSendChanges()
    }
    setEditMode(false)
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setEditMode(false)
    setIsModalOpen(false)
  }
  const handleEditMode = () => {
    setEditMode(true)
  }
  const handlePrioritySelect = (priority) => {
    setSelectedPriority(priority)
  }
  const handleChangeAcctuality = (acc) => {
    setAcctuality(!acc)
  }
  return (
    <Modal
      cancelButtonProps={{ style: { display: editMode ? "" : "none" } }}
      title={
        <Grid container>
          <Avatar
            sx={{ bgcolor: "#00a152", width: 26, height: 26 }}
            style={{ fontSize: "12px", marginRight: "10px" }}>
            {index + 1}
          </Avatar>
          {editMode ? (
            <div style={{ textAlign: "center" }}>
              <p>Название заметки</p>
              <Input
                style={{ width: "350px" }}
                maxLength={40}
                defaultValue={newNoteName}
                onChange={(e) => setNewNoteName(e.target.value)}
                placeholder='Название заметки'
              />
            </div>
          ) : (
            <>
              <p>{el.name} </p>
              <FiEdit3
                onClick={() => handleEditMode()}
                className='icon edit'></FiEdit3>
            </>
          )}
        </Grid>
      }
      open={isModalOpen}
      onOk={() => handleSendChanges()}
      onCancel={handleCancel}
      width={400}
      cancelText={"Отмена"}
      okText={editMode ? "Отправить изменения" : "ОК"}>
      {editMode ? (
        <div className='note-modal'>
          <p>Содержание заметки</p>
          <Input
            maxLength={300}
            defaultValue={newNoteText}
            placeholder='Содержание заметки'
            onChange={(e) => setNewNoteText(e.target.value)}
          />
          <p>
            <PriorityDropdown
              onSelectPriority={handlePrioritySelect}
              resetPriority={resetPriority}
              setResetPriority={setResetPriority}
            />
          </p>
          <p>
            Актуальность: {oldAccctuality ? "Да" : "Нет"}{" "}
            <FaSyncAlt
              onClick={() => handleChangeAcctuality(oldAccctuality)}
              fontSize={"10px"}
              cursor={"pointer"}
            />
          </p>
        </div>
      ) : (
        <div className='note-modal'>
          <p> 1. Содержание: {el.noteText}</p>
          <p>2. Приоритет: {el.priority}</p>
          <p>3. Актуальность: {el.acctuality ? "Да" : "Нет"}</p>
        </div>
      )}
    </Modal>
  )
}

export default NoteModal
