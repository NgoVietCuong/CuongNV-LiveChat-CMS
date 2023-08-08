import { Card, CardHeader, CardBody, Flex, Heading, Stack, Spinner, Skeleton } from "@chakra-ui/react";

export default function AnalyticsSkeleton() {
  return (
    <Stack h='100%'>
      <Flex justifyContent='space-between' marginBottom='20px!important'>
        {[...Array(5).keys()].map(() => (
          <Card w='19%' boxShadow='rgba(0, 27, 71, 0.08) 0px 3px 8px'>
            <CardHeader>
              <Skeleton w='60%' h='20px' />
            </CardHeader>
            <CardBody>
              <Skeleton my='5px' h='14px' />
            </CardBody>
          </Card>
        ))}
      </Flex>
      <Card flexGrow={1} boxShadow='rgba(0, 27, 71, 0.08) 0px 3px 8px'>
        <CardHeader>
          <Heading size='sm'>Chat activities</Heading>
        </CardHeader>
        <CardBody display='flex' justifyContent='center' alignItems='center'>
          <Spinner color='blue.500' size='lg' />
        </CardBody>
      </Card>
    </Stack>
  )
}