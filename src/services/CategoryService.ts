import AbstractService from "./AbstactService";
import Category from "../models/CategoryModel";

class CategoryService extends AbstractService{
    constructor() {
        super(Category);
    }

    //Define custom methods to this service

}

export default CategoryService;