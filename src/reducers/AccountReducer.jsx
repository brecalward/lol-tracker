export const initialState = {
  gameName: "",
  gameTag: "",
  summonerLevel: null,
  puuid: "",
  accountMasteryChampInfo: null,
  tier: "",
  rank: "",
  profilePictureId: null,
  profilePicture: null,
  previousMatchesById: [],
  previousMatches: [],
  champData: [],
  lp: "",
};

export const accountReducer = (state, action) => {
  switch (action.type) {
    case "getNameAndTag":
      return {
        ...state,
        gameName: action.payload.gameName,
        gameTag: action.payload.gameTag,
        puuid: action.payload.puuid,
      };
    case "clearAccountInfo":
      return {
        initialState,
      };
    case "getSummonerLevel":
      return { ...state, summonerLevel: action.payload };
    case "getAccountChampData":
      return { ...state, accountMasteryChampInfo: action.payload };
    case "getRank":
      return {
        ...state,
        tier: action.payload.tier,
        rank: action.payload.rank,
        lp: action.payload.lp,
      };
    case "getProfileId":
      return { ...state, profilePictureId: action.payload };
    case "getProfilePicture":
      return { ...state, profilePicture: action.payload };
    case "getPreviousMatches":
      return { ...state, previousMatchesById: action.payload };
    case "getGameData":
      return { ...state, previousMatches: action.payload };
    case "getChampData":
      return { ...state, champData: action.payload };
    default:
      return state;
  }
};
