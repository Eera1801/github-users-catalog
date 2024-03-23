import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={"/"} Component={UserList} />
          <Route path={"/user-detail"} Component={UserDetail} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
