import { MailOutlined } from "@ant-design/icons"
import { Menu } from "antd"
const items = [
  {
    label: "Войти",
    key: "enter",
    icon: <MailOutlined />,
  },
]
const Navbar = () => {
  return (
    <Menu
      style={{ justify: "flex-end" }}
      mode='horizontal'
      items={items}
      theme={"dark"}
    />
  )
}
export default Navbar
