import { LOGIN_ROUTE } from "./utils/constants"
import { MAIN_ROUTE } from "./utils/constants"
import Login from "./pages/Login"
import Main from "./pages/Menu"
export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Login,
  },
]
export const privateRoutes = [
  {
    path: MAIN_ROUTE,
    Component: Main,
  },
]
