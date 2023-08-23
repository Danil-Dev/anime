'use client';
import { Table, TableContainer, Tbody, Td, Tr } from "@chakra-ui/react";
export default function AnimeInfo({ anime }) {
    return (<>
            <TableContainer>
                <Table variant="simple">
                    <Tbody>
                        <Tr>
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
        </>);
}
