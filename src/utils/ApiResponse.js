class ApiResponse {
    constructor(statusCode, data, message = "Succsess"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.sucess = statusCode < 400

    }
}