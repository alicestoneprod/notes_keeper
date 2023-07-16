import { Card, Space } from "antd"
import { useState } from "react"
import { RiInformationFill } from "react-icons/ri"
import "./NoteCard.css"
import NoteModal from "./NoteModal"
import { Avatar, Grid } from "@mui/material"
import { AiFillDelete } from "react-icons/ai"

const NoteCard = ({ text, name, priority, index, id, deleteNoteHandler }) => {
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
            <p style={{ marginLeft: "10px" }}>{text}</p>
          </Grid>
        }
        bordered={true}
        extra={<RiInformationFill onClick={showModal} className='info-icon' />}
        style={{
          width: 300,
          height: 200,
          marginLeft: "30px",
          marginTop: "30px",
          borderColor: "#14a37f",
          boxShadow: "1px 1px 1px #14a37f",
        }}>
        <p>Содержание: {text}</p>
        <p>Приоритет: {priority}</p>
        <AiFillDelete
          onClick={() => deleteNoteHandler(id)}
          className='delete-icon'
        />
      </Card>
      <NoteModal
        index={index}
        name={name}
        priority={priority}
        text={text}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </Space>
  )
}

export default NoteCard
