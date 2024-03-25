import musicService from "@/service/device-service";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { useDispatch } from "react-redux";

export default function ConfirmDelete({
  visible,
  onClose = () => {},
  onSubmit = () => {},
}) {
  const handleSubmit = () => {
    onSubmit();
    onClose();
  };
  return (
    <Modal isOpen={visible} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Are you sure ?</ModalHeader>
        <ModalCloseButton />
        {/* <ModalBody></ModalBody> */}
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button type="submit" form="add-music" onClick={handleSubmit}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
