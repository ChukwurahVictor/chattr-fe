'use client';

import { useAppSelector } from "@/redux/hooks";
import { selectAuth } from "@/redux/slices/auth";
import { useFetchSingleUser } from "@/services/swr/user";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Avatar,
  Text,
  Flex,
  Box,
  Container,
} from "@chakra-ui/react";

import Card from "@/components/card";
import Following from "@/components/following";
import { PostType } from "@/types/types";
// import Link from "next/link";

const Library = () => {
  const { data } = useAppSelector(selectAuth);
  const { data: userData } = useFetchSingleUser(data?.user?.id);
  // console.log(userData);
  
  return (
    <Container maxW="6xl" mx="auto">
      <Flex justify="space-between">
        <Box py="62px" px="20px" w="full">
          <Flex alignItems="center" gap="2" mb="40px">
            <Text fontSize={"48px"} fontWeight={"bold"}>
              Your Library
            </Text>
          </Flex>
          <Tabs isFitted>
            <TabList mx="8">
              <Tab fontSize={"lg"} fontWeight={"bold"}>
                Your List
              </Tab>
              <Tab fontSize={"lg"} fontWeight={"bold"}>
                Reading List
              </Tab>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="indigo.500"
              borderRadius="1px"
            />
            <TabPanels>
              <TabPanel>
                {userData?.posts.length > 0 ? (
                  <>
                    {userData?.posts?.map((post: PostType) => {
                      return (
                        <div key={post.id}>
                          <Card
                            author={`${post.author?.firstName} ${post.author?.lastName}`}
                            title={post.title}
                            body={post.content}
                            dateTime={post.createdAt}
                            noOfComments={post.comments.length}
                            noOfLikes={post.likes.length}
                            // image={post.image}
                          />
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <Text>No posts</Text>
                )}
              </TabPanel>
              <TabPanel>
                {userData?.posts.length > 0 ? (
                  <>
                    {userData?.posts?.map((post: PostType) => {
                      return (
                        <div key={post.id}>
                          <Card
                            author={"John Wick"}
                            title={post.title}
                            body={post.content}
                            dateTime={post.createdAt}
                            noOfComments={post.comments.length}
                            noOfLikes={post.likes.length}
                          />
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <Text>No posts</Text>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <Flex display={{ base:"none", lg:"block" }}>
          <Following />
        </Flex>
      </Flex>
    </Container>
  );
};

export default Library;