'use client'
import React, {useRef, useState} from "react";
import {Box, Flex} from "@chakra-ui/layout";
import {Link, Spacer, Text} from "@chakra-ui/react";
import NextLink from "next/link";
import {useParams} from "next/navigation";
import {Minus, Plus} from "react-feather";


interface CatalogFilterProps {
    filter: { id: string, title: string }[]
    title: string,
    type: string,
    defaultIsOpen?: boolean,
    current?: string
}

export default function CatalogFilter({filter, title, type, defaultIsOpen, current}: CatalogFilterProps) {

    const contentRef = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = useState<boolean>(defaultIsOpen)
    const params = useParams()

    console.log(params)
    const toggleOpenFilter = () => {
        console.log('toggle')
        setIsOpen(!isOpen)
    }


    return (
        <Box
            bg={'background'}
            borderRadius={'8px'}
            borderColor={'backgroundOutline'}
            borderWidth={1}
        >
            <Flex
                align={'center'}
                p={'18px 18px 18px 26px'}
                cursor={'pointer'}
                borderColor={'backgroundOutline'}
                borderBottomWidth={isOpen ? 1 : 0}
                onClick={toggleOpenFilter}
                mb={isOpen ? '15px' : '0px'}
            >
                <Text as={'h3'} fontSize={'md'} m={0}>
                    {title}
                </Text>
                <Spacer/>

                {isOpen ? <Minus size={18}/>: <Plus size={18}/>}

            </Flex>
            <Box
                transition={'all .3s ease-in-out'}
                visibility={isOpen ? 'visible' : 'hidden'}
                opacity={isOpen ? 1 : 0}
                height={isOpen ? 37 * filter.length + 35 : 0}
                overflow={'hidden'}
                ref={contentRef}
            >
                {filter.map((item, index) => {

                    const isActive = item.id === Object.values(params)[0]


                    return(
                        <Box
                            key={index}
                            fontSize={'lg'}
                            mb={'6px'}
                        >
                            <Link
                                as={NextLink}
                                href={`/catalog/${type}/${item.id}`}
                                p={'5px 12px 5px 26px'}
                                borderRadius={'5px'}
                                display={'block'}
                                transition={'background-color .2s ease-in-out, color .2s ease-in-out'}
                                color={isActive? 'accentActive' : 'textSecondary'}
                                bg={isActive ? 'accentActionSoft' : 'transparent'}
                                _hover={{
                                    color: 'accentActive',
                                    bg: 'accentActionSoft'
                                }}
                            >{item.title}
                            </Link>
                        </Box>
                    )
                })}
            </Box>

        </Box>
    )
}