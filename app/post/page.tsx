'use client';

import Link from 'next/link';
import Card from "@/components/card";

import { useFetchPosts } from "@/services/swr/post";
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator, Text, VStack, StackDivider } from "@chakra-ui/react";
import CustomSpinner from '@/components/custom-spinner';

interface PostType {
    id: number;
    title: string;
    content: string;
    author: {
        firstName: string;
        lastName: string;
    },
    createdAt: string;
}


const Post = () => {
  const { data, isGenerating } = useFetchPosts();

  return (
    <div className="w-[100%]">
      <Tabs>
        <TabList px="8">
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
            {isGenerating ? <CustomSpinner /> : 
            <>
              {data?.length > 0 ? (
                <>
                  {data?.map((post: PostType) => {
                    return (
                        <Link href={`/post/${post.id}`} key={post.id}>
                          <Card
                            author={`${post.author.firstName} ${post.author.lastName}`}
                            title={post.title}
                            body={post.content}
                            dateTime={post?.createdAt}
                          />
                        </Link>
                    
                        );
                      })}
                  </>
              ) : (
              <Text>No posts</Text>
              )}
            </>
            }
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
                          body={post.content}
                          dateTime={post.createdAt}
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
    </div>
  );
};

export default Post;
