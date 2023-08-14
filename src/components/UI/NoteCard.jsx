import React from "react"
import { Card, Space } from "antd"
import { useState } from "react"
import { RiInformationFill } from "react-icons/ri"
import "./NoteCard.css"
import NoteModal from "./NoteModal"
import { Avatar, Grid } from "@mui/material"
import { AiFillDelete, AiOutlineFileDone } from "react-icons/ai"
import { FaEyeSlash } from "react-icons/fa"
const NoteCard = ({
  text,
  name,
  priority,
  index,
  id,
  deleteNoteHandler,
  acctuality,
  completeNoteHandler,
  el,
  isHidden,
  hideNoteHandler,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  return (
    <Space direction='vertical' size={"small"}>
      <Card
        title={
          <Grid container>
            <Avatar
              sx={{ bgcolor: "#00a152", width: 26, height: 26 }}
              style={{ fontSize: "12px" }}>
              {index + 1}
            </Avatar>

            <span style={{ marginLeft: "10px" }}>
              {name.length > 14 ? name.slice(0, 15) + "..." : name}
            </span>
          </Grid>
        }
        className='note-card'
        bordered={true}
        extra={
          <>
            <FaEyeSlash
              className='hide icon'
              onClick={() => hideNoteHandler(id, el)}></FaEyeSlash>
            <RiInformationFill onClick={showModal} className='info icon' />
          </>
        }>
        <p>Содержание: {text.length > 15 ? text.slice(0, 16) + "..." : text}</p>
        <p>Приоритет: {priority}</p>
        <p>Актуальность: {acctuality ? "Да" : "Нет"}</p>
        <AiFillDelete
          onClick={() => deleteNoteHandler(id)}
          className='delete icon'
        />
        <AiOutlineFileDone
          style={{ color: acctuality ? "#f6ae28" : "#3e3b40" }}
          onClick={() => completeNoteHandler(id, el)}
          className='complete icon'></AiOutlineFileDone>
      </Card>
      <NoteModal
        index={index}
        name={name}
        priority={priority}
        text={text}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        acctuality={acctuality}
      />
    </Space>
  )
}

export default NoteCard
