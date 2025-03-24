/** Konfigurasi CORS */
export const expressCors = {
    'Access-Control-Allow-Origin': ['localhost', 'https://example.com'],
    'Access-Control-Allow-Methods': ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    'Access-Control-Allow-Headers': [
        'Authorization',
        'Content-Type',
        'X-Requested-With',
        'Accept',
        'Origin',
    ],
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Expose-Headers': ['Content-Length', 'X-Custom-Header'],
    'Access-Control-Max-Age': 3600,
    'Access-Control-Request-Headers': ['Authorization', 'Content-Type'],
    'Access-Control-Request-Method': ['GET', 'POST', 'PUT', 'DELETE'],
};

export const socketWhitelist = ['localhost', 'https://example.com'];
