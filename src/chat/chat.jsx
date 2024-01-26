import { useState, useEffect } from "react";
import { Box, Container } from "@chakra-ui/react";
import supabase from "../supabaseClient";

export default function Chat() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    function setCoockies() {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);
      const expirationDateString = expirationDate.toUTCString();
      if (document.cookie === null) {
        console.log("il n'y a pas de coockie encore");
      } else {
        document.cookie = `Salut c'est moi le cookies=probablement l'id; SameSite=None; Secure; expires=${expirationDateString}`;
      }
      console.log(document.cookie);
    }
    setCoockies();
    async function fetchPostData() {
      try {
        const { data, error } = await supabase.from("post").select("message");
        if (error) {
          throw new Error(error.message);
        }
        console.log(data[0].message);
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
            <Box key={index} bgColor={"#E5E5E5"} mt={"20px"}>
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
