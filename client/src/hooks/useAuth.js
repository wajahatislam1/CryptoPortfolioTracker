import { useState, useEffect } from "react";
import { tokenValid } from "../api/users/users.api";
import { useSelector } from "react-redux";

function useAuth() {
  const jwtToken = useSelector((state) => state.user.jwtToken);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await tokenValid(jwtToken);
      setLoggedIn(isAuthenticated);
      setLoading(false);
    };

    checkAuth();
  }, [jwtToken]);

  return { loading, loggedIn };
}

export default useAuth;
