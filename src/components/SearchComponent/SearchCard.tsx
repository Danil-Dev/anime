import {IAnimeFoundData} from "@/services/Anime";
import styles from "@/components/SearchComponent/searchComponent.module.scss"
import Image from "next/image";
import {Tags} from "@/components/Tags";
import {Calendar, Star} from "react-feather";

export default function SearchCard({data}: {data:IAnimeFoundData}) {
    return (
        <div className={styles.searchCard_wrapper}>
            <div className={styles.searchCard_img_wrapper}>
                <Image src={data.image} alt={data.title} width={90} height={130}/>
            </div>
            <div className={styles.searchCard_info}>
                <h1 className={styles.searchCard_header}>{data.title}</h1>
                <div className={styles.searchCard_info_metaData_wrapper}>
                    <Tags size={'small'} tags={data.genre}/>
                    <div className={styles.searchCard_info_metaData_wrapper_date}>
                        <Calendar size={12}/>
                        <p>{data.release_date}</p>
                    </div>
                    <div className={styles.searchCard_info_metaData_wrapper_rating}>
                        <Star size={12}/>
                        <p>{data.rating}</p>
                    </div>
                </div>
                <div className={styles.searchCard_info_desc}>
                    <p><strong>Опис: </strong>{data.description}</p>
                </div>
            </div>

        </div>
    )

}