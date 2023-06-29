'use client'

import CustomSpinner from "@/components/custom-spinner";
import { useFetchSinglePost } from "@/services/swr/post";
import { Avatar, Box, Button, Divider, Flex, Text } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"

const SinglePost = () => {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname!.replace("/post/", "");

  const { data, isGenerating } = useFetchSinglePost(+id);
  
  return (
    <Box
      maxW="3xl"
      mx="auto"
      px="20px"
      mt="4"
      h="400px"
      borderRadius="lg"
      overflow="hidden"
      alignItems={"center"}
    >
      <Flex justify="space-between">
        <Button borderRadius="5px" p="10px 15px" onClick={() => router.back()}>
          Go back
        </Button>
      </Flex>
      {isGenerating ? (
        <CustomSpinner />
      ) : (
        <>
          <Flex flexDir={"column"} alignItems={"center"}>
            <Text fontSize={{ base: "24px", lg: "32px" }} fontWeight="bold">
              {data?.title}
            </Text>
            <Flex alignItems={"center"} gap="2" mt="4">
              <Avatar
                size={"sm"}
                name={`${data?.author.firstName} ${data?.author.lastName}`}
              />
              <Text fontWeight={"semibold"}>
                {data?.author.firstName} {data?.author.lastName}
              </Text>
              <Text color="purple.500" fontSize={"sm"}>
                follow
              </Text>
            </Flex>
          </Flex>
          <Divider
            border="0.2px solid #9D9D9D"
            w="5xl"
            alignItems="center"
            my="50px"
          />
          <ReactMarkdown children={data?.content} remarkPlugins={[remarkGfm]} />
        </>
      )}
    </Box>
  );
};
  
export default SinglePost;
