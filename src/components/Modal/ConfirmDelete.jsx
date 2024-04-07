import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

export default function ConfirmDelete({
  visible,
  onClose = () => {},
  onSubmit = () => {},
  title = "Bạn chắc chứ ?",
  content = "",
}) {
  const handleSubmit = () => {
    onSubmit();
    onClose();
  };
  return (
    <Modal isOpen={visible} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{content}</ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Hủy
          </Button>
          <Button type="submit" form="add-music" onClick={handleSubmit}>
            Đồng ý
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
