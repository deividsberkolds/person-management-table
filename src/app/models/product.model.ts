export interface Person {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    ip_address: string;
}

export interface Pagination {
    records: Person[];
    recordsInPage: number;
    currentPage: number;
    pageCount: number[];
}
