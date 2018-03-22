'use strict';

const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const commonSeed = require('./common');
const businessConnection = new BusinessNetworkConnection();

(async () => {
    try {
        await businessConnection.connect('admin@smoreschain');
        await commonSeed.seedAssets(businessConnection);
    } catch (err) {
        console.log(err);
    } finally {
        process.exit();
    }
})();

