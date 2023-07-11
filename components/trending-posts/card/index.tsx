import { Avatar, Button, Card, CardBody, CardFooter, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";

interface PropType {
  title: string;
}

const TrendingCard = ({ title }: PropType) => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      shadow={"none"}
      // borderBottom={'1px solid gray'}
      // variant="outline"
    >
      <Stack>
        <CardBody>
          <Flex alignItems={"center"} gap="2">
            <Avatar name="John Wick" size="sm" />
            <Text fontWeight={'semibold'}>John Wick</Text> {"."}
            <Text>2 hours ago </Text>
          </Flex>
          <Heading size="md" mt="2">
            { title }
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
}

export default TrendingCard

    // <div className="flex flex-col justify-between p-4">
    //   <div>
    //     <div className="flex items-center gap-2 mb-1">
    //       <Avatar size="sm" name="Jonathan Wick" />
    //       <div className="text-sm">
    //         <p className="leading-none text-gray-900">John Wick</p>
    //       </div>
    //     </div>
    //     <div className="mb-2 text-lg font-bold text-gray-900">{title}</div>
    //   </div>
    //   <div className="flex items-center justify-between gap-1 text-sm">
    //     <p className="leading-none text-gray-900">
    //       June-02
    //     </p>
    //     <div className="flex gap-2">
    //       <p>
    //         <FontAwesomeIcon icon={faHeart} />{" "}
    //         5k
    //       </p>
    //       <p>
    //         <FontAwesomeIcon icon={faComment} />{" "}
    //         71
    //       </p>
    //     </div>
    //   </div>
    // </div>