export type UserType = {
    id: string;
    created_at: string;
    first: string;
    last: string;
    email: string;
    phone: string;
    auth_id: string; //auth.users: uid
}

export type CompanyType = {
    id: string;
    created_at: string;
    name: string;
    primary_contact: string; //UserType: id
    disciplines: string[];
}

export type InternalUserType = {
    id: string;
    created_at: string;
    middle: string;
    title: string;
    user: string;
    company: string;
}