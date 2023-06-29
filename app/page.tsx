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

export default function Home() {
  const { data: authData } = useAppSelector(selectAuth);
  // console.log(authData);
  // const token = sessionStorage.getItem("auth-token");
  
  const router = useRouter();
  const goToLogin = () => router.push("/login");

  return (
    <main className="container max-w-6xl mx-auto">
      {authData ? (
        <div className="flex justify-between mx-auto mt-12">
          <div className="w-full lg:w-[70%]">
            <Post />
          </div>
          <div className="hidden w-[30%] lg:block">
            <SideMenu />
            <TrendingPosts />
          </div>
        </div>
      ) : (
        <>{goToLogin()}</>
      )}
    </main>
  );
}
