import { Box, Heading, Card, CardBody, Stack } from "@chakra-ui/react";
import VisitorList from "@/components/VisitorList";
import EmptyVisitorList from "@/components/EmptyState/EmptyVisitorList";

export default function Visitors() {
  return (
    <Box w='auto' h='100%' bg='gray.50' flexGrow={1}>
      <Stack w='80%' margin='auto' py={12} spacing={10}>
        <Heading color='#283d52' fontSize='27px' fontWeight='500'>Visitors</Heading>
        <Card boxShadow='rgba(0, 27, 71, 0.08) 0px 3px 8px'>
          <CardBody>
            <EmptyVisitorList />
          </CardBody>
        </Card>
      </Stack>
    </Box>
  )
}