import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

export const TABLE_NAME = process.env.TABLE_NAME;
export const JWT_SECRET = process.env.JWT_SECRET;
export const AWS_REGION = process.env.AWS_REGION;