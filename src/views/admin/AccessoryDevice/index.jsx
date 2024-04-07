import {
  Badge,
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
import DeviceForm from "./DeviceForm";
import moment from "moment";
import { GoBookmarkSlash } from "react-icons/go";
import { SearchBar } from "@/components/navbar/searchBar/SearchBar";
import useSearch from "@/hooks/useSearch";

export default function AccessoryDevice() {
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
      title: "Ngày chuyển",
      dataIndex: "accessoryDate",
      width: 100,
      renderItem: (item) =>
        item ? moment(item).format("HH:mm DD/MM/YYYY") : "",
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
      title: "Trạng thái",
      // dataIndex: "",
      renderItem: (_, item) => {
        const used = item.deviceRepairId;
        return (
          <Badge
            bgColor={used ? "blue" : "green"}
            color={used ? "white" : "white"}
          >
            <Text fontSize={10}>{used ? "Đã dùng" : "Sẵn sàng"}</Text>
          </Badge>
        );
      },
    },
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
      renderItem: (_, row) => {
        const used = row.deviceRepairId;
        return (
          <ButtonGroup gap={0.1}>
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
            {!used && (
              <>
                <Tooltip label="Loại khỏi danh sách linh kiện" placement="top">
                  <span>
                    <GoBookmarkSlash
                      color="green"
                      size={20}
                      cursor={"pointer"}
                      onClick={() => {
                        setState({
                          changeStatusId: row._id,
                          visibleChangeStatus: true,
                        });
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
              </>
            )}
          </ButtonGroup>
        );
      },
    },
  ];

  const fetchData = async (deviceName, isSearch) => {
    console.log(state, "state...");
    deviceService
      .search({
        status: 5,
        deviceName,
        // allTag: true,
        page: isSearch ? 0 : state.page,
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
              Linh kiện dùng cho sửa chữa hoặc thay thế
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
          onRefresh={() => fetchData(textSearch, true)}
          onClose={() => {
            setState({ visibleForm: false });
          }}
        />
        <ConfirmDelete
          visible={state.confirmDelete}
          onSubmit={() => {
            deviceService.delete(state.deleteId).then((res) => {
              fetchData(textSearch, true);
            });
          }}
          onClose={() => {
            setState({ confirmDelete: false });
          }}
        />
        <ConfirmDelete
          visible={state.visibleChangeStatus}
          onSubmit={() => {
            deviceService
              .update({ _id: state.changeStatusId, status: 1 })
              .then((res) => {
                fetchData(textSearch, true);
              });
          }}
          content="Thiết bị sẽ không dùng để sửa chữa/ thay thế nữa. thiết bị sẽ xuất hiện trở lại trong mục nhập thiết bị"
          onClose={() => {
            setState({ visibleChangeStatus: false });
          }}
        />
      </Box>
    </>
  );
}
