import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/Loading";

const PrivateRoutes = () => {
  const [isUser, setIsUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsUser(true);
      } else {
        setIsUser(false);
      }
    });

    // cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (isUser === null) {
    return <Loading />;
  }

  return isUser ? <Outlet /> : <Navigate to={"/sign-in"} />;
};

export default PrivateRoutes;
