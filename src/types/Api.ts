// src/types/Api.ts

/**
 * Represents an API error with a message and error code.
 */
export interface ApiError {
    message: string;
    code: string;
}

/**
 * Generic response type for API calls.
 * Includes success flag, data (if successful), error (if failed), and status code.
 */
export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: ApiError;
    statusCode: number;
}

/**
 * Options for customizing API requests.
 */
export interface RequestOptions {
    headers?: Record<string, string>;
    timeout?: number;
    retry?: number;
}

/**
 * Parameters for paginated requests, suitable for product searches.
 */
export interface PaginationParams {
    page?: number;
    limit?: number;
    sort?: string;
}

/**
 * Configuration for the API client, used application-wide.
 * Tailored for barcode scanner product search API.
 */
export interface ApiConfig {
    baseUrl: string;
    timeout?: number;
    retry?: number;
}