import React, { useEffect, useState } from "react"
import { DownOutlined } from "@ant-design/icons"
import { Dropdown, message, Space, Menu } from "antd"

const PriorityDropdown = ({
  onSelectPriority,
  resetPriority,
  setResetPriority,
}) => {
  const [selectedPriority, setSelectedPriority] = useState(null)

  useEffect(() => {
    if (resetPriority) {
      setSelectedPriority(null)
      setResetPriority(false)
    }
  }, [resetPriority, setResetPriority])

  const onClick = ({ key }) => {
    setSelectedPriority(key)
    message.info(`Был выбран приоритет: ${key}`)
    onSelectPriority(key)
  }

  const items = [
    {
      label: "Неважно",
      key: "Неважно",
    },
    {
      label: "Важно",
      key: "Важно",
    },
    {
      label: "Срочно",
      key: "Срочно",
    },
  ]

  const menuStyle = {
    background: "#f0f0f0",
    border: "1px solid #d9d9d9",
    borderRadius: "4px",
    width: "100px",
  }

  const menuItemStyle = {
    color: "#1890ff",
  }

  const selectedPriorityStyle = {
    color: "black",
    fontWeight: "bold",
  }

  const menu = (
    <Menu onClick={onClick} style={menuStyle}>
      {items.map((item) => (
        <Menu.Item key={item.key} style={menuItemStyle}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  )

  return (
    <Dropdown overlay={menu}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <span
            style={
              selectedPriority ? selectedPriorityStyle : { fontWeight: "500" }
            }>
            {selectedPriority ? selectedPriority : "Приоритет"}
          </span>
          <DownOutlined style={{ color: "#4caf50" }} />
        </Space>
      </a>
    </Dropdown>
  )
}

export default PriorityDropdown
