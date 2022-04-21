import { Model, ModelCtor } from "sequelize/types";

interface IAbstractService {
    model: ModelCtor<Model<any, any>>,
    find: (pagination: pagination, sorts: sorts, filters: filters[]) => Promise<Model<any, any>[]>,
    read: (column: string, value: string | number | boolean) => Promise<Model<any, any> | null>,
    create: (body: Omit<any, string>) => Promise<Model<any, any> | void>,
    update: (body: Omit<any, string>, criteria: string, value: any) => Promise<Model<any, any> | any>,
    softDelete: (criteria: string, value: any) => Promise<Model<any, any> | any>,
}

type filters = {
    key: string,
    operator: string,
    value: string
}

type sorts = {
    column: string,
    order: string
}

type pagination = {
    start: number,
    length: number
}


class AbstractService implements IAbstractService {
    model: ModelCtor<Model<any, any>>;

    constructor(model: ModelCtor<Model<any, any>>) {
        this.model = model;
    }

    async find(pagination: pagination, sorts: sorts, filters: filters[]): Promise<Model<any, any>[]> {
        try {
            const regs = this.model.findAll({
                offset: pagination.start,
                limit: pagination.length,
                order: [["id", sorts.order]],
                where: {
                    deleted: 0
                }
            });
            return regs;
        } catch (error) {
            const message = (error instanceof Error) ? error.message : 'Unknown Error';
            throw new Error(message);
        }
    }

    async read(column: string, value: string | number | boolean): Promise<Model<any, any> | null> {
        try {
            const reg = this.model.findOne({
                where: {
                    [column]: value
                }
            });
            return reg;
        } catch (error) {
            const message = (error instanceof Error) ? error.message : 'Unknown Error';
            throw new Error(message);
        }
    }

    async create(body: Omit<any, string>): Promise<Model<any, any> | any> {
        try {
            const res = await this.model.create(body);
            return res;
        } catch (error) {
            const message = (error instanceof Error) ? error.message : 'Unknown Error';
            throw new Error(message);
        }
    }

    async update(body: Omit<any, string>, criteria: string, value: any): Promise<Model<any, any> | any> {
        try {
            const res = await this.model.update(body, {
                where: {
                    [criteria]: value
                }
            });
            return res;
        } catch (error) {
            const message = (error instanceof Error) ? error.message : 'Unknown Error';
            throw new Error(message);
        }
    }

    async softDelete(criteria: string, value: any): Promise<Model<any, any> | any> {
        try {
            const res = await this.model.update({
                deleted: 1
            }, {
                where: {
                    [criteria]: value
                }
            });
            return res;
        } catch (error) {
            const message = (error instanceof Error) ? error.message : 'Unknown Error';
            throw new Error(message);
        }
    }

}

export default AbstractService;