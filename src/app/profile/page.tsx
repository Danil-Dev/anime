import {getServerSession} from "next-auth";
import {authOptions} from "@/configs/auth";

export default async function ProfilePage() {

    const session = await getServerSession(authOptions)

    return (
        <>
            <h1>Profile {session?.user?.name}</h1>

            {session?.user?.image && ( <img src={session?.user?.image} alt=""/>)}
        </>
    );
}
