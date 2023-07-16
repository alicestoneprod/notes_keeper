import { Modal } from "antd"
import { Avatar } from "@mui/material"
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded"
const NoteModal = ({
  isModalOpen,
  setIsModalOpen,
  name,
  priority,
  text,
  index,
}) => {
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <Modal
      title={
        <Avatar
          sx={{ bgcolor: "#00a152", width: 26, height: 26 }}
          style={{ fontSize: "12px" }}>
          {index + 1}
        </Avatar>
      }
      style={{}}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width={400}>
      <p>{name}</p>
      <span>{text}</span>
      <p>{priority}</p>
    </Modal>
  )
}

export default NoteModal
