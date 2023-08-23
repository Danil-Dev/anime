import React from "react";
import { Box, Flex, HStack, Link, Spacer, Text } from "@chakra-ui/layout";
import NextLink from "next/link";

export default function Footer() {
    return (
        <footer>
            <Box
                borderTop="1px solid"
                borderColor="backgroundOutline"
                bg="background"
                backdropFilter="blur(60px)"
                py="20px"
                px="30px"
            >
                <Flex alignItems="center">
                    <HStack spacing={8} fontWeight={300} fontSize="14px" fontStyle="italic" mb="12px">
                        <Link as={NextLink} href="/">
                            Faq
                        </Link>
                        <Link as={NextLink} href="/">
                            About
                        </Link>
                        <Link as={NextLink} href="/">
                            Privacy Policy
                        </Link>
                        <Link as={NextLink} href="/">
                            Contact Us
                        </Link>
                    </HStack>

                    <Spacer />
                    <HStack
                        display={{ base: "none", md: "flex" }}
                        spacing={5}>
                        <Link as={NextLink} href="/" fontStyle="italic" fontSize="14px">
                            Здесь будут ссылки на соц сети
                        </Link>
                    </HStack>

                </Flex>
                <Box
                    display={{ base: "flex", md: "none" }}
                    mb={5}>
                    <Link as={NextLink} href="/" fontStyle="italic" fontSize="14px">
                        Здесь будут ссылки на соц сети
                    </Link>
                </Box>

                <Text fontSize="14px" color="accentTextLightSecondary">
                    © 2023 Aniverse - danilmarc4uk.grf@gmail.com
                </Text>
            </Box>
        </footer>
    );
}
