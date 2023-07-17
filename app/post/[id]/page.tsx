'use client'

import CustomSpinner from "@/components/custom-spinner";
import { useAppSelector } from "@/redux/hooks";
import { selectAuth } from "@/redux/slices/auth";
import { useFetchSinglePost } from "@/services/swr/post";
import { Avatar, Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Input, Text, Textarea, useDisclosure } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faHeart,
  faComment,
} from "@fortawesome/free-regular-svg-icons";
import { usePathname, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"
import { useFetchFollowing } from "@/services/swr/follows";
import useAxios from "@/hooks/use-axios";
import urls from "@/services/axios/urls";
import { toast } from "react-hot-toast";
import Tag from "@/components/pill";
import { useRef, useState } from "react";
import { kFormatter } from "@/utils/likeFormatter";
import moment from "moment";

const SinglePost = () => {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname!.replace("/post/", "");
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<any>()

  const { makeRequest } = useAxios();

  const { isLoggedIn, data: userData } = useAppSelector(selectAuth);

  const { data, isGenerating } = useFetchSinglePost(id);
  const { data: followingData, mutate } = useFetchFollowing(userData?.user.id);
  const [commentBody, setCommentBody] = useState("");

  const handleInputChange = (e: any) => {
    let inputValue = e.target.value;
    setCommentBody(inputValue);
  };

  const handleFollow = async (authorId: string) => {
    console.log('Trying to follow an author');

    const { data: resData, status, error } = await makeRequest({
      payload: { followerId: userData?.user.id, followingId: authorId },
      method: "post",
      url: urls.followsUrl,
    });

    if (status === "error")
      return toast.error(String(error) || "An error occurred");

    toast.success("Author followed successfully.");
    mutate();
  }

  const handleUnFollow = () => {
    console.log('Unfollowing author');
  }
  
  return (
    <Box
      maxW="3xl"
      mx="auto"
      px="20px"
      mt="4"
      h="400px"
      borderRadius="lg"
      overflow="hidden"
      alignItems={"center"}
    >
      <Flex justify="space-between">
        <Button borderRadius="5px" p="10px 15px" onClick={() => router.back()}>
          Go back
        </Button>
        {isLoggedIn && userData?.user.id === data?.author.id ? (
          <Flex
            as={Button}
            gap={2}
            sx={{ cursor: "pointer" }}
            onClick={() => router.push(`/post/${data?.id}/edit`)}
          >
            <Text>Edit</Text>
            <FontAwesomeIcon icon={faPenToSquare} />
          </Flex>
        ) : null}
      </Flex>
      {isGenerating ? (
        <CustomSpinner />
      ) : (
        <>
          <Flex flexDir={"column"} alignItems={"center"}>
            <Text fontSize={{ base: "24px", lg: "32px" }} fontWeight="bold">
              {data?.title}
            </Text>
            <Flex alignItems={"center"} gap="2" mt="4">
              <Avatar
                size={"sm"}
                name={`${data?.author.firstName} ${data?.author.lastName}`}
              />
              <Text
                fontWeight={"semibold"}
                sx={{ cursor: "pointer" }}
                onClick={() => router.push(`/author/${data?.author.id}`)}
              >
                {data?.author.firstName} {data?.author.lastName}
              </Text>
              {isLoggedIn && userData?.user.id !== data?.author.id ? (
                <>
                  {followingData?.length > 0 ? (
                    <>
                      {followingData?.map((following: any) => {
                        return (
                          <Box key={following.id}>
                            {following?.id !== data?.author.id ? (
                              <>
                                <Text
                                  color="#6c63ff"
                                  fontSize={"sm"}
                                  sx={{ cursor: "pointer" }}
                                  onClick={() => handleFollow(data?.author.id)}
                                >
                                  follow
                                </Text>
                              </>
                            ) : (
                              <Text
                                color="#6c63ff"
                                fontSize={"sm"}
                                sx={{ cursor: "pointer" }}
                                onClick={() => handleUnFollow()}
                              >
                                unfollow
                              </Text>
                            )}
                          </Box>
                        );
                      })}{" "}
                    </>
                  ) : (
                    <Text
                      color="#6c63ff"
                      fontSize={"sm"}
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleFollow(data?.author.id)}
                    >
                      follow
                    </Text>
                  )}
                </>
              ) : null}
            </Flex>
          </Flex>
          <Divider
            border="0.2px solid #9D9D9D"
            w="5xl"
            alignItems="center"
            my="50px"
          />
          <Box mb="40px">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {data?.content}
            </ReactMarkdown>
          </Box>
          <Flex justify="space-between" alignItems="center">
            <Flex gap="2" alignItems="center">
              <Text>
                <FontAwesomeIcon icon={faHeart} /> {0}
              </Text>
              <Text
                sx={{ cursor: "pointer" }}
                ref={btnRef}
                colorScheme="teal"
                onClick={onOpen}
              >
                <FontAwesomeIcon icon={faComment} /> {data?.comments.length}
              </Text>
            </Flex>
            <Box sx={{ cursor: "pointer" }} gap="4">
              <Tag name="Politics" /> <Tag name="Education" />{" "}
              <Tag name="Science" />
            </Box>
            <Drawer
              isOpen={isOpen}
              placement="right"
              size="sm"
              onClose={onClose}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Comments</DrawerHeader>

                <DrawerBody>
                  <Flex alignItems={"center"} gap="2" my="4">
                    <Avatar
                      size={"sm"}
                      name={`${userData?.user.firstName} ${userData?.user.lastName}`}
                    />
                    <Text fontWeight={"semibold"}>
                      {userData?.user.firstName} {userData?.user.lastName}
                    </Text>
                  </Flex>
                  <Textarea
                    value={commentBody}
                    onChange={handleInputChange}
                    placeholder="Write your comment..."
                    size="sm"
                  />
                  <Flex mt="4" justify="end">
                    <Button colorScheme="purple" borderRadius="full">
                      Comment
                    </Button>
                  </Flex>
                  <Divider
                    border="0.2px solid #9D9D9D"
                    alignItems="center"
                    my="50px"
                  />
                  <Box>
                    { data?.comments.length > 0 ? (
                    <>
                      {data?.comments.map((comment: any) => {
                        return (
                          <>
                            <Box>
                              <Flex alignItems={"center"} gap="2" my="4">
                                <Avatar
                                  size={"sm"}
                                  name={`${comment?.user.firstName} ${comment?.user.lastName}`}
                                />
                                <Flex flexDir="column">
                                  <Text fontWeight={"semibold"}>
                                    {comment?.user.firstName}{" "}
                                    {comment?.user.lastName}
                                  </Text>
                                  <Text>
                                    {moment(comment.createdAt)
                                      .fromNow(true)
                                      .replace("minutes", "hours")}{" "}
                                    ago
                                  </Text>
                                </Flex>
                              </Flex>
                              <Text>{comment.body}</Text>
                            </Box>
                          </>
                        );
                      })}
                    </>
                      ) : 
                      <Text>No comments</Text>
                    } 
                  </Box>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Flex>
        </>
      )}
    </Box>
  );
};
  
export default SinglePost;
