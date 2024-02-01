import React, { useState } from "react";
import { Box, Input } from "@chakra-ui/react";
import userId from "../User_Id";
import supabase from "../supabaseClient";

export default function footer() {
  const MessageInput = () => {
    const [message, setMessage] = useState("");

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
      }
    };

    async function uploadMessage(message) {
      const { error } = await supabase.from("post").insert({ message: message, user_post_ID: userId});
      if (error) {
        console.log("donnée évaporer");
        console.log(error.message);
      } else {
        console.log("bien jouer");
      }
    }
    const sendMessage = () => {
      console.log("Message envoyé :", message);
      uploadMessage(message)
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
        bgColor="#2EFD3C"
        alignItems="center"
      >
        <Input
          placeholder="text"
          width={"30rem"}
          bgColor={"#2efd57"}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </Box>
    );
  };
  return <MessageInput />;
}
