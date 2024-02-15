import { Box, Image } from "@chakra-ui/react";
import logo from "../img/images.png";


export default function header() {
    return (
  <Box display="Flex" border={"1px solid"} justifyContent="space-between" alignItems="Center">
    <Image src={logo} alt="Image" width={"2rem"} height={"auto"} />
    <p>bienvenue sur un groupe chat</p>
    <p>la je mettrai le login</p>
  </Box>
    )
}
