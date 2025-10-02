import { useState } from 'react'
import './App.css'
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card'
import "./index.css"

const API_KEY = "RGAPI-1bf5145c-315f-40a4-a8f2-34fd7e41c6cd";
const BASE_URL = "https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id"

function App() {
  const [gameName, setGameName] = useState("");
  const [gameTag, setGameTag] = useState("");
  const [account, setAccount] = useState(null);
  

  async function handleSearchNameAndTag() {
    if (!gameName || !gameTag) return;
    try {

        const res = await fetch(`${BASE_URL}/${gameName}/${gameTag}?api_key=${API_KEY}`);
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
    <Card className="bg-black text-white">

      <div className="flex justify-center gap-10 mt-20">
        <label htmlFor="gameName" value="Game name:" >Game name:</label>
        <Input id="gameName" className="w-60" value={gameName} onChange={(e) => setGameName(e.target.value)}/>
      </div>
      <div className="flex justify-center gap-10 mt-10">
        <label htmlFor="gameTag" value="Game name:" >Game tag:</label>
        <Input id="gameTag" className="w-60" value={gameTag} onChange={(e) => setGameTag(e.target.value)}/>
      </div>
      <Button className="mt-15 w-40 bg-green-500 hover:bg-green-600" onClick={handleSearchNameAndTag}>Search</Button>
      <br/>
      <br/>
      <br/>
      {account && `${account.gameName} #${account.tagLine}`}
    </Card>
    </>
  )
}

export default App
