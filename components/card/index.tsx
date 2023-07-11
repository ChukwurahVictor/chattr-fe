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
            <Avatar name="John Wick" size="sm" />
            <Text fontWeight={"semibold"}>{author}</Text> {"."}
            <Text>
              {moment(dateTime)
                .fromNow(true)
                .replace("minutes", "hours")}{" "}
              ago
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
        w="150px"
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt="Caffe Latte"
        alignSelf={"center"}
      />
    </Card>
  );
};

export default PostCard

// <div className="container mx-auto">
  //   <div className="flex items-center justify-between max-w-2xl mx-8 my-4 sm:max-w-2xl lg:max-w-3xl">
  //     <div className="flex flex-col justify-between">
  //       <div className="pr-2 mb-8">
  //         <div className="flex items-center gap-2 mb-1">
  //           <Avatar src={FrameTwo.src} size="sm" name="Jonathan Reinink" />
  //           <div className="flex items-center gap-1">
  //             <p className="font-medium leading-none text-gray-900">
  //               {author}
  //             </p>
  //             {" . "}
  //             <p className="text-sm">
  //               {moment(dateTime)
  //                 .fromNow(true)
  //                 .replace("minutes", "hours")}{" "}
  //               ago
  //             </p>
  //           </div>
  //         </div>
  //         <div className="mb-2 base:text-[20px] lg:text-[28px] font-bold text-gray-900">
  //           {title}
  //         </div>
  //         <ReactMarkdown>{body}</ReactMarkdown>
  //       </div>
  //       <div className="flex gap-2 text-sm">
  //         <p>
  //           <FontAwesomeIcon icon={faHeart} /> 5k
  //         </p>
  //         <p>
  //           <FontAwesomeIcon icon={faComment} /> 71
  //         </p>
  //       </div>
  //     </div>
  //     <Image
  //       className="hidden md:block md:w-36 md:h-36"
  //       src={FrameOne.src}
  //       width={50}
  //       height={30}
  //       alt="img"
  //     />
  //   </div>
  // </div>