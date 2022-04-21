import { Request, Response } from 'express';
import CategoryService from '../services/CategoryService';


interface ICategoryController {
    find: (req: Request, res: Response) => Promise<void>,
    read: (req: Request, res: Response) => Promise<void>,
    create: (req: Request, res: Response) => Promise<void>,
    update: (req: Request, res: Response) => Promise<void>,
    softDelete: (req: Request, res: Response) => Promise<void>
}

const categoryService = new CategoryService();

class CategoryController implements ICategoryController {

    async find(req: Request, res: Response): Promise<void> {
        try {
            const pagination = {
                start: Number(req.query.start) || 0,
                length: Number(req.query.length) || 100
            }

            const data = await categoryService.find(pagination, { column: "id", order: "DESC" }, req.body.filters);
            res.status(200).json({
                ok: true,
                data
            });
        } catch (error) {
            const message = (error instanceof Error) ? error.message : 'Unknown Error';
            res.status(400).json({
                ok: false,
                error: message
            })
        }
    }

    async read(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const data = await categoryService.read("id", id);
            res.status(200).json({
                ok: true,
                data
            });
        } catch (error) {
            const message = (error instanceof Error) ? error.message : 'Unknown Error';
            res.status(400).json({
                ok: false,
                error: message
            })
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const payload = req.body;
            const data = await categoryService.create(payload);
            res.status(200).json({
                ok: true,
                data
            });
        } catch (error) {
            const message = (error instanceof Error) ? error.message : 'Unknown Error';
            res.status(400).json({
                ok: false,
                error: message
            })
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const payload = req.body;
            const id = req.params.id;
            const data = await categoryService.update(payload, "id", id);
            res.status(200).json({
                ok: true,
                data
            });
        } catch (error) {
            const message = (error instanceof Error) ? error.message : 'Unknown Error';
            res.status(400).json({
                ok: false,
                error: message
            })
        }
    }

    async softDelete(req: Request, res: Response): Promise<void> {
        try {
            const { params: { id } } = req;
            const data = await categoryService.softDelete("id", id);
            res.status(200).json({
                ok: true,
                data
            });
        } catch (error) {
            const message = (error instanceof Error) ? error.message : 'Unknown Error';
            res.status(400).json({
                ok: false,
                error: message
            })
        }
    }

}

export default CategoryController;