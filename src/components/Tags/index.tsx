import {FC} from "react";
import styles from './tags.module.scss'
interface ITags {
    tags: string[],
    size?: 'small' | 'regular' | 'big'
}

export const Tags: FC<ITags> = ({tags, size = 'regular'}) => {

    return(
        <div className={'tags'}>
            {tags.map((value , index)=> (
                <span className={styles.tag} aria-size={size} key={index}>{value}</span>
            ))}
        </div>
    )
}

