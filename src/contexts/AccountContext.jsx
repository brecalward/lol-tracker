import { createContext } from 'react';

export const AccountContext = createContext(null);

export const initialState = { 
    gameName: "",
    gameTag: "",
    summonerLevel: null,
    puuid: ""
 };

export const accountReducer = (state, action) => {
  switch (action.type) {
    case 'getNameAndTag':
      return { ...state, gameName: action.payload.gameName, gameTag: action.payload.gameTag };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      return state;
  }
};

