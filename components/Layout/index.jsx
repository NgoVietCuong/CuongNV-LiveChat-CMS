import { Stack } from "@chakra-ui/react"
import SideNav from "./SideNav"

export default function Layout({ children }) {
  return (
    <Stack direction='row' w='100%' h='100vh' spacing={0}>
      <SideNav />
      {children}
    </Stack>
  );
};