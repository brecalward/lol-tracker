import React, { useState, useEffect } from "react";

export default function Chat() {
  const [text, setText] = useState("");

  useEffect(() => {
    console.log("rerender");
  }, []);
  return (
    <div>
      <input onChange={(e) => setText(e.target.value)} placeholder="text...." />
    </div>
  );
}
