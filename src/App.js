import { BrowserRouter } from "react-router-dom"
import "./App.css"
import Navbar from "./components/UI/Navbar"
import AppRouter from "./components/navigate/AppRouter"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
