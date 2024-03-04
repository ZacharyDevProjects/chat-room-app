import { Box, Image } from "@chakra-ui/react";
import logo from "../img/images.png";
import { Link } from "react-router-dom";

export default function header() {
    return (
  <Box display="Flex" borderBottom={"1px solid"} justifyContent="space-between" alignItems="Center">
    <Image src={logo} alt="Image" width={"2rem"} height={"auto"} />
    <p>bienvenue sur un groupe chat</p>
    <Link to="/login">Aller à la page de login</Link>
  </Box>
    )
}
