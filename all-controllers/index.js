const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');

// Prefix routes with their respective paths
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
