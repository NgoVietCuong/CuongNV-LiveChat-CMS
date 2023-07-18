import { Flex } from '@chakra-ui/react';
import SideNav from './SideNav';

export default function AppLayout({ children }) {
  return (
    <>
      <Flex w='100%' h='100vh' spacing={0}>
        <SideNav />
        {children}
      </Flex>
    </>
  )
}