export interface IPagination<T> {
    data: T[];
    current_page: number;
    per_page: number;
    total: number;
}

class Pagination<T> {
    static async create<T>(model: any, page: number, queries?: any) {
        const data = await model.fetchPagination(page, queries);
        return new this<T>(model, data, queries);
    }
    page = 0;
    total = 0;
    results = 0;
    data: T[];
    totalPage = 0;
    constructor(
        public readonly model: any,
        data: IPagination<T>,
        public queries?: any
    ) {
        this.data = data.data;
        this.page = data.current_page;
        this.results = data.per_page;
        this.total = data.total;
        this.totalPage = Math.ceil(data.total / data.per_page);
    }

    nextPage<T>() {
        return Pagination.create<T>(this.model, this.page + 1, this.queries)
    }

    prevPage<T>() {
        return Pagination.create<T>(this.model, this.page - 1, this.queries);
    }

    get hasNext() {
        return this.page < this.totalPage;
    }

    get hasPrev() {
        return this.page > 1;
    }
}

export default Pagination;
