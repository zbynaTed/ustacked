import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Register from "./components/Register";
import Stocks from "./components/Stocks";
import Trades from "./components/Trades";
import Gains from "./components/Gains";
import OffNavBar from "./components/OffNavbar";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import auth from "./services/utils/auth";
import CorporateActions from "./components/CorporateActions";
import Holdings from "./components/Holdings";
import Overview from "./components/Overview";
import Logout from "./components/Logout";
import LogoutButton from "./components/logout/LogoutButton";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    function loadUser() {
      setUser(auth.getCurrentUser());
    }
    loadUser();
  }, []);

  return (
    <React.Fragment>
      {!user && (
        <div className="off-main-frame">
          <OffNavBar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      )}

      {user && (
        <div className="main-frame">
          <div className="navbar-container">
            <NavBar />
            <LogoutButton />
          </div>
          <Routes>
            <React.Fragment>
              <Route path="/overview" element={<Overview user={user} />} />
              <Route path="/stocks" element={<Stocks />} />
              <Route path="/trades" element={<Trades user={user} />} />
              <Route path="/holdings" element={<Holdings user={user} />} />
              <Route path="/gains" element={<Gains user={user} />} />
              <Route path="/ca" element={<CorporateActions user={user} />} />
              <Route path="/logout" element={<Logout />} />
            </React.Fragment>
          </Routes>
        </div>
      )}
    </React.Fragment>
  );
}

export default App;
