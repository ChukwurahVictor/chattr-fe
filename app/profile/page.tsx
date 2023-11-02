"use client"

import Card from "@/components/card";
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
import Following from "@/components/following";
import { useAppSelector } from "@/redux/hooks";
import { selectAuth } from "@/redux/slices/auth";
import { SinglePostType } from "@/types/types";
import { useFetchSingleUser } from "@/services/swr/user";

const Profile = () => {
  const { data } = useAppSelector(selectAuth);
  const { data: userData } = useFetchSingleUser(data?.user?.id);

  return (
    <Container maxW="6xl" mx="auto">
      <Flex justify="space-between">
        <Box py="62px" px="20px" w="full">
          <Flex alignItems="center" gap="2" mb="40px">
            <Avatar
              name={`${data?.user.firstName} ${data?.user.lastName}`}
              size={{ base: "md", lg: "lg" }}
            />
            <Text fontSize={{ base: "36px", md: "48px"}} fontWeight={"bold"}>
              {`${data?.user.firstName} ${data?.user.lastName}`}
            </Text>
          </Flex>
          <Tabs isFitted>
            <TabList mx="8">
              <Tab fontSize={"lg"} fontWeight={"bold"}>
                Home
              </Tab>
              <Tab fontSize={"lg"} fontWeight={"bold"}>
                About
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
                    {userData?.posts?.map((post: SinglePostType) => {
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
                    {userData?.posts?.map((post: SinglePostType) => {
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
            </TabPanels>
          </Tabs>
        </Box>
        <Flex display={{ base: "none", lg: "block" }}>
          <Following />
        </Flex>
      </Flex>
    </Container>
  );
};

export default Profile;
