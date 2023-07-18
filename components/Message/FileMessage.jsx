import { Box, Flex, Icon, Link, Stack, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFileWord, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import checkFileType from "@/ultils/checkFileType";

export default function FileMessage({ message }) {
  const { sender, filename, url } = message;
  const fileExtension = url.split('.')[url.split('.').length - 1];

  return (
    <Flex marginBottom='2px!important' justifyContent={sender !== 'Operator' ? 'flex-start': 'flex-end'}>
      <Box w='250px' px={3} py={1.5} borderRadius='8px' bg={sender !== 'Operator' ? 'blackAlpha.100': 'blue.100'} >
        <Flex p={2} spacing={3} alignItems='center' borderRadius={1}>
          <Stack w='20%'>
            {checkFileType(url) === 'word' && <Icon boxSize={6} as={FontAwesomeIcon} icon={faFileWord} color='blue.500' />}
            {checkFileType(url) === 'excel' && <Icon boxSize={6} as={FontAwesomeIcon} icon={faFileExcel} color='green.500' />}
            {checkFileType(url) === 'other' && <Icon boxSize={6} as={FontAwesomeIcon} icon={faFile} color='whiteAlpha.900' />}
          </Stack>   
          <Stack spacing={0} flexGrow={1}>
            <Text fontSize='sm'>
              {(filename.length > 18) ? filename.substring(0, 14) + '[...]' + '.' + fileExtension: filename + '.' + fileExtension}
            </Text>
            <Link color='blue.600' fontSize='sm' href={url} isExternal>Download</Link>
          </Stack>
        </Flex>
      </Box>
    </Flex>
  );
}