import { Sequelize } from "sequelize";

export const conn = new Sequelize('bookstore3D', 'root', 'root',{
    host: 'localhost',
    dialect: "mysql",
    port: 3306
})
