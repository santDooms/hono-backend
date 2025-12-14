import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export class AppError extends Error {
  public statusCode: number;
  public details?: unknown;
  public code?: string;
  constructor(message: string, statusCode = 400, details?: unknown, code?: string) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.details = details;
    this.code = code;
  }
}

export const isAppError = (err: unknown): err is AppError => err instanceof AppError;

export const errorHandler = async (err: Error, c: Context) => {
  console.error("Global error handler:", err);
  
  if (err instanceof AppError) {
    return c.json(
      {
        success: false,
        error: {
          message: err.message,
          code: err.code,
          details: err.details,
          statusCode: err.statusCode,
        }
      },
      err.statusCode as any 
    );
  }
  
  if (err instanceof HTTPException) {
    return c.json(
      {
        success: false,
        error: {
          message: err.message,
          statusCode: err.status
        }
      },
      err.status as any
    );
  }
  return c.json(
    {
      success: false,
      error: {
        message: process.env.NODE_ENV === "production" 
          ? "Internal server error" 
          : err.message,
        statusCode: 500
      }
    },
    500 as any
  );
};