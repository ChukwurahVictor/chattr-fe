'use client';

import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Tag from "../pill";
import { useFetchCategories } from "@/services/swr/category";
import CustomSpinner from "../custom-spinner";
import { Category } from "@/types/types";
import { useRouter } from "next/navigation";


const SideMenu = () => {
  const router = useRouter();
  const { data, isGenerating } = useFetchCategories();

  return (
    <div className="w-[100%]">
      <Flex direction={"column"} gap={"5"}>
        <Text fontSize={"2xl"} fontWeight={"bold"}>
          Trending Tags
        </Text>
        {isGenerating ? (
          <CustomSpinner />
        ) : (
          <>
            {data?.length > 0 ? (
              <>
                <Flex gap={"2"} mt="2" flexWrap={"wrap"}>
                  {data?.map((tag: Category, index: number) => {
                    return (
                      <Box
                        key={index}
                        sx={{ cursor: "pointer" }}
                        onClick={() => router.push(`/category/${tag?.id}`)}
                      >
                        <Tag name={tag?.name} />
                      </Box>
                    );
                  })}
                </Flex>
              </>
            ) : (
              <Text>No tags found.</Text>
            )}
          </>
        )}
      </Flex>
    </div>
  );
}

export default SideMenu