'use client';

import { Flex, Text } from "@chakra-ui/react";
import Tag from "../pill";
import { useFetchCategories } from "@/services/swr/category";
import CustomSpinner from "../custom-spinner";


const SideMenu = () => {
  const { data, isGenerating } = useFetchCategories();

  return (
    <div className="w-[100%]">
      <Flex direction={"column"} gap={"5"}>
        <Text fontSize={"2xl"} fontWeight={"bold"}>
          Trending Tags
        </Text>
        {isGenerating ? <CustomSpinner /> : 
          <>
            { data?.length > 0 ? 
              <>
                <Flex gap={"2"} flexWrap={"wrap"}>
                  { data?.map((tag: any, index: number) => {
                    return (
                      <div key={index}>
                        <Tag name={tag?.name} />
                      </div>
                    )
                  })}
                </Flex>
              </> :
              <Text>No tags found.</Text>
            }
          </>
        }
      </Flex>
    </div>
  );
}

export default SideMenu