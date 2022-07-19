exports.showValidationErrors = (res, errors) => {
    return res.status(422).json({
        error: errors.array()[0].param + " : " + errors.array()[0].msg,
        status: 422
    });
}