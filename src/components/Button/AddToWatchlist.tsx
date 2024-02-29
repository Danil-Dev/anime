'use client'
import {Button,} from "@chakra-ui/react";
import {Bookmark} from "react-feather";
import {useSession} from "next-auth/react";
import {UserServices} from "@/services/User";
import {useState} from "react";
import {TrendingDown} from "react-feather";


export default function AddToWatchlist({id, disable, isInWatchlist}: {id: string, disable: boolean, isInWatchlist: boolean}) {

    const session = useSession()
    const [loading, setLoading] = useState<boolean>(false)
    const [state, setState] = useState<boolean>(isInWatchlist)

    console.log(state);
    const addToWatchlist = () => {
        setLoading(true)
        UserServices.addToWatchlist(session.data?.user?.id, id).then((res) => {
            console.log('added')
            setLoading(false)
            setState(!state)
        })

    }
    const removeFromWatchlist = () => {
        setLoading(true)
        UserServices.removeFromWatchlist( id, session.data?.user?.id).then((res) => {
            console.log('removed', res)

                setState(!state)
                setLoading(false)
        })
    }
    return (
        <Button
            size={'lg'}
            variant={state ? 'secondary' : 'primary'   }
            colorScheme={'primary'}
            leftIcon={!state? <Bookmark size={18}/> : <TrendingDown size={18}/>}
            marginY={'30px'}
            isLoading={loading}
            disabled={disable}
            onClick={!state? addToWatchlist: removeFromWatchlist}
        >
            {state ? 'Видалити з закладок' : 'Додати до закладок'}
        </Button>
    );
}
