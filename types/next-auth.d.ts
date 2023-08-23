import {ISODateString} from "next-auth/core/types";

declare module "next-auth" {

    import {DefaultSession} from "next-auth";

    interface Session{
        user: {
            id: string,
            token: string
        } & DefaultSession['user']
        expires: ISODateString;
    }
}