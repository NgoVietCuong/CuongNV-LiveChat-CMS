import { Box, IconButton, Icon } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function ImagePreview({ file, index, handleCancel }) {
  return (
    <Box
      mr='15px'
      mb='5px'
      position='relative' 
      minWidth='56px' 
      width='56px' 
      height='56px' 
      borderRadius='4px' 
      border='1px solid transparent' 
      display='inline-flex' 
      justifyContent='center' 
      alignItems='center'
      cursor='pointer'
      sx={{
        '&:hover button': {
          opacity: 1
        }
      }}
    >
      <Box
        borderRadius='4px'
        backgroundImage={file.url}
        backgroundPosition='center center'
        backgroundSize='cover'
        padding='16px 12px'
        display='flex'
        alignItems='center'
        justifyContent='center'
        w='100%'
        h='100%'
      ></Box>
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