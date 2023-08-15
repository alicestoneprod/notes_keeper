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
  index,
  id,
  deleteNoteHandler,
  completeNoteHandler,
  el,
  paths,
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
              {el.name.length > 14 ? el.name.slice(0, 15) + "..." : el.name}
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
        <p>
          Содержание: {" "}
          {el.noteText.length > 15
            ? el.noteText.slice(0, 16) + "..."
            : el.noteText}
        </p>
        <p>Приоритет: {el.priority}</p>
        <p>Актуальность: {el.acctuality ? "Да" : "Нет"}</p>
        <p>Скрыто: {el.isHidden ? "Да" : "Нет"}</p>
        <AiFillDelete
          onClick={() => deleteNoteHandler(id)}
          className='delete icon'
        />
        <AiOutlineFileDone
          style={{ color: el.acctuality ? "#f6ae28" : "#3e3b40" }}
          onClick={() => completeNoteHandler(id, el)}
          className='complete icon'></AiOutlineFileDone>
      </Card>
      <NoteModal
        paths={paths}
        index={index}
        el={el}
        ID={id}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </Space>
  )
}

export default NoteCard
