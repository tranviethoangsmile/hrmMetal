export interface create_infomation {
    user_id: string;
    title: string;
    content: string;
    date: string;
    position: string;
    media?: string;
    is_video?: boolean;
    is_public?: boolean;
    is_check_safety?: boolean;
}

export interface search_all_information {
    position: string;
    is_public: boolean;
}
