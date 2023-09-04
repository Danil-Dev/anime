'use client'
import {Button} from "@chakra-ui/react";
import {signIn} from "next-auth/react";
import {useSearchParams} from "next/navigation";
import * as process from "process";

export function GoogleButton() {

    const searchParams = useSearchParams();

    const callbackUrl = searchParams.get("callbackUrl") || `${process.env.BASE_API_URL}/`;
    return (
        <Button
            onClick={() => {
                signIn("google", {callbackUrl});
            }}
        >
            Sign in with Google
        </Button>
    );
}
