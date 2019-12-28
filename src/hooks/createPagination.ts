import { useEffect } from "react";
import Model from "ajx-model/src/Model";

interface IPagination<T> {
    page: number;
    total: number;
    data: T[];
    hasNext: boolean;
    hasPrev: boolean;
}

const createPagination = <T extends Model<U>, U>(model: new () => T, pagePage = 10) => {
    return (record: Record<string, any>, page: number): IPagination<T> => {
        useEffect(() => {
            (model as any).fetchPagination(record, page)
        });
        return {
            hasNext: true,
            hasPrev: true,
            page: 1, total: 1, data: []
        };
    }
}

export default createPagination;
