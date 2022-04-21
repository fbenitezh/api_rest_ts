import { DataTypes } from "sequelize";
import { db } from '../config/db';

const Category = db.define('categories', {
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    enabled: {
        type: DataTypes.BOOLEAN
    },
    deleted: {
        type: DataTypes.BOOLEAN
    }
});

export default Category;