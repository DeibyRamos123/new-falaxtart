import React from "react"
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import { Navigation } from "./components/Navigation"
import { Home } from "./pages/Home"
import { IndexPage } from "./pages/IndexPage"
import { Profile } from "./pages/Profile"
import { PublicationFormPage } from "./pages/PublicationFormPage"
import { UpdatePublication } from "./pages/UpdatePublication"

function App() {

  return (
    <BrowserRouter>
    <Navigation/>
    <Routes>
      <Route path="/" element={<Navigate to="/indexpage" />}/>
      <Route path="/indexpage" element={<IndexPage />}/>
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/home" element={<Home />}/>
      <Route path="/upload-publication" element={<PublicationFormPage/>}/>
      <Route path="/update-publication/:id" element={<UpdatePublication/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
