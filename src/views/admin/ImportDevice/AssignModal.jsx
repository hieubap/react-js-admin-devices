import TableView from "@/components/View/TableView";
import useHookState from "@/hooks/useHookState";
import deviceService from "@/service/device-service";
import userService from "@/service/user-service";
import {
  ButtonGroup,
  Button,
  Tooltip,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  Grid,
  GridItem,
  Input,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { MdCheckCircle, MdCheckCircleOutline, MdEdit } from "react-icons/md";

export default function AssignModal({
  visible,
  data,
  onClose = () => {},
  onRefresh = () => {},
}) {
  const { state, setState } = useHookState({
    detail: {},
    userList: [],
  });

  const handleClose = () => {
    setState({ userSelected: null });
    onClose();
  };

  const fetchData = async (textSearch) => {
    userService
      .search({
        page: 0,
        size: 5,
        textSearch,
      })
      .then((res) => {
        setState({
          userList: res.data,
          page: res.page - 0,
          size: res.size - 0,
          totalElements: res.totalElements,
        });
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  useEffect(() => {
    setState({
      detail: data || {},
    });
  }, [data]);

  useEffect(() => {
    fetchData();
  }, []);

  const searchRef = useRef();
  const toast = useToast();
  const isEdit = !!state.detail?._id;

  const onSubmit = (values, actions) => {
    const body = {
      deviceId: state.detail?._id,
      // ownerId: state.userSelected?._id,
      status: 2,
      fullname: state.fullname,
      phone: state.phone,
      address: state.address,
    };

    deviceService
      .assign(body)
      .then((res) => {
        console.log("res", res);
        toast({
          title: "Bàn giao thành công",
          description: "Bàn giao thành công",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        onRefresh();
        handleClose();
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      width: 40,
      renderItem: (_, __, index) => (
        <HStack spacing="4px">
          <Text fontSize="sm" fontWeight="700" paddingLeft={2}>
            {index + 1 + (state.page || 0) * (state.size || 0)}
          </Text>
        </HStack>
      ),
    },
    {
      title: "Họ và tên",
      dataIndex: "fullname",
      width: 100,
    },
    {
      title: "Mã NV",
      width: 90,
      dataIndex: "code",
    },
    {
      title: "Số điện thoại",
      width: 90,
      dataIndex: "phone",
    },
    {
      title: "",
      dataIndex: "",
      renderItem: (_, row, idx) => {
        const CheckIcon =
          row._id == state.userSelected?._id
            ? MdCheckCircle
            : MdCheckCircleOutline;
        return (
          <ButtonGroup gap={0.1}>
            <Tooltip label="Chọn" placement="top">
              <span>
                <CheckIcon
                  color={"#4e4eff"}
                  size={20}
                  cursor={"pointer"}
                  onClick={() => {
                    setState({
                      userSelected: row,
                    });
                  }}
                />
              </span>
            </Tooltip>
          </ButtonGroup>
        );
      },
    },
  ];

  return (
    <Modal isOpen={visible} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{"Bán thiết bị"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid templateColumns="repeat(4, 1fr)" style={{ marginBottom: 20 }}>
            {[
              {
                title: "Tên thiết bị",
                dataIndex: "deviceName",
              },
              {
                title: "Mã thiết bị",
                dataIndex: "deviceCode",
              },
              {
                title: "Hãng sản xuất",
                dataIndex: "manufacturer",
              },
              {
                title: "Màu sắc",
                dataIndex: "color",
              },
              {
                title: "Khối lượng",
                dataIndex: "mass",
              },
              {
                title: "Kích thước",
                dataIndex: "size",
              },
              {
                title: "Công nghệ",
                dataIndex: "tech",
              },
            ].map((item) => (
              <GridItem colSpan={2}>
                <Text fontSize={14} fontWeight={"600"}>
                  {item.title}
                </Text>
                <Text
                  color={state.detail?.[item.dataIndex] ? undefined : "#aaa"}
                >
                  {state.detail?.[item.dataIndex] || "Không có"}
                </Text>
              </GridItem>
            ))}
          </Grid>

          <Text fontSize={14} fontWeight={"600"}>
            Thông tin khách hàng
          </Text>
          <Text color={"#666"}>Họ tên: </Text>
          <Input
            onChange={(e) => {
              setState({ fullname: e.target.value });
            }}
          ></Input>
          <Text color={"#666"}>Số điện thoại:</Text>
          <Input
            onChange={(e) => {
              setState({ phone: e.target.value });
            }}
          ></Input>
          <Text color={"#666"}>Địa chỉ: </Text>
          <Input
            onChange={(e) => {
              setState({ address: e.target.value });
            }}
          ></Input>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            isDisabled={!state.phone}
            aria-label="edit"
            leftIcon={<MdCheckCircleOutline />}
            onClick={onSubmit}
          >
            {"Bán"}
          </Button>
          {/* <Button color={"blue"} type="submit" form="import-device"></Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
