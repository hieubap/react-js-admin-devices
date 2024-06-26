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
import { MdAddCircleOutline, MdDelete, MdEdit } from "react-icons/md";
import AssignModal from "./AssignModal";
import DeviceForm from "./DeviceForm";
import { SearchBar } from "@/components/navbar/searchBar/SearchBar";
import useSearch from "@/hooks/useSearch";
import { FaDropbox, FaStore } from "react-icons/fa";

export default function ImportDevice() {
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
      title: "Loại sản phẩm",
      dataIndex: "type",
      renderItem: (v) => v?.typeName,
    },
    {
      title: "Hãng sản xuất",
      dataIndex: "manufacturer",
    },
    // {
    //   title: "Màu sắc",
    //   dataIndex: "color",
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
      dataIndex: "priceBuy",
      renderItem: (v) => formatPrice(v),
    },
    {
      title: "Giá bán",
      dataIndex: "priceSell",
      renderItem: (v) => formatPrice(v),
    },
    {
      title: "",
      dataIndex: "",
      renderItem: (_, row) => (
        <ButtonGroup gap={0.1}>
          <Tooltip label="Bán thiết bị" placement="top">
            <span>
              <FaStore
                color="green"
                size={20}
                cursor={"pointer"}
                onClick={() => {
                  setState({ exportData: row, visibleExport: true });
                }}
              />
            </span>
          </Tooltip>
          <Tooltip label="Chuyển kho linh kiện" placement="top">
            <span>
              <FaDropbox
                color="orange"
                size={20}
                cursor={"pointer"}
                onClick={() => {
                  setState({ accessoryId: row._id, visibleAccessory: true });
                }}
              />
            </span>
          </Tooltip>
          <Tooltip label="Sửa" placement="top">
            <span>
              <MdEdit
                color="#4e4eff"
                size={20}
                cursor={"pointer"}
                onClick={() => {
                  setState({ editData: row, visibleForm: true });
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

  const fetchData = async (deviceName = "") => {
    console.log(state, "state...");
    deviceService
      .search({
        status: 1,
        // allTag: true,
        deviceName,
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

  const { onSearch, textSearch } = useSearch({
    refreshData: fetchData,
  });

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
              Danh sách thiết bị hiện có
            </Text>
            <SearchBar
              style={{ marginLeft: 20 }}
              placeholder="Tìm theo tên"
              onChange={onSearch}
            />
            <Spacer />
            <HStack>
              <Button
                onClick={() => {
                  setState({ visibleForm: true, editData: {} });
                }}
                leftIcon={<MdAddCircleOutline />}
                variant="brand"
                pr="15px"
              >
                Thiết bị mới
              </Button>
              <Menu />
            </HStack>
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
        <AssignModal
          data={state.exportData}
          visible={state.visibleExport}
          onRefresh={fetchData}
          onClose={() => {
            setState({ visibleExport: false });
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
          // title="Ch"
          content="Linh kiện sẽ được chuyển vào kho làm linh kiện thay thế sửa chữa. Thiết bị này sẽ được hiển thị trong linh kiện sửa chữa"
          onSubmit={() => {
            deviceService
              .update({ _id: state.accessoryId, status: 5 })
              .then((res) => {
                fetchData(textSearch);
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
