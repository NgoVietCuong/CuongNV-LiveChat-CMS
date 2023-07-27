import { Box } from "@chakra-ui/react"

export default function Settings() {
  return(
    <Box w='auto' h='100%' bg='gray.50' flexGrow={1}>
    </Box>
  )
}

export async function getServerSideProps(context) {
  const { req, params } = context;
  const jwt = req.cookies.nvcJWT;
  const domain = req.cookies['shop'];

  return {
    props: {
      jwt,
      domain
    }
  }
}