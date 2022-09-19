import { useEffect } from "react";

import auth from "../services/utils/auth";

function Logout() {
  useEffect(() => {
    auth.logout();
    window.location = "/login";
  }, []);

  return null;
}

export default Logout;
