'use client';

import { usePathname } from "next/navigation";
import {
  Avatar,
  Text,
  Flex,
  Box,
  Container,
} from "@chakra-ui/react";
import CustomSpinner from "@/components/custom-spinner";
import Card from "@/components/card";
import { PostType } from "@/types/types";
import Link from "next/link";
import { useFetchSingleUser } from "@/services/swr/user";

const Author = () => {
    const pathname = usePathname();
    const id = pathname!.replace("/author/", "");
    const { data, isGenerating } = useFetchSingleUser(id);

    return (
      <Container maxW="6xl" mx="auto">
        <Flex justify="space-between">
          <Box py="62px" px="20px" w="75%">
            <Flex alignItems="center" gap="2" mb="40px">
              <Avatar
                name={`${data?.firstName} ${data?.lastName}`}
                size={{ base: "md", lg: "lg" }}
              />
              <Text fontSize={"48px"} fontWeight={"bold"}>
                {`${data?.firstName} ${data?.lastName}`}
              </Text>
            </Flex>
            <Flex flexDir={"column"} mt="40px" gap="2">
              {isGenerating ? (
                <CustomSpinner />
              ) : (
                <>
                  {data?.posts.length > 0 ? (
                    <>
                      {data?.posts.map((post: PostType) => {
                        return (
                          <Link href={`/post/${post.id}`} key={post.id}>
                            <Flex alignItems={"center"}>
                              <Card
                                author={`${post.author.firstName} ${post.author.lastName}`}
                                title={post.title}
                                body={`${post.content.substring(0, 150)}...`}
                                dateTime={post?.createdAt}
                                noOfComments={post.comments.length}
                                noOfLikes={post.likes.length}
                                // image={post.image}
                              />
                            </Flex>
                          </Link>
                        );
                      })}
                    </>
                  ) : (
                    <Text>No posts</Text>
                  )}
                </>
              )}
            </Flex>
          </Box>
        </Flex>
      </Container>
    );
};

export default Author;
