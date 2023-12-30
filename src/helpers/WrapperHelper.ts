
export class CommonMessage{
    message: string;
    code: number;
    constructor(message: string, code?: number ){
        this.message = message;
        this.code = code || 0;
    }
}

const success = (data?: any) => {
    return {
        data: data || new CommonMessage("success"),
        error: null,
    }
}

const error = (error?: any) => {
    return {
        data: null,
        error: error || new CommonMessage("error"),
    }
}

export default {
    success,
    error,
}