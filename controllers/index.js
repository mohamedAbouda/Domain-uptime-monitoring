exports.index = (req, res, next) => {
    // console.log(req.cookies)
    // res.cookie('hello', 'isLogin')
    // req.session.views = 'dfasdf'
    //console.log(req.session.views)
    res.render('index', { title: process.env.APP_NAME || 'Uptime Robot' });
}