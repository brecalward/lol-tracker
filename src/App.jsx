import { useEffect, useState } from 'react'
import './App.css'
import { Button } from "@/components/ui/button";
import "./index.css"

const API_KEY = "RGAPI-a6c48da6-a6f5-4397-be2e-9e9fb20ade4c";
const BASE_URL = "https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id"

function App() {
  const [gameName, setGameName] = useState("");
  const [gameTag, setGameTag] = useState("");
  const [account, setAccount] = useState(null);
  

  async function handleSearchNameAndTag() {
    if (!gameName || !gameTag) return;
    try {

        const res = await fetch(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${gameTag}?api_key=RGAPI-a6c48da6-a6f5-4397-be2e-9e9fb20ade4c`);
        const data = await res.json();
        console.log(data)
        setAccount({gameName: data.gameName, tagLine: data.tagLine})
        // setPuuid(data.puuid)
      } catch(error) {
        console.log(error)
      }

    
  }

  return (
    <>
      <label htmlFor="gameName" value="Game name:" >Game name:</label>
      <input id="gameName" value={gameName} onChange={(e) => setGameName(e.target.value)}/>
      <label htmlFor="gameTag" value="Game name:" >Game tag:</label>
      <input id="gameTag" value={gameTag} onChange={(e) => setGameTag(e.target.value)}/>
      <button onClick={handleSearchNameAndTag}>Search</button>
      <Button className="mt-4 w-full bg-green-500 hover:bg-green-600">Click me</Button>
      <br/>
      <br/>
      <br/>
      {account && `${account.gameName} #${account.tagLine}`}
    </>
  )
}

export default App
