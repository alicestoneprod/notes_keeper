import { Container, Grid, Box, Button } from "@mui/material"
import { useContext } from "react"
import { GoogleAuthProvider } from "firebase/auth"
import { signInWithPopup } from "firebase/auth"
import { Context } from "../.."
import React from "react"
const Login = () => {
  const { auth } = useContext(Context)
  const login = async () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user
        console.log(user)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 100 }}
        alignItems={"center"}
        justifyContent={"center"}>
        <Grid
          style={{
            width: "300px",
            backgroundColor: "#618833",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Box p={5}>
            <Button
              onClick={login}
              color='inherit'
              variant={"outlined"}
              style={{ backgroundColor: "#8bc34a" }}>
              Войти с помощью Google
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login
