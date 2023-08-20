import ProfileMenu from "@/components/ProfileMenu";


export default function ProfileLayout({children}: { children: React.ReactNode }) {
    return (
        <>
            <ProfileMenu/>
            {children}
        </>
    )

}