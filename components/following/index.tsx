'use client';

import { useAppSelector } from '@/redux/hooks';
import { selectAuth } from '@/redux/slices/auth';
import { useFetchSingleUser } from '@/services/swr/user';
import { Avatar, Divider, Flex, Stack, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';

const Following = () => {
  const { data } = useAppSelector(selectAuth);
  const { data: userData } = useFetchSingleUser(data?.user?.id);

  return (
    <Stack direction="row" h="100dvh" p={4}>
      <Divider orientation="vertical" border="0.2px solid #9D9D9D" />
      <Flex direction="column" gap={"5"}>
        <Tabs isFitted>
          <TabList mx="8">
            <Tab fontSize={"lg"} fontWeight={"bold"}>
              <Flex gap="2">
                <Text>Followers</Text>
                <Text bg="lightgray" borderRadius="full" px="2">
                  {userData?.followedBy.length}
                </Text>
              </Flex>
            </Tab>
            <Tab fontSize={"lg"} fontWeight={"bold"}>
              <Flex gap="2">
                <Text>Following</Text>
                <Text bg="lightgray" borderRadius="full" px="2">
                  {userData?.following.length}
                </Text>
              </Flex>
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
              {userData?.followedBy.length > 0 ? (
                <>
                  {userData?.followedBy?.map((followers: any) => {
                    return (
                      <Flex gap={"2"} key={followers.id}>
                        <Avatar size={"sm"} name="Victor Chukwurah" />
                        <Text>{followers.firstName}</Text>
                      </Flex>
                    );
                  })}
                </>
              ) : (
                <Text>No followers</Text>
              )}
            </TabPanel>
            <TabPanel>
              {userData?.following.length > 0 ? (
                <>
                  {userData?.following?.map((following: any) => {
                    return (
                      <Flex gap={"2"} key={following.id}>
                        <Avatar
                          size={"sm"}
                          name={`${following.firstName} ${following.lastName}`}
                        />
                        <Text>{following.firstName}</Text>
                      </Flex>
                    );
                  })}
                </>
              ) : (
                <Text>Not following anyone yet</Text>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Stack>
  );
}

export default Following