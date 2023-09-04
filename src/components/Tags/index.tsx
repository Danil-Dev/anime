import {FC} from "react";
import styles from './tags.module.scss'
import {HStack} from "@chakra-ui/layout";
import {Tag} from "@chakra-ui/tag";
import {Genre} from "@/services/Anime";
interface ITags {
    tags: Genre[],
    size?: 'small' | 'regular' | 'big'
}

export const Tags: FC<ITags> = ({tags, size = 'regular'}) => {

    return(
        <HStack spacing={4}>
            {tags.map((value , index)=> (
                <Tag
                    key={index}
                    bg={'textYellow'}
                    color={'black'}
                    size={'md'}
                >{value.title}</Tag>
            ))}
        </HStack>
    )
}

