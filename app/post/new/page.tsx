"use client";

import { Box, Input , Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useAxios from "@/hooks/use-axios";
import urls from "@/services/axios/urls";
import { useAppSelector } from "@/redux/hooks";
import { selectAuth } from "@/redux/slices/auth";
import MdEditor from "react-markdown-editor-lite";
const MarkdownIt = require("markdown-it");
import { toast } from "react-hot-toast";

import "react-markdown-editor-lite/lib/index.css";

const NewPost = () => {
  const router = useRouter();
  const [content, setContent] = useState<any>();
  const [title, setTitle] = useState("");

  const { loading, makeRequest } = useAxios();
  const { data: user } = useAppSelector(selectAuth);

  const mdParser = new MarkdownIt(/* Markdown-it options */);

  function handleEditorChange({ html, text }: any) {
    console.log("handleEditorChange", html, text);
    setContent(text);
  }

  const submit = async () => {
    // if (content !== "" && title !== "") return;

    const { data, status, error } = await makeRequest({
      payload: {
        title: title,
        content: content,
        authorId: user.user.id,
        image: "https://www.npmjs.com//",
      },
      method: "post",
      url: urls.fetchPostsUrl,
    });

    if (status === "error")
      return toast.error(String(error) || "An error occurred")

    toast.success("Post created successfully.");
    router.push("/");
  }

  return (
    <Box
      maxW="2xl"
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
        <Button
          borderRadius="5px"
          p="10px 15px"
          bg="#6c63ff"
          color="#fff"
          // disabled={ !content || !title }
          onClick={() => {
            submit();
          }}
        >
          Publish
        </Button>
      </Flex>
      <Input
        placeholder="Article title here..."
        variant="unstyled"
        fontSize={{ base: "36px", lg: "48px" }}
        fontWeight="bold"
        size="lg"
        focusBorderColor="none"
        _placeholder={{
          fontSize: { base: "36", lg: "48" },
          fontWeight: "bold",
          color: "gray.400",
        }}
        m="4"
        py="8"
        onChange={e => setTitle(e.target.value)}
      />
      <MdEditor
        style={{ height: "700px" }}
        renderHTML={text => mdParser.render(text)}
        onChange={handleEditorChange}
        view={{ menu: true, md: true, html: false }}
        placeholder=" | Write an Article..."
      />
    </Box>
  );
  }
  
  export default NewPost