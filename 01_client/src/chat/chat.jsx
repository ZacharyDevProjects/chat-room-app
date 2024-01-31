import { useState, useEffect } from "react";
import { Box, Container } from "@chakra-ui/react";
import supabase from "../supabaseClient";

export default function Chat() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  let userId = document.cookie
    .split(";")
    .find((cookie) => cookie.includes("userId"));
  userId = parseInt(userId.substring(userId.indexOf("=") + 1));
  console.log(userId);
  useEffect(() => {
    async function fetchPostData() {
      try {
        const { data, error } = await supabase.from("post").select();
        if (error) {
          throw new Error(error.message);
        }
        console.log(data);
        setData(data);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchPostData();
  }, []);
  
  return (
    <Container maxW="600px" paddingBottom="20px">
      <Box bg="white" p="5" overflow="auto" borderRadius="10px">
        {data ? (
          data.map((item, index) => (
            <Box
              key={index}
              bgColor={data[index].user_post_ID === userId ? "#B7B7B7" : "#E5E5E5"}
              mt={"20px"}
            >
              {data[index].message}
            </Box>
          ))
        ) : (
          <p>{error ? `Erreur: ${error}` : "Chargement en cours..."}</p>
        )}
      </Box>
    </Container>
  );
}
