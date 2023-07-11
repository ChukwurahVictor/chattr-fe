"use client";
// import { useEffect, useState } from "react";
import "@/services/axios/interceptor";
import SideMenu from "@/components/trending-tags";
import Post from "./post/page";
import { useAppSelector } from "@/redux/hooks";
import { selectAuth } from "@/redux/slices/auth";
// import Login from "./login/page";
import { useRouter } from "next/navigation";
import TrendingPosts from "@/components/trending-posts";
import { Container, Flex } from "@chakra-ui/react";

export default function Home() {
  const { data: authData } = useAppSelector(selectAuth);
  // console.log(authData);
  // const token = sessionStorage.getItem("auth-token");
  
  const router = useRouter();
  const goToLogin = () => router.push("/login");

  return (
    <main>
      <Container maxW="6xl" mx="auto">
        {authData ? (
          <Flex justify={'space-around'} mt="12" flexDir={{ base: 'column', md: 'row' }}>
            {/* <div className="flex justify-between mx-auto mt-12"> */}
            <Flex w={{ lg: "70%" }}>
              <Post />
            </Flex>
            <Flex display='block' w={{ base: "100%", lg: "30%" }}>
              <SideMenu />
              <TrendingPosts />
            </Flex>
            {/* </div> */}
          </Flex>
        ) : (
          <>{goToLogin()}</>
        )}
      </Container>
    </main>
  );
}
