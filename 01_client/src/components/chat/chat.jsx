import { useState, useEffect } from "react";
import { Box, Container } from "@chakra-ui/react";
import userId from "../../User_Id";
import supabase from "../../supabaseClient";

function Chat() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  async function fetchPostData() {
    try {
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

  useEffect(() => {
    const fetchData = async () => {
      if (!isDataLoaded) {
        await fetchPostData();
      }
    };

    fetchData();
  }, [isDataLoaded]);


  useEffect(() => {
    const channelA = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "post",
        },
        (payload) => {
          setIsDataLoaded(true)
          fetchPostData();
          console.log(payload);
        }
      )
      .subscribe();
      
  });
  return (
    <Container maxW="600px" paddingBottom="20px">
      <Box
        id="messageBox"
        bg="white"
        p="5"
        overflow="auto"
        borderRadius="10px"
        key={data} // Add a key to the Box to trigger re-render when data changes
      >
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

export default Chat;
