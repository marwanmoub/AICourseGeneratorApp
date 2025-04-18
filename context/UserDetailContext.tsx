import { View, Text } from "react-native";
import React, { createContext, ReactNode, useState } from "react";

export const UserDetailedContext = createContext(null);

const UserDetailContext = ({ children }: { children: ReactNode }) => {
  const [userDetail, setUserDetail] = useState(null);

  const states = {
    userDetail,
    setUserDetail,
  };

  return (
    <UserDetailedContext.Provider value={states}>
      {children}
    </UserDetailedContext.Provider>
  );
};

export default UserDetailContext;
