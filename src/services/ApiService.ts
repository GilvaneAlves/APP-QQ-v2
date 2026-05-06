export class ApiService {
    private readonly baseUrl: string = '/api';

    public async request<T = unknown>(
        endpoint: string,
        method: string,
        body?: unknown
    ): Promise<T> {
        const url: string = `${this.baseUrl}/${endpoint}`.replace(/\/+/g, '/');

        const options: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (body != null) {
            options.body = JSON.stringify(body as Record<string, unknown>);
        }

        const logBody: string | undefined = body ? '[truncated]' : undefined;
        console.log('Making request:', {
            method,
            url,
            body: logBody,
        });

        try {
            const response: Response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await (response.json() as Promise<T>);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('API request failed:', error);
            } else {
                console.error('API request failed:', String(error));
            }
            throw error;
        }
    }

    public async get<T = unknown>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, 'GET');
    }

    public async post<T = unknown>(endpoint: string, body?: unknown): Promise<T> {
        return this.request<T>(endpoint, 'POST', body);
    }

    public async put<T = unknown>(endpoint: string, body?: unknown): Promise<T> {
        return this.request<T>(endpoint, 'PUT', body);
    }

    public async delete_<T = unknown>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, 'DELETE');
    }
}