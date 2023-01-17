interface login_data {
    user_name: string,
    password: string,
}

interface token_payload {
    id: string;
    name: string;
    user_name: string;
    position: string;
    role: string;
    is_admin: boolean;
    department: object;
}

export { login_data, token_payload }