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
} from "@chakra-ui/react";

import Card from "@/components/card";
import Following from "@/components/following";
// import Link from "next/link";

const Library = () => {
  const { data } = useAppSelector(selectAuth);
  const { data: userData } = useFetchSingleUser(+data?.user?.id);
  // console.log(userData);
  
  return (
    <div className="container max-w-6xl mx-auto">
      <div className="flex justify-between">
        <div className="py-[62px] px-[20px]">
          <div className="flex items-center gap-2 mb-[40px]">
            <Text fontSize={"48px"} fontWeight={"bold"}>
              Your Library
            </Text>
          </div>
          <Tabs>
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
                    {userData?.posts?.map((post: any) => {
                      return (
                        <Card
                          author={ `${post.author?.firstName} ${post.author?.lastName}`}
                          title={post.title}
                          body={post.content}
                          dateTime={post.createdAt}
                        />
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
                    {userData?.posts?.map((post: any) => {
                      return (
                        <Card
                          author={"John Wick"}
                          title={post.title}
                          body={post.content}
                          dateTime={post.createdAt}
                        />
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
        <div className="hidden lg:block">
          <Following />
        </div>
      </div>
    </div>
  );
};

export default Library;