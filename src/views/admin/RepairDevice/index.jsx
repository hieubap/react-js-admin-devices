import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Menu,
  Spacer,
  Text,
  Tooltip,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
// import MusicForm from "./components/MusicForm";
import Card from "@/components/card/Card";
import ConfirmDelete from "@/components/Modal/ConfirmDelete";
import Pagination from "@/components/Pagination/Pagination";
import TableView from "@/components/View/TableView";
import useHookState from "@/hooks/useHookState";
import deviceService from "@/service/device-service";
import { formatPrice } from "@/utils/index";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  MdAddCircleOutline,
  MdCarRepair,
  MdDelete,
  MdEdit,
  MdRebaseEdit,
  MdTireRepair,
} from "react-icons/md";
import { GiAutoRepair } from "react-icons/gi";
import RepairForm from "./RepairForm";
import { CgEditShadows, CgEditUnmask } from "react-icons/cg";
import moment from "moment";

export default function RepairDevice() {
  // Chakra Color Mode
  const toast = useToast();
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const { state, setState } = useHookState({
    musicList: [],
    page: 0,
    size: 10,
    totalElements: 0,
  });
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      width: 40,
      renderItem: (_, __, index) => (
        <HStack spacing="4px">
          <Text
            color={textColor}
            fontSize="sm"
            fontWeight="700"
            paddingLeft={2}
          >
            {index + 1 + (state.page || 0) * (state.size || 0)}
          </Text>
        </HStack>
      ),
    },
    {
      title: "Tên thiết bị",
      dataIndex: "deviceName",
      width: 200,
    },
    {
      title: "Mã thiết bị",
      width: 90,
      dataIndex: "deviceCode",
    },
    {
      title: "Hãng sản xuất",
      dataIndex: "manufacturer",
    },
    // {
    //   title: "Màu sắc",
    //   dataIndex: "color",
    // },
    // {
    //   title: "Khối lượng",
    //   dataIndex: "mass",
    //   renderItem: (v) => (v ? v + " (kg)" : ""),
    // },
    {
      title: "Kích thước",
      width: 90,
      dataIndex: "size",
      renderItem: (v) => (v ? v + " (inch)" : ""),
    },
    // {
    //   title: "Công nghệ",
    //   width: 90,
    //   dataIndex: "tech",
    // },
    {
      title: "Giá nhập",
      dataIndex: "price",
      renderItem: (v) => formatPrice(v),
    },
    {
      title: "Giá bán",
      dataIndex: "price",
      renderItem: (v) => formatPrice(v),
    },
    {
      title: "",
      dataIndex: "",
      renderItem: (_, row) => (
        <ButtonGroup gap={0.1}>
          <Tooltip label="Sửa chữa" placement="top">
            <span>
              <GiAutoRepair
                color="#4e4eff"
                size={20}
                cursor={"pointer"}
                onClick={() => {
                  setState({ repairData: row, visibleRepair: true });
                }}
              />
            </span>
          </Tooltip>
          <Tooltip label="Xóa" placement="top">
            <span>
              <MdDelete
                color="#ff5555"
                size={20}
                cursor={"pointer"}
                onClick={() => {
                  setState({ confirmDelete: true, deleteId: row._id });
                }}
              />
            </span>
          </Tooltip>
        </ButtonGroup>
      ),
    },
  ];

  const fetchData = async () => {
    console.log(state, "state...");
    deviceService
      .search({
        status: 3,
        // allTag: true,
        page: state.page,
        size: state.size,
      })

      .then((res) => {
        console.log(res, "data???");
        setState({
          musicList: res.data,
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
    fetchData();
  }, [state.page]);

  const onChangePage = (page) => {
    console.log("onChange", page);
    setState({
      page: page - 1,
    });
  };

  return (
    <>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Card
          direction="column"
          w="100%"
          px="0px"
          overflowX={{ sm: "scroll", lg: "hidden" }}
        >
          <Flex px="25px" justify="space-between" mb="20px" align="center">
            <Text
              color={textColor}
              fontSize="22px"
              fontWeight="700"
              lineHeight="100%"
            >
              Danh sách thiết bị báo sửa
            </Text>
            <Spacer />
          </Flex>
          <TableView columns={columns} data={state.musicList} />
          <Pagination
            currentPage={state.page + 1}
            size={state.size}
            total={state.totalElements}
            onChangePage={onChangePage}
          />
        </Card>
        <RepairForm
          data={state.repairData}
          visible={state.visibleRepair}
          onRefresh={fetchData}
          onClose={() => {
            setState({ visibleRepair: false });
          }}
        />
        <ConfirmDelete
          visible={state.confirmDelete}
          onSubmit={() => {
            deviceService.delete(state.deleteId).then((res) => {
              fetchData();
            });
          }}
          onClose={() => {
            setState({ confirmDelete: false });
          }}
        />
        <ConfirmDelete
          visible={state.visibleAccessory}
          onSubmit={() => {
            deviceService
              .update({ _id: state.accessoryId, status: 5 })
              .then((res) => {
                fetchData();
              });
          }}
          onClose={() => {
            setState({ visibleAccessory: false });
          }}
        />
      </Box>
    </>
  );
}
