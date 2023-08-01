import { Flex, Stack, StackDivider, Text } from '@chakra-ui/react';
import TrendingCard from "./card";

const TrendingPosts = () => {
  return (
    <Stack divider={<StackDivider borderColor="black" />} spacing="4" mt="12">
      <Flex direction={"column"} gap="2">
        <Text fontSize={"2xl"} fontWeight={"bold"}>
          Trending Posts
        </Text>
        <TrendingCard
          title={"One year as a software developer at Microsoft"}
          name={"John Wick"}
          dateTime="2 hours ago"
        />
        <TrendingCard
          title={"The Best Day of my life"}
          name={"Fermin Lopez"}
          dateTime="a month ago"
        />
        <TrendingCard
          title={"I must retire early!"}
          name={"Ghost Writer"}
          dateTime="2 months ago"
        />
      </Flex>
    </Stack>
  );
}

export default TrendingPosts