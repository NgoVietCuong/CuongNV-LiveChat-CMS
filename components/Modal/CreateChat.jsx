import { 
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button
} from '@chakra-ui/react';

export default function CreateChatModal({ isOpen, onClose, cancelRef, createChat, isCreating }) {
  return (
    <AlertDialog
      motionPreset='slideInBottom'
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>Delete Chat?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          This visitor is not in contact. Do you want to create a new chat?
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button size='sm' h='36px' color='#283d52' ref={cancelRef} onClick={onClose}>
            Cancel
          </Button>
          <Button size='sm' h='36px' isLoading={isCreating} colorScheme='blue' ml={3} onClick={createChat}>
            Create
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}