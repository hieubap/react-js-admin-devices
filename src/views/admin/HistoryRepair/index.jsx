import {
  Box,
  ButtonGroup,
  Flex,
  HStack,
  Spacer,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
// import MusicForm from "./components/MusicForm";
import Card from "@/components/card/Card";
import ConfirmDelete from "@/components/Modal/ConfirmDelete";
import Pagination from "@/components/Pagination/Pagination";
import TableView from "@/components/View/TableView";
import useHookState from "@/hooks/useHookState";
import auditDeviceService from "@/service/audit-device-service";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import moment from "moment";
import { MdDelete, MdEdit } from "react-icons/md";
import AssignModal from "./AssignModal";
import DeviceForm from "./RepairModel";
import repairService from "@/service/repair-service";
import { formatPrice } from "@/utils/index";
import { IoMdEye } from "react-icons/io";
import RepairModal from "./RepairModel";

export default function HistoryRepair() {
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
      title: "Sửa lúc",
      width: 120,
      dataIndex: "createdAt",
      renderItem: (v) => (v ? moment(v).format("HH:mm DD/MM/YYYY") : ""),
    },
    {
      title: "Tên thiết bị",
      dataIndex: "deviceInfo",
      width: 150,
      renderItem: (item) => item?.deviceName,
    },
    {
      title: "Mã",
      width: 90,
      dataIndex: "deviceInfo",
      renderItem: (item) => item?.deviceCode,
    },
    {
      title: "Tên thợ",
      width: 120,
      dataIndex: "fullname",
    },
    {
      title: "Số điện thoại",
      width: 100,
      dataIndex: "phone",
    },
    {
      title: "Số linh kiện thay thế",
      width: 90,
      dataIndex: "deviceReplaceIds",
      renderItem: (item) => item?.length,
    },
    {
      title: "Công sửa",
      width: 90,
      dataIndex: "wage",
      renderItem: (item) => formatPrice(item),
    },
    {
      title: "Đánh giá",
      dataIndex: "content",
    },
    {
      title: "",
      dataIndex: "",
      width: 40,
      renderItem: (_, row) => (
        <ButtonGroup gap={0.1}>
          <Tooltip label="Xem" placement="top">
            <span>
              <IoMdEye
                color="#4e4eff"
                size={20}
                cursor={"pointer"}
                onClick={() => {
                  setState({ detailId: row._id, visibleForm: true });
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
    repairService
      .search({
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
              Lịch sử sửa chữa thiết bị
            </Text>
            <Spacer />
          </Flex>
          {/* <Text textAlign={"center"}>Sắp ra mắt</Text> */}

          <TableView columns={columns} data={state.musicList} />
          <Pagination
            currentPage={state.page + 1}
            size={state.size}
            total={state.totalElements}
            onChangePage={onChangePage}
          />
        </Card>
        <RepairModal
          id={state.detailId}
          visible={state.visibleForm}
          onRefresh={fetchData}
          onClose={() => {
            setState({ visibleForm: false, detailId: null });
          }}
        />
      </Box>
    </>
  );
}
