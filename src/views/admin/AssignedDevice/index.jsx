import {
  Box,
  ButtonGroup,
  Flex,
  HStack,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
// import MusicForm from "./components/MusicForm";
import Card from "@/components/card/Card";
import ConfirmDelete from "@/components/Modal/ConfirmDelete";
import { SearchBar } from "@/components/navbar/searchBar/SearchBar";
import Pagination from "@/components/Pagination/Pagination";
import TableView from "@/components/View/TableView";
import useHookState from "@/hooks/useHookState";
import useSearch from "@/hooks/useSearch";
import deviceService from "@/service/device-service";
import moment from "moment";
import { GiBrokenPottery } from "react-icons/gi";
import { MdEditDocument } from "react-icons/md";
import DeviceForm from "./DeviceForm";
import { formatPrice } from "@/utils/index";

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
      title: "Ngày bán",
      dataIndex: "assignDate",
      width: 100,
      renderItem: (v) => (v ? moment(v).format("DD/MM/YYYY HH:mm:ss") : ""),
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
      title: "Họ tên",
      width: 90,
      dataIndex: "fullname",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
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
          <Tooltip label="Báo hỏng" placement="top">
            <span>
              <GiBrokenPottery
                color="#ff5555"
                size={20}
                cursor={"pointer"}
                onClick={() => {
                  setState({ confirmBroken: true, brokenId: row._id });
                }}
              />
            </span>
          </Tooltip>
        </ButtonGroup>
      ),
    },
  ];

  const fetchData = async (deviceName, page) => {
    deviceService
      .search({
        status: 2,
        page: page || state.page,
        size: state.size,
        deviceName,
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
              Danh sách thiết bị đã bán
            </Text>
            <SearchBar
              style={{ marginLeft: 20 }}
              placeholder="Tìm theo tên"
              onChange={onSearch}
            />
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
          onRefresh={() => fetchData(textSearch, 0)}
          onClose={() => {
            setState({ visibleForm: false });
          }}
        />

        <ConfirmDelete
          visible={state.confirmBroken}
          onSubmit={() => {
            deviceService.broken(state.brokenId).then((res) => {
              fetchData(textSearch, 0);
            });
          }}
          content="Bạn có chắc báo hỏng thiết bị"
          onClose={() => {
            setState({ confirmBroken: false });
          }}
        />
      </Box>
    </>
  );
}
