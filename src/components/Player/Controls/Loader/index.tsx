import {useLoading} from "@/lib/limeplay-core";
import styles from './loader.module.scss'

export function PlayerLoader () {
    const {isLoading} = useLoading()
    return isLoading ? <div className={styles.loader}></div> : null
}