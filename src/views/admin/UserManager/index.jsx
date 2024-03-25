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
import userService from "@/service/user-service";
import { GENDER_ENUM } from "@/utils/enum";
import moment from "moment";
import { MdAddCircleOutline, MdDelete, MdEdit } from "react-icons/md";
import UserModal from "./UserModal";

export default function UserManager() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const { state, setState } = useHookState({
    userList: [],
    page: 0,
    size: 10,
    totalElements: 0,
  });
  const dispatch = useDispatch();

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
      title: "Họ và tên",
      dataIndex: "fullname",
      width: 200,
      // renderItem: (_, row) => (
      //   <HStack spacing="14px">
      //     <img
      //       src={row.imageUrl}
      //       alt="song-cover"
      //       style={{ width: "50px", height: "50px" }}
      //     />
      //     <div>
      //       <Text fontSize="small" fontWeight="500">
      //         {row.name}
      //       </Text>
      //       <Text fontSize="small" fontWeight="300">
      //         {row.author}
      //       </Text>
      //     </div>
      //   </HStack>
      // ),
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
      title: "Ngày sinh",
      dataIndex: "birth",
      renderItem: (v) => (v ? moment(v).format("DD/MM/YYYY") : ""),
    },
    {
      title: "Email",
      dataIndex: "email",
      //   <Text color={textColor} fontSize="sm" fontWeight="700">
      //     {v?.join(", ")}
      //   </Text>
      // ),
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      renderItem: (v) => GENDER_ENUM.find((i) => i.value == v)?.label,
    },
    {
      title: "Địa chỉ",
      width: 90,
      dataIndex: "address",
    },
    {
      title: "Ngày vào công ty",
      width: 90,
      dataIndex: "startTime",
      renderItem: (v) => (v ? moment(v).format("DD/MM/YYYY") : ""),
    },
    {
      title: "",
      dataIndex: "",
      renderItem: (_, row) => (
        <ButtonGroup gap={0.1}>
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
        </ButtonGroup>
      ),
    },
  ];

  const fetchData = async () => {
    userService
      .search({
        page: state.page,
        size: state.size,
      })

      .then((res) => {
        console.log(res, "data???");
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
              Danh sách nhân viên
            </Text>
            <Spacer />
            <HStack>
              <Button
                onClick={() => {
                  setState({ visibleForm: true, editData: null });
                }}
                leftIcon={<MdAddCircleOutline />}
                variant="brand"
                pr="15px"
              >
                Thêm
              </Button>
              <Menu />
            </HStack>
          </Flex>
          <TableView columns={columns} data={state.userList} />
          <Pagination
            currentPage={state.page + 1}
            size={state.size}
            total={state.totalElements}
            onChangePage={onChangePage}
          />
        </Card>
        <UserModal
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
            musicService.delete(state.deleteId).then((res) => {
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
