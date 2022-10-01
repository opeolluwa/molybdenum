type ApiResponseSuccess = {
  success: true
  payload: {
    [key: string]: any
  }
}

type ApiResponseFailure = {
  success: false
  error: {
    code: number
    type: string
    message: string
  }
}

type ApiResponse = ApiResponseSuccess | ApiResponseFailure
export default ApiResponse
