import { DataTypes } from "sequelize";
import { conn } from "../config/sequelize.js"; 

import bcrypt from "bcryptjs";

const usuarioModel = conn.define(
    "usuarios",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                isEmail: true
            }
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        },
        funcao: {
            type: DataTypes.ENUM("admin", "comum"),
            defaultValue: 'comum'
        }
    }, 
    {
        createdAt: "created_at",
        updatedAt: "update_at"
    }
    
);

export default usuarioModel;