import deviceService from "@/service/type-device-service";
import useHookState from "@/hooks/useHookState";
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
  IconButton,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Field, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { MdCheckCircleOutline } from "react-icons/md";

export default function DeviceForm({
  visible,
  data = {},
  onClose = () => {},
  onRefresh = () => {},
}) {
  const { state, setState } = useHookState({
    detail: {},
  });

  useEffect(() => {
    setState({
      detail: data || {},
    });
  }, [data]);

  const toast = useToast();
  const isEdit = !!state.detail?._id;

  const onSubmit = (values, actions) => {
    if (!values.typeName) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập tên thiết bị",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    const body = {
      ...values,
    };

    (state.detail?._id
      ? deviceService.update(body)
      : deviceService.create(body)
    )
      .then((res) => {
        console.log("res", res);
        toast({
          title: isEdit ? "Cập nhật thành công" : "Thêm mới thành công",
          description: "",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        onRefresh();
        onClose();
      })
      .catch((err) => {
        toast({
          title: "Lỗi",
          description: err?.toString(),
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        console.error("err", err);
      });
  };

  return (
    <Modal isOpen={visible} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{state.detail?._id ? "Cập nhật" : "Thêm mới"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik initialValues={data} onSubmit={onSubmit}>
            {({ handleSubmit }) => {
              return (
                <form id="type-device" onSubmit={handleSubmit}>
                  <FormControl>
                    <FormLabel htmlFor="type-name">Tên</FormLabel>
                    <Field
                      id="type-name"
                      name="typeName"
                      type="string"
                      as={Input}
                      variant="filled"
                    />
                  </FormControl>
                </form>
              );
            }}
          </Formik>
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            form="type-device"
            colorScheme="blue"
            aria-label="edit"
            leftIcon={<MdCheckCircleOutline />}
          >
            {isEdit ? "Sửa" : "Thêm"}
          </Button>
          {/* <Button color={"blue"} type="submit" form="import-device"></Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
