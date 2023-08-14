import React from "react"
import { BrowserRouter } from "react-router-dom"
import "./App.css"
import Navbar from "./components/UI/Navbar"
import AppRouter from "./components/navigate/AppRouter"
import { useAuthState } from "react-firebase-hooks/auth"
import { Context } from "."
import { useContext } from "react"
import Loader from "./components/UI/Loader"

function App() {
  const { auth } = useContext(Context)
  const [user, loading, error] = useAuthState(auth)

  if (loading) {
    console.log(user)
    return <Loader text={`Инициализирую пользователя `} />
  } else if (error) {
    return <Loader text={"Произошла ошибка"} />
  }

  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
