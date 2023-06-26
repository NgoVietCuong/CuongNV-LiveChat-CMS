import { Divider, Flex, Grid, GridItem, Skeleton, SkeletonCircle, Stack } from "@chakra-ui/react";

export default function ContactListSkeleton() {
  return (
    <>
      <Stack>
        <Skeleton w='100%' startColor='gray.100' endColor='gray.200' height='40px' />
        {[...Array(5).keys()].map(() => (
          <>
            <Grid px='6' w='100%' py='2' templateColumns='20% 20% 10% 20% 30%' alignItems='center'>
              <GridItem>
                <Flex alignItems='center'>
                  <SkeletonCircle mr='2' size='8' />
                  <Skeleton w='50%' startColor='gray.200' endColor='gray.300' height='18px' />
                </Flex>  
              </GridItem>
              <GridItem><Skeleton w='80%' startColor='gray.200' endColor='gray.300' height='16px' /></GridItem>
              <GridItem><Skeleton w='60%' startColor='gray.200' endColor='gray.300' height='16px' /></GridItem>
              <GridItem><Skeleton w='60%' startColor='gray.200' endColor='gray.300' height='16px' /></GridItem>
              <GridItem><Skeleton w='100%' startColor='gray.200' endColor='gray.300' height='16px' /></GridItem>
            </Grid>
            <Divider />
          </>
        ))}
      </Stack>
    </>
  )
}