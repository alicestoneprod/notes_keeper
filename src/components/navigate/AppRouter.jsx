import { Route, Routes, Navigate } from "react-router-dom"
import { privateRoutes, publicRoutes } from "./routes"
import { MAIN_ROUTE, LOGIN_ROUTE } from "../utils/constants"
import { useAuthState } from "react-firebase-hooks/auth"
import { Context } from "../.."
import { useContext } from "react"

const AppRouter = () => {
  const { auth } = useContext(Context)
  const [user] = useAuthState(auth)

  return user ? (
    <Routes>
      {privateRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} Component={Component} />
      ))}
      <Route path='*' element={<Navigate to={MAIN_ROUTE} />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} Component={Component} />
      ))}
      <Route path='*' element={<Navigate to={LOGIN_ROUTE} />} />
    </Routes>
  )
}

export default AppRouter
