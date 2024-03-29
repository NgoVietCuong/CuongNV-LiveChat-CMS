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

export default function DeleteChatModal({ isOpen, onClose, cancelRef, deleteChat, isDeleting }) {
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
          Are you sure to delete this chat? You won't be able to undo it.
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button size='sm' h='36px' color='#283d52' ref={cancelRef} onClick={onClose}>
            Cancel
          </Button>
          <Button size='sm' h='36px' isLoading={isDeleting} colorScheme='red' ml={3} onClick={deleteChat}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}