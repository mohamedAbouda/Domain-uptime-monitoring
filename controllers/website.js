exports.list = async(req, res, next) => {

    const websites = await req.user.getWebsites();
    return res.status(200).json({
        'data': websites,
        'status': 200
    });
}

exports.show = (req, res, next) => {


}

exports.update = (req, res, next) => {


}

exports.create = (req, res, next) => {


}

exports.delete = (req, res, next) => {


}