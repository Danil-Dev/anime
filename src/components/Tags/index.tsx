import {FC} from "react";
import styles from './tags.module.scss'
interface ITags {
    tags: string[]
}

export const Tags: FC<ITags> = ({tags}) => {

    return(
        <div className={'tags'}>
            {tags.map((value , index)=> (
                <span className={styles.tag} key={index}>{value}</span>
            ))}
        </div>
    )
}

