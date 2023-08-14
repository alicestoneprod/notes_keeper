import React from "react"
import { deleteDoc } from "firebase/firestore"
import Modal from "antd/es/modal/Modal"
const DeleteAllNotesModal = ({
  isModalAllNotes,
  setIsModalAllNotes,
  paths,
  UID,
}) => {
  const handleOk = () => {
    try {
      const pathsByUID = paths.filter((el) => el.UID === UID)
      pathsByUID.forEach((el) => deleteDoc(el.path))
      setIsModalAllNotes(false)
    } catch (e) {
      console.log("ERROR!", e)
    }
  }
  const handleCancel = () => {
    setIsModalAllNotes(false)
  }

  return (
    <>
      <Modal
        style={{ textAlign: "center" }}
        centered
        okText='Да'
        cancelText='Отмена'
        title='Предупреждение'
        open={isModalAllNotes}
        onOk={handleOk}
        onCancel={handleCancel}>
        <p>
          Вы действительно уверены, что хотите удалить все заметки? Это действие
          отменить невозможно.
        </p>
      </Modal>
    </>
  )
}

export default DeleteAllNotesModal
