'use client';

import { usePathname } from "next/navigation";
import { Text, Flex, Box, Container, Button } from "@chakra-ui/react";
import { useFetchSingleCategory } from "@/services/swr/category";
import CustomSpinner from "@/components/custom-spinner";
import Card from "@/components/card";
import { PostType } from "@/types/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Category = () => {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname!.replace("/category/", "");

  const { data, isGenerating } = useFetchSingleCategory(id);

  return (
    <Container maxW="6xl" mx="auto">
      <Flex justify="space-between">
        <Box py="62px" px="20px" w="full">
          <Button
            borderRadius="5px"
            p="10px 15px"
            onClick={() => router.back()}
          >
            Go back
          </Button>
          <Flex justify="center" gap="2" my="40px" flexDir={"column"}>
            <Text fontSize={{ base: "28px", lg: "48px" }} fontWeight={"bold"}>
              {data?.name}
            </Text>
            <Flex
              flexDir={"column"}
              w={{ base: "100%", md: "75%" }}
              mt="40px"
              gap="2"
            >
              {isGenerating ? (
                <CustomSpinner />
              ) : (
                <>
                  {data?.posts.length > 0 ? (
                    <>
                      {data?.posts?.map((post: PostType) => {
                        return (
                          <Link
                            href={`/post/${post?.post?.id}`}
                            key={post?.post?.id}
                          >
                            <Flex alignItems={"center"}>
                              <Card
                                author={`${post?.post?.author?.firstName} ${post?.post?.author?.lastName}`}
                                title={post?.post?.title}
                                body={`${post?.post?.content?.substring(
                                  0,
                                  150
                                )}...`}
                                dateTime={post?.post?.createdAt}
                                noOfComments={post?.post?.comments?.length}
                                noOfLikes={post?.post?.likes?.length}
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
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};

export default Category;
