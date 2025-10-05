export const initialState = {
  gameName: "",
  gameTag: "",
  summonerLevel: null,
  puuid: "",
  champInfo: null,
  tier: "",
  rank: "",
  profilePictureId: null,
  profilePicture: null,
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
      return { ...state, champInfo: action.payload };
    case "getRank":
      return { ...state, tier: action.payload.tier, rank: action.payload.rank };
    case "getProfileId":
      return { ...state, profilePictureId: action.payload };
    case "getProfilePicture":
      return { ...state, profilePicture: action.payload };
    default:
      return state;
  }
};
