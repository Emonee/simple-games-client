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
  children,
  firstBtnChildren,
  secondBtnChildren,
  firstBtnOnClick,
  secondBtnOnClick,
  onSubmit
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent onSubmit={onSubmit} as='form' maxW='min(93vw, var(--chakra-sizes-md))'>
        <ModalHeader>{modalHeaderChildren}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter gap='3'>
          {firstBtnChildren && <Button onClick={firstBtnOnClick || onClose} colorScheme='red'>{firstBtnChildren}</Button>}
          {secondBtnChildren && <Button type='submit' colorScheme='green'>{secondBtnChildren}</Button>}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
