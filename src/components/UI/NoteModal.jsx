import { Modal } from "antd"
import { Avatar, Grid } from "@mui/material"
const NoteModal = ({
  isModalOpen,
  setIsModalOpen,
  name,
  priority,
  text,
  index,
  acctuality,
}) => {
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <Modal
      cancelButtonProps={{ style: { display: "none" } }}
      title={
        <Grid container>
          <Avatar
            sx={{ bgcolor: "#00a152", width: 26, height: 26 }}
            style={{ fontSize: "12px", marginRight: "10px" }}>
            {index + 1}
          </Avatar>
          <span>{name}</span>
        </Grid>
      }
      style={{}}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width={400}>
      <div style={{ textAlign: "center", fontWeight: 600 }}>
        <p> 1. Содержание: {text}</p>
        <p>2. Приоритет: {priority}</p>
        <p>3. Актуальность: {acctuality ? "Да" : "Нет"}</p>
      </div>
    </Modal>
  )
}

export default NoteModal
