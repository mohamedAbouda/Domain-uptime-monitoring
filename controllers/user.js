exports.getUser = (req, res, next) => {

    return res.status(200).json({
        'data': req.user,
        'status': 200
    });
}