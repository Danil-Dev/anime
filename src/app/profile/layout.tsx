import ProfileMenu from "@/components/ProfileMenu";
import {Box} from "@chakra-ui/layout";


export default function ProfileLayout({children}: { children: React.ReactNode }) {
    return (
        <Box mt={10}>
            <ProfileMenu/>
            {children}
        </Box>
    )

}