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
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// import MusicForm from "./components/MusicForm";
import Card from "@/components/card/Card";
import ConfirmDelete from "@/components/Modal/ConfirmDelete";
import Pagination from "@/components/Pagination/Pagination";
import TableView from "@/components/View/TableView";
import useHookState from "@/hooks/useHookState";
import deviceService from "@/service/device-service";
import { RepeatIcon, SettingsIcon } from "@chakra-ui/icons";
import moment from "moment";
import { MdAddCircleOutline, MdEdit, MdEditDocument } from "react-icons/md";
import DeviceForm from "./DeviceForm";

export default function ExportDevice() {
  // Chakra Color Mode
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
    {
      title: "Màu sắc",
      dataIndex: "color",
    },
    {
      title: "Ngày bàn giao",
      dataIndex: "assignDate",
      renderItem: (v) => (v ? moment(v).format("DD/MM/YYYY HH:mm:ss") : ""),
    },
    {
      title: "Người nhận",
      width: 90,
      dataIndex: "owner",
      renderItem: (v) => v?.fullname,
    },
    {
      title: "",
      dataIndex: "",
      renderItem: (_, row) => (
        <ButtonGroup gap={0.1}>
          <Tooltip label="Sửa" placement="top">
            <span>
              <MdEditDocument
                color="green"
                size={20}
                cursor={"pointer"}
                onClick={() => {
                  setState({ editData: row, visibleForm: true });
                }}
              />
            </span>
          </Tooltip>
          <Tooltip label="Kiểm kê" placement="top">
            <span>
              <SettingsIcon
                color="#4e4eff"
                size={20}
                cursor={"pointer"}
                onClick={() => {
                  // setState({ confirmDelete: true, deleteId: row._id });
                }}
              />
            </span>
          </Tooltip>
          <Tooltip label="Thu hồi" placement="top">
            <span>
              <RepeatIcon
                color="#ff5555"
                size={20}
                cursor={"pointer"}
                onClick={() => {
                  // setState({ confirmDelete: true, deleteId: row._id });
                }}
              />
            </span>
          </Tooltip>
        </ButtonGroup>
      ),
    },
  ];

  const fetchData = async () => {
    deviceService
      .search({
        isExport: true,
        page: state.page,
        size: state.size,
      })
      .then((res) => {
        console.log(res, "data???");
        setState({
          musicList: res.data,
          page: res.pageNumber - 0,
          size: res.pageSize - 0,
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
              Music Table
            </Text>
          </Flex>
          <TableView columns={columns} data={state.musicList} />
          <Pagination
            currentPage={state.page + 1}
            size={state.size}
            total={state.totalElements}
            onChangePage={onChangePage}
          />
        </Card>
        <DeviceForm
          data={state.editData}
          visible={state.visibleForm}
          onRefresh={fetchData}
          onClose={() => {
            setState({ visibleForm: false });
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
      </Box>
    </>
  );
}
