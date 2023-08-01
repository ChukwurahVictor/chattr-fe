import { Avatar, Button, Card, CardBody, CardFooter, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";

interface PropType {
  name: string;
  title: string;
  dateTime: string;
}

const TrendingCard = ({ name, title, dateTime }: PropType) => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      shadow={"none"}
    >
      <Stack>
        <CardBody>
          <Flex alignItems={"center"} gap="2">
            <Avatar name={name} size="sm" />
            <Text fontWeight={"semibold"}>{name}</Text> {"."}
            <Text fontSize={".9rem"}>{dateTime} </Text>
          </Flex>
          <Heading size="md" mt="2">
            {title}
          </Heading>
          <Flex gap="2" mt="4">
            <Text>
              <FontAwesomeIcon icon={faHeart} /> 5k
            </Text>
            <Text>
              <FontAwesomeIcon icon={faComment} /> 71
            </Text>
          </Flex>
        </CardBody>
      </Stack>
    </Card>
  );
};

export default TrendingCard
