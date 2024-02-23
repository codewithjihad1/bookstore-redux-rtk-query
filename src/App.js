import "./assets/styles/index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import AddBook from "./components/pages/AddBook";
import EditBook from "./components/pages/EditBook";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/edit-book/:bookId" element={<EditBook />} />
      </Routes>
    </Router>
  );
}

export default App;
