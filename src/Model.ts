import Axios from "axios";
import Pagination from "./pagination";

class Model<D> {
    static collection: string;
    static pk: string = "id";

    static async create(props: any) {
        const { data } = await Axios.post(`${this.collection}`, props);
        return new this(data);
    }

    static paginate<T>(queries?: any) {
        return Pagination.create<T>(this, queries);
    }

    static async fetch(id: number) {
        const { data } = await Axios.get(`${this.collection}/${id}`);
        return new this(data);
    }

    static async fetchAll<T>(queries?: any) {
        const { data } = await Axios.get<T[]>(`${this.collection}`, {
            params: queries
        });
        return data.map((r) => new this(r));
    }

    static async fetchPagination(page: number, queries?: any) {
        const { data } = await Axios.get(`${this.collection}`, {
            params: { page, ...queries }
        });
        data.data = data.data.map((d: any) => new this(d));
        return data;
    }

    constructor(public readonly attributes: D) {
    }

    async update(attributes: Partial<D>) {
        const { data } = await Axios.put<D>(`${(this.constructor as any).collection}/${this.id}`);
        return data;
    }

    get id() {
        const M = this.constructor as any;
        return (this.attributes as any)[M.pk];
    }
}

export type ModelConstructor<T> = {
    new (): Model<T>,
    create(props: any): Model<T>
    paginate<T>(queries?: any): Pagination<T>,
    fetch(id: number): Model<T>
    fetchAll<T>(queries?: any): Model<T>[],
    fetchPagination(page: number, queries?: any): any;
}

export default Model;
