
const success = (data: any = {"message": "success"}) => {
    return {
        data,
        error: null,
    }
}

const error = (error: any = {"message": "error"}) => {
    return {
        data: null,
        error,
    }
}

export default {
    success,
    error,
}