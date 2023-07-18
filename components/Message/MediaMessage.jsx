import { Box, Image, Flex, Text, Stack } from "@chakra-ui/react";
import checkFileType from "@/ultils/checkFileType";
import ReactPlayer from "react-player";
import AudioPlayer from 'react-audio-player';

export default function MediaMessage({ message }) {
  const { sender, url} = message;

  return (
    <Flex w='100%' marginBottom='2px!important' justifyContent={sender !== 'Operator' ? 'flex-start': 'flex-end'}>
      <Box w='fit-content' maxW='60%' display='inline-block'>
        {checkFileType(url) === 'image' && <Image src={url} alt='Dan Abramov' maxHeight='250' borderRadius='8px' />}
        {checkFileType(url) === 'music' && <AudioPlayer src={url} controls />}
        {checkFileType(url) === 'video' && <ReactPlayer width="300px" url={url} playing={false} controls={true} loop={true} playsinline={true} />}
      </Box>
    </Flex>
  )
}