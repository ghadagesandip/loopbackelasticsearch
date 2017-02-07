var server = require('./server');
var ds = server.datasources.mysql;
var lbTables  = ['person'];

ds.autoupdate(lbTables, function(err){
    if (err) throw err;
    console.log('Loopback tables [' + lbTables + '] created in ', ds.adapter.name);
    ds.disconnect();
});


