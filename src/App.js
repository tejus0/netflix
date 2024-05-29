import "./App.css";
import Login from "./screens/Login";
import { UserContext } from "./screens/contexts/userContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingLayout from "./screens/LandingLayout";
import Registration from "./screens/Registeration";




function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");

  return (
<Router>
      <UserContext.Provider value="he;llo i am contet ">
        <Routes>
          <Route exact path="/admin-page" element={<LandingLayout />} />
          <Route exact path="/register" element={<Registration />} />
          <Route
            exact
            path="/"
            element={isLoggedIn  === "true" ? <LandingLayout /> : <Login />}
            />
            </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
