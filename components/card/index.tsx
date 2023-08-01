'use client';

import React from 'react'
import { Avatar, Card, CardBody, CardFooter, Heading, Stack, Text, Image, Flex } from '@chakra-ui/react';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";
import  { kFormatter } from "@/utils/likeFormatter";
// import Image from 'next/image'

interface PropType {
  author: string,
  title: string,
  body: string,
  dateTime: string,
  noOfComments: number,
  noOfLikes: number,
  // image: string,
}


const PostCard = ({
  author,
  title,
  body,
  dateTime,
  noOfComments,
  noOfLikes,
}: PropType) => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      shadow={"none"}
      px="1rem"
      // borderBottom={'1px solid gray'}
      // variant="outline"
      mt="2rem"
    >
      <Stack>
        <CardBody>
          <Flex alignItems={"center"} gap="2">
            <Avatar name={author} size="sm" />
            <Text fontWeight={"semibold"}>{author}</Text> {" . "}
            <Text fontSize={{ base: ".9rem" }}>
              {moment(dateTime).fromNow()}
            </Text>
          </Flex>
          <Heading size="md" mt="2">
            {title}
          </Heading>

          <Text py="2">
            <ReactMarkdown>{body}</ReactMarkdown>
          </Text>
        </CardBody>
        <CardFooter>
          <Flex gap="2">
            <Text>
              <FontAwesomeIcon icon={faHeart} /> {kFormatter(noOfLikes)}
            </Text>
            <Text>
              <FontAwesomeIcon icon={faComment} /> {noOfComments}
            </Text>
          </Flex>
        </CardFooter>
      </Stack>
      <Image
        objectFit="cover"
        // maxW={{ base: "100%", sm: "200px" }}
        h="150px"
        w={{ base: "250px", sm: "150px" }}
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt="Caffe Latte"
        alignSelf={"center"}
        paddingBottom={{ base: "10px", md: "none" }}
      />
    </Card>
  );
};

export default PostCard
