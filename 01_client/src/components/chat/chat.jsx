import { useState, useEffect } from "react";
import { Box, Container } from "@chakra-ui/react";
import userId from "../../User_Id";

export default function Chat() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchPostData() {
      try {
        console.log(userId)
        const response = await fetch("http://localhost:5000/chat", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });
        if (response.status !== 500) {
          const data = await response.json();
          console.log(data);
          setData(data);
        } else {
          const error = await response.json();
          setError(error.error);
        }
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
              bgColor={
                data[index].user_post_ID === userId ? "#B7B7B7" : "#E5E5E5"
              }
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
