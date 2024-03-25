//connect wallet imports
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useDispatch, useSelector } from "react-redux";
import { useDisconnect } from "wagmi";
// Chakra imports
import FixedPlugin from "@/components/fixedPlugin/FixedPlugin";
import Footer from "@/components/footer/FooterAuth";
import {
  Box,
  Button,
  Flex,
  Icon,
  Modal,
  Text,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";
// Custom components
import { NavLink } from "react-router-dom";
// Assets
import { strings } from "../../utils/index";
// import snackbarUtils from "../../utils/snackbar-utils";
import { FaChevronLeft } from "react-icons/fa";
import { useHistory } from "react-router-dom";

function AuthIllustration(props) {
  const { children, illustrationBackground } = props;

  return (
    <Flex position="relative" h="100vh" justifyContent={"center"}>
      {children}
    </Flex>
  );
}
// PROPS

AuthIllustration.propTypes = {
  illustrationBackground: PropTypes.string,
  image: PropTypes.any,
};

export default AuthIllustration;
