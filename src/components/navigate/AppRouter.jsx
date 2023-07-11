import { Route, Routes, Navigate } from "react-router-dom"
import { privateRoutes, publicRoutes } from "../routes"
import { MAIN_ROUTE, LOGIN_ROUTE } from "../utils/constants"
const AppRouter = () => {
  const user = false
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
