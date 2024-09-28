export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204, // Нет содержимого

    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405, // Метод не разрешен
    CONFLICT: 409, // Конфликт

    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501, // Не реализовано
    BAD_GATEWAY: 502, // Плохой шлюз
    SERVICE_UNAVAILABLE: 503, // Служба недоступна
    GATEWAY_TIMEOUT: 504, // Шлюз не отвечает
};

export type HttpStatusKeys = keyof typeof HTTP_STATUS
export type HttpStatusType = (typeof HTTP_STATUS)[HttpStatusKeys]