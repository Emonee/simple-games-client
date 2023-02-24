import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button
} from '@chakra-ui/react'

export default function ({
  isOpen,
  onClose,
  modalHeaderChildren,
  modalBodyChildren,
  firstBtnChildren,
  secondBtnChildren,
  firstBtnOnClick,
  secondBtnOnClick
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW='min(93vw, var(--chakra-sizes-md))'>
        <ModalHeader>{modalHeaderChildren}</ModalHeader>
        <ModalBody>{modalBodyChildren}</ModalBody>
        <ModalFooter gap='3'>
          {firstBtnChildren && <Button onClick={firstBtnOnClick || onClose} colorScheme='blue'>{firstBtnChildren}</Button>}
          {secondBtnChildren && <Button onClick={secondBtnOnClick || onClose} variant='ghost'>{secondBtnChildren}</Button>}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
