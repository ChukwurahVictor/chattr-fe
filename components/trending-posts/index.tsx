import { Flex, Stack, StackDivider, Text } from '@chakra-ui/react';
import TrendingCard from "./card";

const TrendingPosts = () => {
  return (
    <Stack divider={<StackDivider borderColor="black" />} spacing="4" mt="12">
      <Flex direction={"column"} gap="2">
        <Text fontSize={"2xl"} fontWeight={"bold"}>
          Trending Posts
        </Text>
        <TrendingCard title={"One year as a software developer at Microsoft"} />
        <TrendingCard title={"One year as a software developer at Microsoft"} />
        <TrendingCard title={"One year as a software developer at Microsoft"} />
      </Flex>
    </Stack>
  );
}

export default TrendingPosts