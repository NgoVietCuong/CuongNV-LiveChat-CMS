import { Box, IconButton, Icon, Stack, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faFile, faFileWord, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import checkFileType from "@/utils/checkFileType";

export default function FilePreview({ file, index, handleCancel }) {
  const { original_filename, url } = file;
  const fileExtension = url.split('.')[url.split('.').length - 1];

  return (
    <Box
      w='180px'
      h='56px'
      mr='15px'
      borderRadius='5px' 
      color='rgb(8, 15, 26)'
      px={3} 
      py={1.5}
      display='flex'
      alignItems='center'
      cursor='pointer'
      position='relative'
      bg='gray.200'
      sx={{
        '&:hover button': {
          opacity: 1
        }
      }}
    >
      <Stack w='20%'>
        {checkFileType(file.url) === 'word' && <Icon boxSize={5} as={FontAwesomeIcon} icon={faFileWord} color='blue.500' />}
        {checkFileType(file.url) === 'excel' && <Icon boxSize={5} as={FontAwesomeIcon} icon={faFileExcel} color='green.500' />}
        {checkFileType(file.url) === 'other' && <Icon boxSize={5} as={FontAwesomeIcon} icon={faFile} color='whiteAlpha.900' />}
      </Stack>
      <Stack flexGrow={1}>
        <Text mt={0} mb={0} fontSize='14px' lineHeight='18px' letterSpacing='-0.01em' overflow='hidden' textOverflow='ellipsis'>
          {(original_filename.length > 14) ? original_filename.substring(0, 10) + '[...]' + '.' + fileExtension: file.original_filename + '.' + fileExtension}
        </Text>
      </Stack>
      <IconButton
        icon={<Icon as={FontAwesomeIcon} icon={faTimes} color='gray.400' boxSize='13px' />}
        w='22px'
        h='22px'
        size='22hnhpx'
        opacity={0}
        bg='white'
        borderRadius='full'
        position="absolute"
        boxShadow='rgba(0, 27, 71, 0.24) 0px 8px 20px'
        cursor='pointer'
        display='flex'
        alignItems='center'
        top='-8px'
        right='-8px'
        zIndex={1}
        onClick={() => handleCancel(index)}
      />
    </Box>
  )
}