'use client'
import {Accordion, AccordionItem, Link, Table, TableContainer, Tbody, Td, Text, Tr} from "@chakra-ui/react";
import {IAnimeData} from "@/services/Anime";
import NextLink from "next/link";

export default function AnimeInfo({anime}: { anime: IAnimeData }) {

    return (
        <>
            <TableContainer>
                <Table variant="simple">
                    <Tbody>
                        <Tr >
                            <Td w={'50%'}>
                                Studio:
                            </Td>
                            <Td textAlign={'right'}>
                                <Link as={NextLink} href={`${anime.studio.link}`}>
                                    {anime.studio.title}
                                </Link>

                            </Td>
                        </Tr>
                        <Tr>
                            <Td w={'50%'}>
                                Audio:
                            </Td>
                            <Td textAlign={'right'}>
                                {anime.audios.map((audio) => (
                                  <Link key={audio.name} as={NextLink} display={'inline-block'} pl={'2'} href={`/catalog/audios/${audio.name}`}>
                                      {audio.title}
                                  </Link>
                                ))}

                            </Td>
                        </Tr>
                        {/*<Tr>*/}
                        {/*    <Td w={'50%'}>*/}
                        {/*        Language:*/}
                        {/*    </Td>*/}
                        {/*    <Td textAlign={'right'}>*/}
                        {/*        English, Ukrainian*/}
                        {/*    </Td>*/}
                        {/*</Tr>*/}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
}
