import HomePage from "./components/HomePage"
import MyNavbar from "./components/MyNavbar"
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import DetailsPage from "./components/DetailsPage"

function App() {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details/:musicId" element={<DetailsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
