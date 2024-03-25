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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Field, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import userService from "@/service/user-service";

import moment from "moment";
import DateField from "@/components/FormField/DateField";
import { MdCheckCircleOutline } from "react-icons/md";
import RadioField from "@/components/FormField/RadioField";
import { GENDER_ENUM } from "@/utils/enum";

export default function UserModal({
  visible,
  data,
  onClose = () => {},
  onRefresh = () => {},
}) {
  const { state, setState } = useHookState({
    data: {},
  });

  useEffect(() => {
    setState({
      detail: data || {},
    });
  }, [data]);

  const toast = useToast();
  const isEdit = !!state.detail?._id;

  const onSubmit = (values, actions) => {
    const body = { ...(values || {}) };

    (isEdit ? userService.update(body) : userService.create(body))
      .then((res) => {
        console.log("res", res);
        onRefresh();
        onClose();

        toast({
          title: isEdit ? "Cập nhật thành công" : "Thêm mới thành công",
          description: "",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      })
      .catch((err) => {
        console.error("err", err);

        toast({
          title: "Lỗi",
          description: err.toString(),
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      });
  };

  return (
    <Modal isOpen={visible} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEdit ? "Chỉnh sửa" : "Thêm nhân viên mới"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik initialValues={data || {}} onSubmit={onSubmit}>
            {({ handleSubmit }) => {
              return (
                <form id="user-modal" onSubmit={handleSubmit}>
                  <FormControl>
                    <FormLabel htmlFor="full-name">Họ và tên</FormLabel>
                    <Field
                      id="full-name"
                      name="fullname"
                      type="string"
                      as={Input}
                      variant="filled"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="email-input">Email</FormLabel>
                    <Field
                      id="email-input"
                      name="email"
                      type="string"
                      as={Input}
                      variant="filled"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="phone-field">Số điện thoại</FormLabel>
                    <Field
                      id="phone-field"
                      name="phone"
                      type="string"
                      as={Input}
                      variant="filled"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="birth-field">Ngày sinh</FormLabel>
                    <DateField
                      name="birth"
                      placeholder={"Vui lòng chọn ngày sinh"}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="gender-field">Giới tính</FormLabel>
                    <RadioField name="gender" data={GENDER_ENUM} />
                    {/* <Field
                      id="gender-field"
                      name="gender"
                      type="string"
                      as={Radio}
                      variant="filled"
                    /> */}
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="address-field">Địa chỉ</FormLabel>
                    <Field
                      id="address-field"
                      name="address"
                      type="string"
                      as={Input}
                      variant="filled"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="time-join">Ngày vào công ty</FormLabel>
                    <DateField
                      name="startTime"
                      placeholder={"Vui lòng chọn ngày"}
                    />
                  </FormControl>
                </form>
              );
            }}
          </Formik>
        </ModalBody>
        <ModalFooter>
          {/* <Button variant="ghost" mr={3} onClick={handleClose}>
            Close
          </Button> */}
          <Button
            type="submit"
            form="user-modal"
            colorScheme="blue"
            aria-label="edit"
            leftIcon={<MdCheckCircleOutline />}
          >
            {isEdit ? "Lưu" : "Thêm"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
