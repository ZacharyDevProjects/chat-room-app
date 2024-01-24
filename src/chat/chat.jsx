import { useState, useEffect } from "react";
import { Box, Container } from "@chakra-ui/react";
import supabase from "../supabaseClient";

export default function Chat() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPostData() {
      try {
        const { data, error } = await supabase
        .from("post")
        .select("message");
        if (error) {
          throw new Error(error.message);
        }
        console.log(data)
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
      </Box>
    </Container>
  );
}
