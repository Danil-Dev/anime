import styles from './settingsControl.module.scss'
import {useEffect, useRef, useState} from "react";
import {Check, ChevronLeft, ChevronsRight, Image, Settings} from "react-feather";
import {useVideoTracks} from "@/lib/limeplay-core";
import {usePlaybackRate} from "@/components/Player/hooks/usePlaybackRate";

enum SettingsType {
    NONE,
    ALL,
    QUALITY,
    SPEED
}

export function SettingsControl() {
    const settingsRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLDivElement>(null)
    const [menuType, setMenuType] = useState<SettingsType>(SettingsType.NONE)

    const handleOpenSettings = () => {

        console.log('Handle', menuType)
        if (menuType === SettingsType.NONE){
            setMenuType(SettingsType.ALL)
        }
        else{
            setMenuType(SettingsType.NONE)
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {

            if (settingsRef.current && buttonRef.current){
                if(!settingsRef.current.contains(event.target) && !buttonRef.current.contains(event.target)){
                    setMenuType(SettingsType.NONE)
                }

            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchend', handleClickOutside)

        return() =>{
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('touchend', handleClickOutside)
        }
    }, []);


    return (
        <div className={styles.settings}>
            <div ref={settingsRef}>
                <SettingsMenu type={menuType} setMenuType={setMenuType}/>
            </div>


            <div onClick={handleOpenSettings} ref={buttonRef}>
                <button  className={styles.settings_button}><Settings size={24} /></button>
            </div>
        </div>
    )
}

export function SettingsMenu({type, setMenuType}: {type: SettingsType, setMenuType: (type: SettingsType) => void}) {



    const {isAuto, selectedTrack, selectTrack, tracks, setAutoMode} = useVideoTracks({
        clearBufferOnChange: "auto"
    })



    const {currentRate, selectRate} = usePlaybackRate()

    const rateVariants = [0.25, 0.5, 0.75, 1, 1.5, 2]





    if (type === SettingsType.NONE) return null




    return (
        <div className={styles.settings_menu} >
            <div className={type === SettingsType.ALL ? styles.settings_all + ' ' + styles.settings_menu_wrapper : styles.settings_menu_wrapper}>
                {type === SettingsType.ALL && (
                    <>
                        <div className={styles.settings_menu_item} onClick={()=> {setMenuType(SettingsType.QUALITY)}}>

                            <div className={styles.settings_menu_item_icon}><Image size={24}/> </div>
                            <div className={styles.settings_menu_item_label}> Quality</div>
                            <div className={styles.settings_menu_item_content}> Auto</div>
                        </div>

                        <div className={styles.settings_menu_item} onClick={()=> {setMenuType(SettingsType.SPEED)}}>

                            <div className={styles.settings_menu_item_icon}><ChevronsRight size={24}/> </div>
                            <div className={styles.settings_menu_item_label}> Speed</div>
                            <div className={styles.settings_menu_item_content}> x1</div>
                        </div>
                    </>
                )}
                {type === SettingsType.QUALITY && (
                    <>

                        <div className={styles.settings_menu_head} onClick={() => setMenuType(SettingsType.ALL)}>
                            <ChevronLeft size={18}/> Quality
                        </div>

                        {tracks.map((track) =>(
                            <div
                                className={styles.settings_menu_item}
                                key={track.id}
                                onClick={() => selectTrack(track)}
                            >
                                <div className={styles.settings_menu_item_icon}>
                                    {track.id === selectedTrack.id && !isAuto && <Check size={24}/>}
                                </div>
                                <div className={styles.settings_menu_item_label}>{track.height}p</div>

                            </div>
                        ) )}

                        <div className={styles.settings_menu_item}>
                            <div className={styles.settings_menu_item_icon}>
                                {isAuto && <Check size={24}/>}

                            </div>
                            <div className={styles.settings_menu_item_label}> Auto </div>
                        </div>


                    </>
                )}
                {type === SettingsType.SPEED && (
                    <>

                        <div className={styles.settings_menu_head} onClick={() => setMenuType(SettingsType.ALL)}>
                            <ChevronLeft size={18}/> Speed
                        </div>

                        {rateVariants.map((rate, index) =>(
                            <div
                                className={styles.settings_menu_item}
                                key={index}
                                onClick={() => selectRate(rate)}
                            >
                                <div className={styles.settings_menu_item_icon}>
                                    {currentRate === rate && <Check size={24}/>}
                                </div>
                                <div className={styles.settings_menu_item_label}>{rate}</div>

                            </div>
                        ) )}


                    </>
                )}

            </div>
        </div>
    )
}



