exports.index = (req, res, next) => {
    res.render('index', { title: process.env.APP_NAME || 'Uptime Robot' });
}