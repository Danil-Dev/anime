'use client'
import React from "react";
import {Box, Container, Flex, Grid, GridItem, Heading, HStack, Link, Spacer, Text} from "@chakra-ui/layout";
import NextLink from "next/link";
import Image from "next/image";
import {navLinks} from "@/routing";
import {Button} from "@chakra-ui/react";
import {usePathname} from "next/navigation";
import {useSession} from "next-auth/react";

export default function Footer() {

    const pathname = usePathname()

    const session = useSession()
    return (
        <Box as={'footer'} mt={'70px'}>
            <Box
                borderTop="1px solid"
                borderColor="backgroundOutline"
                bg="background"
                backdropFilter="blur(60px)"
                py="80px"
                px={{base: 0, md: '30px'}}
            >
                <Container maxW={'container.xl'}>
                  <Box position={'relative'}>
                    <Grid
                      templateColumns={{base:'1fr', md:'2fr 1fr 1fr'}}
                      width={{base:'100%', md: '70%'}}
                      gap={{base: 10, md: 0}}

                    >
                      <GridItem justifySelf={{base:'center', md: 'flex-start'}}>
                        <Flex alignItems={'center'} gap={2}>
                          <Image src={'/assets/img/logo-v3.png'} alt={'Logo'} width={70} height={70} />
                          <Box>
                            <Heading m={0} fontSize={'34px'}>Aniverse</Heading>
                            <Text m={0} fontSize={'16px'} fontWeight={'bold'}>Аніме українською</Text>
                          </Box>


                        </Flex>

                      </GridItem>

                      <GridItem justifySelf={{base:'center', md: 'flex-start'}} textAlign={{base:'center', md: 'left'}}>
                        <Heading mb={4} fontSize={'24px'}>Меню</Heading>
                        <Box as={'nav'}>
                          <Box
                            as={'li'}
                            mb={2}

                          >
                            <Link as={NextLink} href={'/'}>
                              Головна
                            </Link>
                          </Box>
                          {navLinks.map((link, index) => {
                            const isActive = pathname ==link.path
                            return (
                              <Box
                                as={'li'}
                                key={index}
                                mb={2}

                              >
                                <Link as={NextLink} href={link.path}>
                                  {link.name}
                                </Link>
                              </Box>
                            )
                          })}

                        </Box>
                      </GridItem>
                      <GridItem justifySelf={{base:'center', md: 'flex-start'}} textAlign={{base:'center', md: 'left'}}>
                        <Heading mb={4} fontSize={'24px'}>Користувачу</Heading>
                        <Box as={'nav'}>


                          <Box
                            as={'li'}
                            mb={2}
                          >
                            <Link as={NextLink} href={'/privacy-police'}>
                              Політика Конфіденційності
                            </Link>
                          </Box>
                          <Box
                            as={'li'}
                            mb={2}
                          >
                            <Link as={NextLink} href={'/abuse'}>
                              Правовласниками
                            </Link>
                          </Box>



                        </Box>
                      </GridItem>
                    </Grid>
                    <Box
                      position={'absolute'}
                      bottom={'-80px'}
                      right={'0'}
                      display={{base: 'none', md: 'block'}}
                    >
                      <Image
                        src={'/assets/img/bgImages/footer-girl.png'}
                        alt={'footer image'}
                        width={300}
                        height={400}

                      />
                    </Box>
                    <Box mt={4} position={'absolute'} bottom={'-80px'}>
                      <Text fontSize="14px" color="accentTextLightSecondary">
                        © Всі права захищені - 2024р Aniverse - <a href={'mailto:help@aniverse.com.ua'}>help@aniverse.com.ua</a>
                      </Text>
                    </Box>
                  </Box>


                </Container>


            </Box>
        </Box>
    );
}
