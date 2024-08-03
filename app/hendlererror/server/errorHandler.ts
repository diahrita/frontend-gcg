import { Messages } from '../message/messages';

export const handleError = (error: any): { status: number; message: string } => {
    let status = 500;
    let message = Messages.GENERIC_ERROR;

    if (error.response) {
        status = error.response.status;
        switch (status) {
            case 400:
                message = Messages.BAD_REQUEST;
                if (error.response.data) {
                    const clientError = error.response.data.error;
                    switch (clientError) {
                        case 'validation':
                            message = Messages.VALIDATION_ERROR;
                            break;
                        case 'syntax':
                            message = Messages.SYNTAX_ERROR;
                            break;
                        case 'parameter':
                            message = Messages.PARAMETER_ERROR;
                            break;
                        default:
                            message = Messages.BAD_REQUEST;
                            break;
                    }
                }
                break;
            case 401:
                message = Messages.TOKEN_INVALID;
                break;
            case 402:
                message = Messages.PAYMENT_REQUIRED;
                break;
            case 403:
                message = Messages.PERMISSION_DENIED;
                break;
            case 404:
                message = Messages.PAGE_NOT_FOUND;
                break;
            case 500:
                message = Messages.SERVER_ERROR;
                if (error.response.data) {
                    const serverError = error.response.data.error;
                    switch (serverError) {
                        case 'database':
                            message = Messages.DATABASE_ERROR;
                            break;
                        case 'service':
                            message = Messages.SERVICE_ERROR;
                            break;
                        case 'timeout':
                            message = Messages.TIMEOUT_ERROR;
                            break;
                        default:
                            message = Messages.SERVER_ERROR;
                            break;
                    }
                }
                break;
            case 502:
                message = Messages.BAD_GATEWAY;
                break;
            case 503:
                message = Messages.SERVICE_UNAVAILABLE;
                break;
            default:
                message = Messages.GENERIC_ERROR;
                break;
        }
    } else if (error.request) {
        message = Messages.NETWORK_ERROR;
    } else {
        message = Messages.REQUEST_ERROR;
    }

    // Simpan pesan error ke sessionStorage
    sessionStorage.setItem(Messages.ERROR, message);

    return { status, message };
};
