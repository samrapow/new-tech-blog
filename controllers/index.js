const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const headerRoutes = require('./header-routes.js');

router.use('/', homeRoutes);
router.use('/header', headerRoutes);
router.use('/api', apiRoutes);

module.exports = router;