export interface User {
    username: string;
    email: string;
    password: string;
    confirmPassword? : string;
    oldPassword? : string;
    rememberMe?: Boolean;
    terms? : Boolean;
    role? : string;
    id? : number;
    provider? : string | null;
    providerId? : string | null;
    verificationToken? : string;
    verified?: boolean;
}