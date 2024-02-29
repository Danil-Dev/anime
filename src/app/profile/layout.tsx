import ProfileMenu from "@/components/ProfileMenu";
import {Box} from "@chakra-ui/layout";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/configs/auth";
import {redirect} from "next/navigation";



export default async function ProfileLayout({children}: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/auth/login')
    }

    return (
        <Box mt={10}>
            <ProfileMenu/>
            {children}
        </Box>
    )
}