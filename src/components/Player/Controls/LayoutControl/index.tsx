import styles from './layoutControl.module.scss'
import {Layout} from "react-feather";
import {usePlayerLayoutType, useTogglePlayerLayout} from "@/store/application/hooks";
import {useRef} from "react";

export function LayoutControl () {

    const toggleLayoutType = useTogglePlayerLayout()
    const type = usePlayerLayoutType()


    return(
        <div className={styles.layout} onClick={toggleLayoutType}>
            <button className={styles.layout_button}>
                <Layout size={24}/>
            </button>
        </div>
    )
}