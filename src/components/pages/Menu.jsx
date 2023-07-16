import React from "react"
import { Container, Grid } from "@mui/material"
import NoteForm from "../Notes/NoteForm"
const Main = () => {
  return (
    <Container>
      <Grid marginTop={"50px"} container justifyContent={"center"}>
        <NoteForm />
      </Grid>
    </Container>
  )
}

export default Main
