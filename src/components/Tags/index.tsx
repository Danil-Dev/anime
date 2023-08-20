import {FC} from "react";
import styles from './tags.module.scss'
import {HStack} from "@chakra-ui/layout";
import {Tag} from "@chakra-ui/tag";
interface ITags {
    tags: string[],
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
                    size={'lg'}
                >{value}</Tag>
            ))}
        </HStack>
    )
}

