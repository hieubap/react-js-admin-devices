import TableView from "@/components/View/TableView";
import useHookState from "@/hooks/useHookState";
import deviceService from "@/service/device-service";
import repairService from "@/service/repair-service";
import userService from "@/service/user-service";
import { formatPrice } from "@/utils/index";
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
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useMemo, useRef } from "react";
import { MdCheckCircle, MdCheckCircleOutline, MdEdit } from "react-icons/md";

export default function RepairModal({
  visible,
  data,
  onClose = () => {},
  onRefresh = () => {},
}) {
  const { state, setState } = useHookState({
    detail: {},
    replaceList: [],
    replaceSelected: [],
  });

  const handleClose = () => {
    setState({ replaceSelected: [] });
    onClose();
  };

  const fetchData = async (deviceName) => {
    deviceService
      .search({
        page: 0,
        size: 5,
        deviceName,
        status: 5,
        showReplace: true,
      })
      .then((res) => {
        setState({
          replaceList: res.data,
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

  const onSubmit = (values, actions) => {
    const body = {
      deviceId: data?._id,
      deviceReplaceIds: state.replaceSelected?.map((item) => item?._id),
      fullname: state.fullname,
      phone: state.phone,
      content: state.content,
      wage: state.wage,
    };

    repairService
      .create(body)
      .then((res) => {
        console.log("res", res);
        toast({
          title: "Sửa thành công",
          description: "Sửa giao thành công",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        onRefresh();
        handleClose();
        fetchData();
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
      title: "Tên thiết bị",
      dataIndex: "deviceName",
      width: 100,
    },
    {
      title: "Mã thiết bị",
      dataIndex: "deviceCode",
      width: 100,
    },
    {
      title: "Giá bán",
      dataIndex: "priceSell",
      width: 100,
      renderItem: (v) => formatPrice(v),
    },
    {
      title: "",
      renderItem: (_, row, idx) => {
        const isSelected = state.replaceSelected?.some((i) => i._id == row._id);
        const CheckIcon = isSelected ? MdCheckCircle : MdCheckCircleOutline;
        console.log(state.replaceSelected, "state.replaceSelected");
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
                      replaceSelected: isSelected
                        ? [...state.replaceSelected].filter(
                            (i) => i._id != row?._id
                          )
                        : [...state.replaceSelected, row],
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

  const columnSelected = [
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
      title: "Tên thiết bị",
      dataIndex: "deviceName",
      width: 100,
    },
    {
      title: "Mã thiết bị",
      dataIndex: "deviceCode",
      width: 100,
    },
    {
      title: "Giá bán",
      dataIndex: "priceSell",
      width: 100,
      renderItem: (v) => formatPrice(v),
    },
  ];
  const inputBg = useColorModeValue("secondaryGray.300", "navy.900");

  console.log(state.replaceSelected, "state.replaceSelected");
  const [totalPrice, devicePrice] = useMemo(() => {
    const price = state.replaceSelected.reduce(
      (a, b) => a + (Number(b.priceSell) || 0),
      0
    );
    const total = price + Number(state.wage || 0);
    return [total, price];
  }, [state.replaceSelected, state.wage]);

  return (
    <Modal isOpen={visible} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent style={{ maxWidth: "80vw" }}>
        <ModalHeader>{"Sửa chữa thiết bị"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize={16} fontWeight={"600"}>
            Thông tin thiết bị:
          </Text>
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
              <GridItem colSpan={1}>
                <Text
                  fontSize={14}
                  fontWeight={"500"}
                  color={"#666"}
                  style={{ borderTop: "1px solid #ddd" }}
                >
                  {item.title}
                </Text>
                <Text
                  color={state.detail?.[item.dataIndex] ? undefined : "#aaa"}
                  marginBottom={2}
                >
                  {state.detail?.[item.dataIndex] || "Không có"}
                </Text>
              </GridItem>
            ))}
          </Grid>

          <Text fontSize={16} fontWeight={"600"}>
            Thông tin nhân viên sửa chữa:
          </Text>
          <Grid templateColumns="repeat(4, 1fr)">
            {[
              {
                title: "Họ và tên",
                field: "fullname",
              },
              {
                title: "Số điện thoại",
                field: "phone",
              },
            ].map((item) => (
              <GridItem style={{ padding: "0px 10px 0 0" }}>
                <Text fontSize={14} fontWeight={"500"}>
                  {item.title}
                </Text>
                <Input
                  placeholder={""}
                  onChange={(e) => {
                    setState({
                      [item.field]: e.target.value,
                    });
                  }}
                />
              </GridItem>
            ))}
          </Grid>

          <Text fontSize={16} fontWeight={"600"}>
            Đánh giá tình hình thiết bị:
          </Text>
          <Textarea
            onChange={(e) => {
              setState({ content: e.target.value });
            }}
          />

          <Text fontSize={16} fontWeight={"600"}>
            Thiết bị thay thế
          </Text>

          <Grid templateColumns="repeat(4, 1fr)">
            <GridItem colSpan={2} paddingRight={8}>
              <Text color={"#666"}>Linh kiện hiện có: </Text>
              <Input
                variant="search"
                fontSize="sm"
                bg={inputBg}
                // color={inputText}
                fontWeight="500"
                height={8}
                mb={2}
                mt={1}
                onChange={(e) => {
                  if (searchRef.current) {
                    clearTimeout(searchRef.current);
                  }
                  searchRef.current = setTimeout(() => {
                    fetchData(e.target?.value);
                  }, 500);
                }}
                _placeholder={{ color: "gray.400", fontSize: "14px" }}
                borderRadius={"30px"}
                placeholder={"Tìm tên hoặc mã"}
              />
              <TableView columns={columns} data={state.replaceList} />
            </GridItem>
            <GridItem colSpan={2}>
              <Text color={"#666"}>Linh kiện đã chọn: </Text>

              <TableView
                columns={columnSelected}
                data={state.replaceSelected}
              />
            </GridItem>

            <GridItem colSpan={4}>
              <Text fontSize={16} fontWeight={"600"}>
                Chi phí sửa chữa
              </Text>
            </GridItem>

            <GridItem colSpan={2} style={{ paddingRight: 20 }}>
              <Text color={"#666"}>Tiền công sửa chữa: </Text>
              <Input
                onChange={(e) => {
                  setState({ wage: e.target.value });
                }}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <Text color={"#666"}>Tiền linh kiện thay thế: </Text>
              <Text>{formatPrice(devicePrice)}</Text>
            </GridItem>
          </Grid>
          <Text
            color={"#666"}
            style={{ marginLeft: "auto" }}
            textAlign={"end"}
            marginTop={8}
          >
            Tổng tiền:
          </Text>
          <Text
            fontSize={24}
            fontWeight={"600"}
            color={"#000"}
            textAlign={"end"}
          >
            {formatPrice(totalPrice)}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            isDisabled={!state.replaceSelected}
            aria-label="edit"
            leftIcon={<MdCheckCircleOutline />}
            onClick={onSubmit}
          >
            {"Đã sửa xong"}
          </Button>
          {/* <Button color={"blue"} type="submit" form="import-device"></Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
