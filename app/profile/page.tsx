"use client"

import Link from "next/link";
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
} from "@chakra-ui/react";
import Following from "@/components/following";
import { useAppSelector } from "@/redux/hooks";
import { selectAuth } from "@/redux/slices/auth";

const Profile = () => {
  const { data } = useAppSelector(selectAuth);
  console.log(data);

  return (
    <div className="container max-w-6xl mx-auto">
      <div className="flex justify-between">
        <div className="py-[62px] px-[20px]">
          {/* <div className="flex flex-col max-w-2xl mx-8 my-4 sm:max-w-2xl lg:max-w-6xl"> */}
          <div className="flex items-center gap-2 mb-[40px]">
            <Avatar
              name={`${data?.user.firstName} ${data?.user.lastName}`}
              size={{ base: "md", lg: "lg" }}
            />
            <Text fontSize={"48px"} fontWeight={"bold"}>
              {`${data?.user.firstName} ${data?.user.lastName}`}
            </Text>
          </div>
          <Tabs>
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
                One
                {/* {data?.map((post: PostType) => {
                  return ( */}
                {/* <Link href={`/post/${post.id}`} key={post.id}>
                  <Card
                    author={`${post.author.firstName} ${post.author.lastName}`}
                    title={post.title}
                    body={post.content}
                  />
                </Link> */}
                {/* );
                })} */}
              </TabPanel>
              <TabPanel>
                {/* <Card /> */}
                Two
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

export default Profile;
