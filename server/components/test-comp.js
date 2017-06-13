//module.exports = function (loopbackApplication, options) {
//
//    console.log('options start ', options, ' options ends here...');
//
//    loopbackApplication.use(options.path, function (req, res, next) {
//        res.send('Your Component');
//    });
//};
module.exports = function (loopbackApplication, options) {
    loopbackApplication.use(function (req, res, next) {
        //console.log('options start ', options, ' options ends here...');
        //console.log('loopbackApplication', req);
        next();
    });
};


