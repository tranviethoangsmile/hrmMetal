interface login_data {
    user_name: string;
    password: string;
}


interface token_payload {
    id: string;
    name: string;
    user_name: string;
    avatar: string;
    position: string;
    role: string;
    department_id: string;
}

export { login_data, token_payload };
