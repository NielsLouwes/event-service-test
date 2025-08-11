export const validationMiddleWare = (req, res , next) => {
    if (!Array.isArray(req.body)){
      return res.status(400).json({
        error: 'Request body must be an array of events.'
      })
    }

    if (req.body.length === 0){
      return res.status(400).json({
        error: 'Request body cannot be empty'
      })
    }

   return next();
}

