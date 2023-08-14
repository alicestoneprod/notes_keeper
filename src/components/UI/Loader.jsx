import React from "react"
import { Container, Grid, Typography } from "@mui/material"
import "./Loader.css"
const Loader = ({ text }) => {
  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 100 }}
        alignItems='center'
        justifyContent='center'>
        <Grid
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}>
          {text && (
            <Typography
              variant='h5'
              component='div'
              style={{
                display: "inline-flex",
                alignItems: "center",
                marginBottom: 16,
              }}>
              {text}
              <div className='lds-ellipsis' style={{ marginLeft: 8 }}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </Typography>
          )}
          <div className='lds-roller' style={{ display: text ? "none" : {} }}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Loader
