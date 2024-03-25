import React from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { HSeparator } from "@/components/separator/Separator";
import DefaultAuth from "@/layouts/auth/Default";
import illustration from "@/assets/img/auth/background-device.jpg";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { getApiUrl, requestData } from "@/service/request";

function SignIn() {
  const dataRef = React.useRef({});
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const brandStars = useColorModeValue("brand.500", "brand.400");
  let history = useHistory();

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  console.log("sign-in-auth");

  const toast = useToast();
  const handleLogin = () => {
    requestData(
      getApiUrl(true) + "/user/sign-in",
      {
        username: dataRef.current.username,
        password: dataRef.current.password,
      },
      "post"
    )
      .then((res) => {
        console.log(res, "res");
        // requestHeaders.authorization = "Bearer " + res.data.token;
        toast({
          title: "Đăng nhập thành công",
          description: "",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        history.replace("/admin");
      })
      .catch((e) => {
        console.log(e, "e???");
        toast({
          title: "Lỗi",
          description: typeof e == "string" ? e : e?.toString(),
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      });
  };
  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <div
        // src={illustration}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          backgroundImage: `url(${illustration})`,
        }}
      >
        <div
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.7)",
          }}
        ></div>
      </div>
      <Flex
        zIndex="2"
        display={"flex"}
        direction="column"
        justifyContent={"center"}
        w={{ base: "100%", md: "420px" }}
        maxW="100%"
        background="transparent"
        borderRadius="15px"
        mx={{ base: "auto", lg: "unset" }}
        me="auto"
        mt={"auto"}
        mb={"auto"}
        px={50}
        py={30}
        backgroundColor={"rgba(255,255,255,0.8)"}
      >
        <Text fontSize="2xl" fontWeight="bold" textAlign={"center"}>
          Đăng nhập
        </Text>
        <FormControl>
          <FormLabel
            display="flex"
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color={textColor}
            mb="8px"
          >
            Username<Text color={brandStars}>*</Text>
          </FormLabel>
          <Input
            isRequired={true}
            variant="auth"
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="email"
            placeholder="your username"
            mb="24px"
            fontWeight="500"
            size="lg"
            onChange={(e) => {
              dataRef.current.username = e.target.value;
            }}
          />
          <FormLabel
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color={textColor}
            display="flex"
          >
            Password<Text color={brandStars}>*</Text>
          </FormLabel>
          <InputGroup size="md">
            <Input
              isRequired={true}
              fontSize="sm"
              placeholder="Min. 8 characters"
              mb="24px"
              size="lg"
              type={show ? "text" : "password"}
              variant="auth"
              onChange={(e) => {
                dataRef.current.password = e.target.value;
              }}
            />
            <InputRightElement display="flex" alignItems="center" mt="4px">
              <Icon
                color={textColorSecondary}
                _hover={{ cursor: "pointer" }}
                as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                onClick={handleClick}
              />
            </InputRightElement>
          </InputGroup>
          <Button
            fontSize="sm"
            variant="brand"
            fontWeight="500"
            w="100%"
            h="50"
            mb="24px"
            onClick={handleLogin}
          >
            Đăng nhập
          </Button>
        </FormControl>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
