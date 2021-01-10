import { useEffect, useState } from "react";
import Model, {ModelConstructor} from "../model";

interface IPagination<T> {
    page: number;
    total: number;
    data: T[];
    hasNext: boolean;
    hasPrev: boolean;
    nextPage(): void;
    prevPage(): void;
    setPage(page: number): void;
}

const createPagination = <T extends Model<U>, U>(model: ModelConstructor<T>, perPage = 10) => {
    return (query: Record<string, any>, defaultPage: number): IPagination<T> => {
        const [data, setData] = useState<T[]>([])
        const [page, setPage] = useState(defaultPage)
        useEffect(() => {
            model.fetchPagination(page, query).then((data) => {
                setData(data.data);
            })
        }, [query, page]);
        return {
            hasNext: true,
            hasPrev: true,
            nextPage() {
                setPage(page + 1);
            },
            prevPage() {
                setPage(page - 1);
            },
            setPage,
            page,
            total: 1,
            data
        };
    }
}

export default createPagination;
