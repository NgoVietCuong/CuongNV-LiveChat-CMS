import { 
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Text,
  Button
} from '@chakra-ui/react';

export default function DeleteContactModal({ isOpen, onClose, cancelRef, deleteContact, isDeleting }) {
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
        <AlertDialogHeader>Delete Contact?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          <Text>The chat related to this contact will be deleted.</Text>
          Are you sure to delete this contact? You won't be able to undo it.
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button size='sm' h='36px' color='#283d52' ref={cancelRef} onClick={onClose}>
            Cancel
          </Button>
          <Button size='sm' h='36px' isLoading={isDeleting} colorScheme='red' ml={3} onClick={deleteContact}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}