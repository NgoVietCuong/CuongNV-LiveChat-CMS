import { Box, IconButton, Icon, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faMusic, faVideo } from "@fortawesome/free-solid-svg-icons";
import checkFileType from "@/ultils/checkFileType";

export default function MediaPreview({ file, index, handleCancel }) {
  return (
    <Box
      w='200px'
      h='56px'
      mr='15px'
      minWidth='120px'
      borderRadius='5px' 
      color='rgb(8, 15, 26)'
      pr='12px'
      display='inline-flex'
      alignItems='center'
      cursor='pointer'
      position='relative'
      bg='gray.100'
      sx={{
        '&:hover button': {
          opacity: 1
        }
      }}
    >
      {checkFileType(file.url) === 'music' && <Icon w='30%' as={FontAwesomeIcon} icon={faMusic} color='purple.500' />}
      {checkFileType(file.url) === 'video' && <Icon w='30%' as={FontAwesomeIcon} icon={faVideo} color='#283d52' />}
      <Text w='70%' mt={0} mb={0} fontSize='14px' lineHeight='18px' letterSpacing='-0.01em' overflow='hidden' textOverflow='ellipsis'>{file.original_filename + '.' + file.url.split('.')[file.url.split('.').length - 1]}</Text>
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