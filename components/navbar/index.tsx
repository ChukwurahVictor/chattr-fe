"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Container,
  Text,
} from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutDispatch, selectAuth } from "@/redux/slices/auth";


const Navbar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isLoggedIn, data } = useAppSelector(selectAuth);

  const handleLogout = () => {
    sessionStorage.removeItem("auth-token");
    dispatch(logoutDispatch());

    router.push("/login");
  };

  return (
    <>
      <Box bg="white" px={4} w="full">
        <Container mx="auto" maxW="8xl">
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <HStack spacing={8} alignItems={"center"}>
              <Box fontSize="2xl" fontWeight="bold">
                <Link href="/" style={{ textDecoration: "none" }}>
                  Chattr
                </Link>
              </Box>
            </HStack>

            <Flex alignItems={"center"}>
              {isLoggedIn ? (
                <Flex gap="2" alignItems="center">
                  <Link href="/post/new" style={{ textDecoration: "none" }}>
                    <FontAwesomeIcon icon={faPenToSquare} /> {" "}
                    Write
                  </Link>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={"full"}
                      variant={"link"}
                      cursor={"pointer"}
                      minW={0}
                    >
                      <Avatar size={"sm"} name={data?.user.displayName} />
                    </MenuButton>
                    <MenuList>
                      <MenuItem>
                        <Link
                          href="/profile"
                          style={{ textDecoration: "none" }}
                        >
                          Profile
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link
                          href="/library"
                          style={{ textDecoration: "none" }}
                        >
                          Library
                        </Link>
                      </MenuItem>
                      <MenuDivider />
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              ) : (
                <Flex fontSize="16px" gap="2" alignItems="center">
                  <Button
                    border="1px solid indigo"
                    bg="#F1FAFF"
                    color="indigo.500"
                    borderRadius="5px"
                    p="10px 15px"
                  >
                    <Link href="/login" style={{ textDecoration: "none" }}>
                      <Text>Login</Text>
                    </Link>
                  </Button>
                  <Button
                    // bg="indigo"
                    // color="white"
                    borderRadius="5px"
                    p="10px 15px"
                  >
                    <Link href="/signup" style={{ textDecoration: "none" }}>
                      <Text>Register</Text>
                    </Link>
                  </Button>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default Navbar;
