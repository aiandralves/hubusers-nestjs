export class AuthResponseDTO {
    id?: number;
    name: string;
    email: string;
    token: string;
    link: string;
    refreshToken?: string;
}
