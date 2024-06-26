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
import deviceService from "@/service/type-device-service";
import { formatPrice } from "@/utils/index";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { MdAddCircleOutline, MdDelete, MdEdit } from "react-icons/md";
import DeviceForm from "./DeviceForm";
import moment from "moment";
import LineChart from "@/components/charts/LineAreaChart";

export default function StatisticDevice() {
  // Chakra Color Mode
  const toast = useToast();
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const { state, setState } = useHookState({
    typeList: [],
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
      title: "Tên",
      dataIndex: "typeName",
      width: 200,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      renderItem: (v) => (v ? moment(v).format("HH:mm DD/MM/YYYY") : ""),
    },
    {
      title: "",
      dataIndex: "",
      renderItem: (_, row) => (
        <ButtonGroup gap={0.1}>
          <Tooltip label="Bàn giao thiết bị" placement="top">
            <span>
              <ExternalLinkIcon
                color="green"
                size={20}
                cursor={"pointer"}
                onClick={() => {
                  setState({ exportData: row, visibleExport: true });
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

  const fetchData = async () => {
    console.log(state, "state...");
    deviceService
      .search({
        allTag: true,
        page: state.page,
        size: state.size,
      })

      .then((res) => {
        console.log(res, "data???");
        setState({
          typeList: res.data,
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
              Loại thiết bị
            </Text>
          </Flex>
          <LineChart
            chartOptions={{
              chart: {
                id: "basic-bar",
              },
              xaxis: {
                categories: Array.from(Array(30).keys()),
              },
            }}
            chartData={[
              {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 70, 91],
              },
            ]}
          />
          <TableView columns={columns} data={state.typeList} />
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
