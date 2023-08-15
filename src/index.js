import React, { createContext } from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import "firebase/auth"
import "firebase/database"
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBE6lVbvskLOSVsZhP4yZpqxtaoG1OaT2E",
  authDomain: "noteskeeper-93cfa.firebaseapp.com",
  projectId: "noteskeeper-93cfa",
  storageBucket: "noteskeeper-93cfa.appspot.com",
  messagingSenderId: "329164357899",
  appId: "1:329164357899:web:21cf1ef1415ea8f3d6220e",
  measurementId: "G-KBBSDVRTB0",
}

const app = initializeApp(firebaseConfig)

const auth = getAuth()
const firestore = getFirestore(app)

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Context.Provider
    value={{
      app,
      auth,
      firestore,
    }}>
    <App />
  </Context.Provider>
)
