'use client'
import {Accordion, AccordionItem, Table, TableContainer, Tbody, Td, Text, Tr} from "@chakra-ui/react";
import {IAnimeData} from "@/services/Anime";

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
                                Bind
                            </Td>
                        </Tr>
                        <Tr>
                            <Td w={'50%'}>
                                Audio:
                            </Td>
                            <Td textAlign={'right'}>
                                Amanogawa, Amanogawa, Amanogawa

                            </Td>
                        </Tr>
                        <Tr>
                            <Td w={'50%'}>
                                Language:
                            </Td>
                            <Td textAlign={'right'}>
                                English, Ukrainian
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
}
