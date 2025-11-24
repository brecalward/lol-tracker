import React, { useState, Activity } from "react";
import { Card } from "@/components/ui/card";
import NavBar from "../NavBar";
import SearchAccount from "../SearchAccount";
import { Outlet } from "react-router-dom";
import Chat from "../Chat";

function HomePage() {
  const [isShowingSidebar, setIsShowingSidebar] = useState(false);
  return (
    <>
      <Card className="bg-gray-900 text-white">
        <NavBar />
        <button onClick={() => setIsShowingSidebar(!isShowingSidebar)}>
          Change
        </button>
        <Activity mode={isShowingSidebar ? "visible" : "hidden"}>
          <Chat />
        </Activity>
        <SearchAccount />
        <Outlet />
      </Card>
    </>
  );
}

export default HomePage;
