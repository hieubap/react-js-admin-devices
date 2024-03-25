import deviceService from "@/service/device-service";
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
  data,
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
    if (!values.deviceName) {
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
          description: err.toString(),
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
          <Formik initialValues={state.detail} onSubmit={onSubmit}>
            {({ handleSubmit }) => {
              return (
                <form id="import-device" onSubmit={handleSubmit}>
                  <FormControl>
                    <FormLabel htmlFor="device-name">Tên thiết bị</FormLabel>
                    <Field
                      id="device-name"
                      name="deviceName"
                      type="string"
                      as={Input}
                      variant="filled"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="song-author">Hãng sản xuất</FormLabel>
                    <Field
                      id="song-author"
                      name="manufacturer"
                      type="string"
                      as={Input}
                      variant="filled"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="song-link-music">Màu sắc</FormLabel>
                    <Field
                      id="song-link-music"
                      name="color"
                      type="string"
                      as={Input}
                      variant="filled"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="song-link-image">
                      Khối lượng (Kg)
                    </FormLabel>
                    <Field
                      id="song-link-image"
                      name="mass"
                      type="number"
                      as={Input}
                      variant="filled"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="song-language">
                      Kích thước (Inch)
                    </FormLabel>
                    <Field
                      id="song-language"
                      name="size"
                      type="string"
                      as={Input}
                      variant="filled"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="song-language">Công nghệ</FormLabel>
                    <Field
                      id="song-language"
                      name="tech"
                      type="string"
                      as={Input}
                      variant="filled"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="song-language">Giá</FormLabel>
                    <Field
                      id="song-language"
                      name="price"
                      type="number"
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
            form="import-device"
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
