import axios from "axios";
import * as linkify from 'linkifyjs';
import linkifyHtml from 'linkify-html';
import { useEffect, useState, useRef } from "react";
import { Avatar, AvatarBadge, Box, Button, Flex, Heading, Icon, IconButton, Input, Stack, Spinner, Text, Textarea  } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "@/context/AppContext";
import TextMessage from "../Message/TextMessage";
import MediaMessage from "../Message/MediaMessage";
import FileMessage from "../Message/FileMessage";
import LinkMessage from "../Message/LinkMessage";
import ImagePreview from "../UploadPreview/ImagePreview";
import FilePreview from "../UploadPreview/FilePreview";
import MediaPreview from "../UploadPreview/MediaPreview";

export default function ChatArea({ id, domain, messages, onSendMessage, shop, visitor, setVisitor }) {
  const [inputValue, setInputValue] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const { onlineVistors } = useAppContext();

  useEffect(() => {
    const messagesContainer = document.querySelector('#nvc_messages_container');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, []);

  useEffect(() => {
    const searchVisitor = onlineVistors.find(online => online._id === visitor._id);
    if (searchVisitor) {
      setVisitor(searchVisitor);
    } else {
      const newVisitor = {...visitor};
      newVisitor.active = false;
      setVisitor(newVisitor);
    }
  }, [onlineVistors]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  }

  const handleFileChange = async (event) => {
    setIsLoading(true);
    const files = Array.from(event.target.files);
    const uploadPromises = files.map(async (file) => {
      const formData = new FormData()
      formData.append('file', file);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET);
      formData.append('public_id_prefix', `${process.env.NEXT_PUBLIC_UPLOAD_PRESET}/${domain}/${visitor._id}`);
      
      let action = 'raw';
      if (file.type.includes('image')) {
        action = 'image';
      } else if (file.type.includes('video') || file.type.includes('audio')) {
        action = 'video';
      }

      try {
        const response = await axios({
          url: `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/${action}/upload`,
          method: 'post',
          data: formData
        });
        return response.data;
      } catch (e) {
        console.log('error promise', e);
        return null;
      }
    });

    try {
      const responses = await Promise.all(uploadPromises);
      const uploadedData = responses.filter(response => response);
      setSelectedFiles([...selectedFiles, ...uploadedData]);
    } catch(e) {
      console.log(e);
    }
    setIsLoading(false);
  }

  const handleCancel = (index) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles.splice(index, 1);
    setSelectedFiles(newSelectedFiles);
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  const handleSendMessage = () => {
    let data = [];
    if (inputValue.trim() !== '') {
      const links = linkify.find(inputValue);
      
      if (links && links.length) {
        let newValue = '';
        links.forEach((link) => {
          const linkHtml = linkifyHtml(link.href, { attributes: { target: '_blank', rel: 'noopener noreferrer' }});
          const styleString = ' style="color: #2B6CB0"';
          const newLinkHtml = linkHtml.slice(0, 2) + styleString + linkHtml.slice(2);
          newValue = inputValue.replace(link.href, newLinkHtml);
        });
        data.push({ sender: 'Operator', type: 'Link', text: newValue, chat: id, shop: shop, visitor: visitor._id})
      } else {
        data.push({ sender: 'Operator', type: 'Text', text: inputValue, chat: id, shop: shop, visitor: visitor._id });
      }
      setInputValue('');
    }

    if (selectedFiles && selectedFiles.length) {
      selectedFiles.forEach((file) => {
        if (['image', 'video'].includes(file.resource_type)) {
          data.push({ sender: 'Operator', type: 'Media', url: file.secure_url, filename: file.original_filename, chat: id, shop: shop, visitor: visitor._id });
        } else {
          data.push({ sender: 'Operator', type: 'File', url: file.secure_url, filename: file.original_filename, chat: id, shop: shop, visitor: visitor._id });
        }
      });
      setSelectedFiles([]);
    }

    if (data && data.length) {
      onSendMessage(data);
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (!event.shiftKey) {
        event.preventDefault();
        handleSendMessage();
      } else {
        const textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }
  }

  return (
    <Stack p={4} w='auto' h='100vh' maxH='100vh' bg='gray.50' flexGrow={1} spacing={0}>
      <Stack w='100%' h='100%' bg='white' borderRadius='md' spacing={0} boxShadow='rgba(0, 27, 71, 0.08) 0px 3px 8px'>
        <Box p={4} w='100%' h='70px' bg='whiteAlpha.900' borderRadius='xl'>
          <Flex w='100%' h='100%' justifyContent='space-between' alignItems='center'>
            <Stack direction='row' spacing={3}>
              <Avatar name={visitor.name} size='sm' bg={visitor.avatar} color='white' boxSize='35px'>
                <AvatarBadge boxSize='12px' bg={ visitor.active ? 'green.500': 'gray.300' } />
              </Avatar>

              <Stack spacing={1}>
                <Heading fontSize='14px' fontWeight='500' color='#353535'>{visitor.name}</Heading>
                <Text fontSize='12px' color='gray.500'>{visitor.email}</Text>
              </Stack>
            </Stack>
          </Flex>
        </Box>

        <Box id='nvc_messages_container' p={3} w='100%' bg='gray.50' flexGrow={1} overflowY='scroll' 
          sx={{
            '&::-webkit-scrollbar': {
              width: '0',
              height: '0',
              background: 'transparent',
            },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            MozAppearance: 'none', // For Firefox
            scrollbarWidth: 'none', // For Firefox
            scrollbarColor: 'transparent transparent', // For Firefox
            WebkitOverflowScrolling: 'touch',
          }}>
          <Stack px={4} spacing={0.5}>
            {messages.map((message) => (
              <>
                {message.type === 'Text' && <TextMessage message={message} />}
                {message.type === 'Media' && <MediaMessage message={message} />}
                {message.type === 'File' && <FileMessage message={message} />}
                {message.type === 'Link' && <LinkMessage message={message} />}
              </>
            ))}
          </Stack>
        </Box>

        <Box p={2.5} w='100%' bg='whiteAlpha.900' borderRadius='xl'>
          <Stack w='100%' px={4} spacing={0} justifyContent='space-between'>
            <Stack w='100%'>
              <Textarea 
                id='nvc_messaage_textarea'
                variant='outline' 
                overflow='hidden' 
                rows={1}
                placeholder='Type a messsage ...' 
                color='gray.600' 
                fontSize='15px' 
                focusBorderColor='transparent' 
                border='none' 
                borderRadius='lg' 
                sx={{'::placeholder': {color: 'gray.400'}}} value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPress} 
              />
              <Flex w='100%' p='10px 15px 0px' position='relative' alignItems='center' mt='0px!important'>
                {selectedFiles.map((file, index) => (
                  <>
                    {file.resource_type === 'raw' && <FilePreview file={file} index={index} handleCancel={handleCancel} />}
                    {file.resource_type === 'image' && <ImagePreview file={file} index={index} handleCancel={handleCancel} />}
                    {file.resource_type === 'video' && <MediaPreview file={file} index={index} handleCancel={handleCancel} />}                
                  </>
                ))}
                {isLoading && <Spinner size='md' color='blue.300' />}
              </Flex>
            </Stack>
            <Flex px={'15px'} alignItems='center' justifyContent='flex-start' mt='0px!important'>
              <IconButton size='sm' mr='10px' variant='unstyled' borderRadius='md' icon={<Icon as={FontAwesomeIcon} icon={faPaperclip} />} isDisabled={isLoading} sx={{'&:hover': {color: 'blue.500', bg: 'blue.50'}}} onClick={handleButtonClick} />
              <Input type='file' multiple ref={fileInputRef} display='none' onChange={handleFileChange} />
              <Button size='sm' borderRadius='md' colorScheme='blue' onClick={handleSendMessage}>Send</Button>
            </Flex>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  )
}