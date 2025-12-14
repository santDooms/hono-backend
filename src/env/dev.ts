import dotenv from "dotenv";
dotenv.config({ path: "./src/.env" });

export const TABLE_NAME = process.env.TABLE_NAME;
export const JWT_SECRET = process.env.JWT_SECRET;
export const AWS_REGION = process.env.AWS_REGION