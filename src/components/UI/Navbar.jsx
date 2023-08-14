import React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { Container, Grid, Modal, Avatar } from "@mui/material"
import { useAuthState } from "react-firebase-hooks/auth"
import { Context } from "../.."
import { useContext, useState } from "react"
import { signOut } from "firebase/auth"
import { NavLink } from "react-router-dom"
const Navbar = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  }

  const { auth } = useContext(Context)
  const [user] = useAuthState(auth)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleExitAccount = () => {
    signOut(auth)
    handleClose()
  }
  return (
    <div className='navbar'>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static' style={{ backgroundColor: "#357a38" }}>
          <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              Notes Keeper
            </Typography>
            <Grid>
              {user ? (
                <>
                  <Grid
                    container
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    <Button
                      color='inherit'
                      variant='outlined'
                      style={{ marginLeft: "3px" }}>
                      <NavLink to='/notes'> Страница заметок </NavLink>
                    </Button>
                    <Button
                      color='inherit'
                      variant='outlined'
                      style={{ marginRight: "20px", marginLeft: "30px" }}>
                      <NavLink to='/main'> Добавить заметку </NavLink>
                    </Button>
                    <Avatar alt={user.displayName} src={user.photoURL} />
                    <span
                      style={{
                        fontWeight: "500",
                        margin: "0px 10px 0px 10px",
                      }}>
                      {user.displayName}
                    </span>
                    <Button
                      onClick={handleOpen}
                      color='inherit'
                      variant={"outlined"}
                      style={{ backgroundColor: "#357a38" }}>
                      Выйти
                    </Button>
                  </Grid>

                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'>
                    <Box sx={style}>
                      <Typography
                        id='modal-modal-title'
                        variant='h7'
                        component='h3'>
                        <p
                          onClick={handleClose}
                          style={{
                            display: "inline-flex",
                            textAlign: "end",
                            paddingBottom: "20px",
                            color: "grey",
                            cursor: "pointer",
                          }}>
                          &#10005;
                        </p>
                        <p style={{ fontWeight: "500", textAlign: "center" }}>
                          {user.displayName}, вы действительно хотите выйти из
                          своего аккаунта?
                        </p>
                      </Typography>
                      <Typography id='modal-modal-description' sx={{ mt: 4 }}>
                        <Container styles={{ marginLeft: "40px" }}>
                          <Button
                            variant='outlined'
                            color='error'
                            onClick={handleClose}>
                            Отмена
                          </Button>
                          <Button
                            onClick={handleExitAccount}
                            style={{ marginLeft: "50px" }}
                            variant='outlined'
                            color='success'>
                            Подтвердить
                          </Button>
                        </Container>
                      </Typography>
                    </Box>
                  </Modal>
                </>
              ) : (
                <Button
                  color='inherit'
                  variant={"outlined"}
                  style={{ backgroundColor: "#357a38" }}>
                  Авторизация
                </Button>
              )}
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}
export default Navbar
