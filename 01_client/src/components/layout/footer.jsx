import React, { useState } from "react";
import { Box, Input } from "@chakra-ui/react";
import userId from "../../User_Id";
import { socket } from "../../socket";

export default function footer() {
  const MessageInput = () => {
    const [message, setMessage] = useState("");

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
      }
    };
    async function fetchPostData(message, userId) {
      fetch("http://localhost:5000/post", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({message, userId}),
      });
    }

    const sendMessage = () => {
      console.log("Message envoyé :", message);
      fetchPostData(message, userId);
      socket.emit("send", message)
      setMessage("");
    };

    return (
      <Box
        position="fixed"
        bottom="0"
        width="100%"
        height="20%"
        display="Flex"
        justifyContent="center"
        bgColor="rgb(207, 202, 202)"
        alignItems="center"
      >
        <Input
          placeholder="text"
          width={"30rem"}
          bgColor={"white"}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </Box>
    );
  };
  return <MessageInput />;
}
