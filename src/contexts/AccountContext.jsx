import { createContext, useReducer, useContext } from "react";
import { initialState, accountReducer } from "../reducers/AccountReducer";

// eslint-disable-next-line react-refresh/only-export-components
export const AccountContext = createContext(null);

const AccountProvider = ({ children }) => {
  const [
    {
      gameName,
      gameTag,
      summonerLevel,
      puuid,
      champInfo,
      tier,
      rank,
      profilePictureId,
      profilePicture,
    },
    dispatch,
  ] = useReducer(accountReducer, initialState);

  return (
    <AccountContext.Provider
      value={{
        gameName,
        gameTag,
        summonerLevel,
        puuid,
        dispatch,
        champInfo,
        tier,
        rank,
        profilePictureId,
        profilePicture,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAccountContext = () => {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};

export default AccountProvider;
