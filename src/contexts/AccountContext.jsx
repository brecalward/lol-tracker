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
			accountMasteryChampInfo,
			tier,
			rank,
			profilePictureId,
			profilePicture,
			previousMatchesById,
			previousMatches,
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
				accountMasteryChampInfo,
				tier,
				rank,
				profilePictureId,
				profilePicture,
				previousMatchesById,
				previousMatches,
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
