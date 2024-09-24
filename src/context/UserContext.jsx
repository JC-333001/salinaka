import React, { useState, useEffect } from "react";
import { createContext } from "react";
import {
  createUserDocumentFromAuth,
  getUser,
  onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils";
import { getDoc } from "firebase/firestore";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChangedListener(async (user) => {
  //     if (user) {
  //       let userDocRef = createUserDocumentFromAuth(user);
  //       let userSnapShot = await getDoc(userDocRef);
  //       const userData = userSnapShot.data();
  //       console.log("userData = ", userData);
  //     }
  //     setCurrentUser(user);
  //   });
  //   return unsubscribe; // unsubscribe on unmount
  // }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
