export const validationMiddleWare = (requestBody, response) => {
    if (!Array.isArray(requestBody)){
      return response.status(400).json({
        error: 'Request body must be an array of events.'
      })
    }

    if (requestBody.length === 0){
      return response.status(400).json({
        error: 'Request body cannot be empty'
      })
    }

    return response.status(200)
}

