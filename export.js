var ibm_db = Npm.require("ibm_db");

IBMDB = {};
IBMDB.open = Meteor.wrapAsync(ibm_db.open);
IBMDB.openSync = ibm_db.openSync;