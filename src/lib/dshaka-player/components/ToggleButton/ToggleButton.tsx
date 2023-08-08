
import styles from './toggleButton.module.scss'

interface ToggleButtonProps{
    checked: boolean,
    onClick: () => void
}

export function ToggleButton({checked, onClick}: ToggleButtonProps) {



    return(
        <>
            <button aria-checked={checked} className={styles.toggle_btn} onClick={onClick}></button>
        </>
    )
}