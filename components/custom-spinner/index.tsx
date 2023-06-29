'use client'

import { ColorRing } from "react-loader-spinner";
import { Flex } from "@chakra-ui/react"

export interface CustomSpinnerProps {
  height?: string;
  width?: string;
}

const CustomSpinner = ({ height, width }: CustomSpinnerProps) => {
  return (
    <Flex justify={"center"} alignItems={"center"} mt={"30vh"}>
      <ColorRing
        visible={true}
        height={height || "40"}
        width={width || "40"}
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#0f63ff", "#0e59e6", "#0c4fcc", "#0b45b3", "#093b99"]}
      />
    </Flex>
  );
};

export default CustomSpinner;
