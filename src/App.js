import { useContext, useEffect, useState } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Setting from "./pages/settings/Settings";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./state/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user !== undefined) {
      setLoading(false);
    }
  }, [user]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={loading ? <p>Loading...</p> : user ? <Home /> : <Register />}
        />
        <Route
          path="/login"
          element={
            loading ? <p>Loading...</p> : user ? <Navigate to="/" /> : <Login />
          }
        />
        <Route
          path="/register"
          element={
            loading ? (
              <p>Loading...</p>
            ) : user ? (
              <Navigate to="/" />
            ) : (
              <Register />
            )
          }
        />
        {/* <Route path="/" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        /> */}
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/settings/:username" element={<Setting />} />
      </Routes>
    </Router>
  );
}

export default App;
