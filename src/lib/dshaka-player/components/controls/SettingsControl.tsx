import {useEffect, useRef, useState} from "react";
import styles from './controls.module.scss'
import {Settings, Image, ChevronsRight, ChevronLeft, Check} from "react-feather";
import {useVideoTracks} from "@/lib/dshaka-player/hooks/useVideoTracks";
import {useAppDispatch} from "@/store/hooks";
import {updateSpeed, updateTrack} from "@/store/player/reducer";
import {usePlaybackRate} from "@/lib/dshaka-player/hooks/usePlaybackRate";
enum SettingsType {
    NONE,
    ALL,
    QUALITY,
    SPEED
}

export function SettingsControl(){

    const [menuType, setMenuType] = useState<SettingsType>(SettingsType.NONE)
    const settingRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLDivElement>(null)
    const handleOpenSettings = () => {

        if (menuType === SettingsType.NONE){
            setMenuType(SettingsType.ALL)
        }
        else{
            setMenuType(SettingsType.NONE)
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (settingRef.current && buttonRef.current){
                if (!settingRef.current.contains(event.target) && !buttonRef.current.contains(event.target)){
                    setMenuType(SettingsType.NONE)
                }
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('touchend', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('touchend', handleClickOutside)
        }
    }, []);
    return (
        <div className={styles.control_settings}>
            <div ref={settingRef}>
                <SettingsMenu type={menuType} setMenuType={setMenuType}/>
            </div>
            <div onClick={handleOpenSettings} ref={buttonRef}>
                <button className={styles.control_settings_button}><Settings size={24}/></button>
            </div>
        </div>
    )
}

export function SettingsMenu({type, setMenuType}: {type: SettingsType, setMenuType: (type: SettingsType) => void}){

    const dispatch = useAppDispatch()
    const {isAuto, selectedTrack, tracks, selectTrack} = useVideoTracks({
        onSelect: (selectedTrack) => {

            dispatch(updateTrack(selectedTrack.height))
        }
    })
    const {currentRate, selectRate} = usePlaybackRate({
        onSelect: (selectedRate) => {
            dispatch(updateSpeed(selectedRate))
        }
    })



    const rateVariants = [0.25, 0.5, 0.75, 1, 1.5, 2]

    const handleSelectTrack = (track: shaka.extern.Track) => {
        selectTrack(track)
        setMenuType(SettingsType.NONE)
    }
    const handleSelectRate = (rate: number) => {
        selectRate(rate)
        setMenuType(SettingsType.NONE)
    }






    if (type === SettingsType.NONE) return null


    return (
        <div className={styles.control_settings_menu}>
            <div className={type == SettingsType.ALL ? styles.control_settings_all + ' ' + styles.control_settings_menu_wrapper : styles.control_settings_menu_wrapper}>
                {type === SettingsType.ALL && (
                    <>
                        <div className={styles.control_settings_menu_item} onClick={() => {setMenuType(SettingsType.QUALITY)}}>
                            <div className={styles.control_settings_menu_item_icon}><Image size={24}/> </div>
                            <div className={styles.control_settings_menu_item_label}>Quality</div>
                            <div className={styles.control_settings_menu_item_content}>{isAuto ? 'Auto' : selectedTrack.height + 'p'}</div>
                        </div>
                        <div className={styles.control_settings_menu_item} onClick={() => {setMenuType(SettingsType.SPEED)}}>
                            <div className={styles.control_settings_menu_item_icon}><ChevronsRight size={24}/> </div>
                            <div className={styles.control_settings_menu_item_label}>Speed</div>
                            <div className={styles.control_settings_menu_item_content}>x{currentRate}</div>
                        </div>
                    </>
                )}
                {type === SettingsType.QUALITY && (
                    <>
                        <div className={styles.control_settings_menu_head} onClick={() => setMenuType(SettingsType.ALL)}>
                            <ChevronLeft size={18}/> Quality
                        </div>
                        {tracks.map((track) => (
                            <div
                                className={styles.control_settings_menu_item}
                                key={track.id}
                                onClick={() => handleSelectTrack(track)}
                            >
                                <div className={styles.control_settings_menu_item_icon}>
                                    {track.id === selectedTrack.id && !isAuto && <Check size={24}/>}
                                </div>
                                <div className={styles.control_settings_menu_item_label}>{track.height}p</div>

                            </div>
                        ))}
                        <div className={styles.control_settings_menu_item}>
                            <div className={styles.control_settings_menu_item_icon}>
                                {isAuto && <Check size={24}/>}
                            </div>
                            <div className={styles.control_settings_menu_item_label}> Auto</div>
                        </div>
                    </>
                )}
                {type === SettingsType.SPEED && (
                    <>
                        <div className={styles.control_settings_menu_head} onClick={() => setMenuType(SettingsType.ALL)}>
                            <ChevronLeft size={18}/> Rate
                        </div>
                        {rateVariants.map((rate, index) => (
                            <div
                                className={styles.control_settings_menu_item}
                                key={index}
                                onClick={() => handleSelectRate(rate)}
                            >
                                <div className={styles.control_settings_menu_item_icon}>
                                    {rate === currentRate && <Check size={24}/>}
                                </div>
                                <div className={styles.control_settings_menu_item_label}>{rate}</div>

                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}