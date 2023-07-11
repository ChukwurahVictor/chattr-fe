'use client';

import Link from 'next/link';
import Card from "@/components/card";

import { useFetchPosts } from "@/services/swr/post";
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator, Text, VStack, StackDivider, Flex } from "@chakra-ui/react";
import CustomSpinner from '@/components/custom-spinner';
import { PostType } from '@/types/types';

const Post = () => {
  const { data, isGenerating } = useFetchPosts();

  return (
    <Flex w="100%">
      <Tabs isFitted>
        <TabList>
          <Tab fontSize={"lg"} fontWeight={"bold"}>
            For You
          </Tab>
          <Tab fontSize={"lg"} fontWeight={"bold"}>
            Following
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
            {isGenerating ? (
              <CustomSpinner />
            ) : (
              <>
                {data?.length > 0 ? (
                  <>
                    {data?.map((post: PostType) => {
                      return (
                        <Link href={`/post/${post.id}`} key={post.id}>
                          <Flex alignItems={'center'}>
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
          </TabPanel>
          <TabPanel>
            {data?.length > 0 ? (
              <>
                {data?.map((post: PostType) => {
                  return (
                    <Link href={`/post/${post.id}`} key={post.id}>
                      <VStack
                        divider={<StackDivider borderColor="black" />}
                        spacing={4}
                        align="stretch"
                      >
                        <Card
                          author={`${post.author.firstName} ${post.author.lastName}`}
                          title={post.title}
                          body={`${post.content.substring(0, 150)}...`}
                          dateTime={post.createdAt}
                          noOfComments={post.comments.length}
                          noOfLikes={post.likes.length}
                          // image={post.image}
                        />
                      </VStack>
                    </Link>
                  );
                })}
              </>
            ) : (
              <Text>No posts</Text>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default Post;
