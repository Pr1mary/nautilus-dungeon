
export class CommonMessage{
    message: string;
    constructor(message: string){
        this.message = message;
    }
}

const success = (data: any = new CommonMessage("success")) => {
    return {
        data,
        error: null,
    }
}

const error = (error: any = new CommonMessage("error")) => {
    return {
        data: null,
        error,
    }
}

export default {
    success,
    error,
}