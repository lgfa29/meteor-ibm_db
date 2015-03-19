Package.describe({
  name: 'laoqui:ibm-db',
  summary: 'Connect to your IBM DB2 or IBM Informix database - Meteor packaging wrapper',
  version: '0.0.1',
  git: 'https://github.com/lgfa29/meteor-ibm_db.git',
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');
  api.export('IBMDB', 'server');
  api.addFiles('export.js', 'server');
});

Npm.depends({
  'ibm_db': '0.0.8'
});
