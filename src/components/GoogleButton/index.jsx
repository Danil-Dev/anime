'use client';
import { Button } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
export function GoogleButton() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "http://localhost:3000/";
    return (<Button onClick={() => {
            signIn("google", { callbackUrl });
        }}>
            Sign in with Google
        </Button>);
}
