//connect wallet imports
// Chakra imports
import { Flex } from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";
// Custom components
// Assets
// import snackbarUtils from "../../utils/snackbar-utils";

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
