'use client'

import CustomSpinner from "@/components/custom-spinner";
import { useAppSelector } from "@/redux/hooks";
import { selectAuth } from "@/redux/slices/auth";
import { useFetchSinglePost } from "@/services/swr/post";
import { Avatar, Box, Button, Divider, Flex, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { usePathname, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"
import { useFetchFollowing } from "@/services/swr/follows";
import useAxios from "@/hooks/use-axios";
import urls from "@/services/axios/urls";
import { toast } from "react-hot-toast";

const SinglePost = () => {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname!.replace("/post/", "");

  const { makeRequest } = useAxios();

  const { isLoggedIn, data: userData } = useAppSelector(selectAuth);

  const { data, isGenerating } = useFetchSinglePost(id);
  const { data: followingData, mutate } = useFetchFollowing(userData?.user.id);

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
                          <>
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
                          </>
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
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {data?.content}
          </ReactMarkdown>
        </>
      )}
    </Box>
  );
};
  
export default SinglePost;
