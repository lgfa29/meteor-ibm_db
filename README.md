# ibm_db smart package
Packaging [ibm_db](https://www.npmjs.com/package/ibm_db) for [Meteor](https://www.meteor.com/).

##Using
Add this package to your project:

```
meteor add laoqui:ibm-db
```

Now you can use it to run your queries:

```
var connString = "DRIVER={DB2};DATABASE=...;HOSTNAME=...;UID=...;PWD=...;PORT=...;PROTOCOL=TCPIP";

if (Meteor.isServer) {
  Meteor.methods({
    getUserCount: function() {
    
	  var callDB = Meteor.wrapAsync(function(callback) {
        IBMDB.open(connString, function(err, conn) {
          if (err) return callback(err, null);
          
          conn.query("select count(*) as COUNT from user", function(err, rows) {
            if (err) return callback(err, null);
            callback(null, rows[0]["COUNT"]);
          });
        });
      });

      var count = -1;
      try {
		count = callDB();
	  } catch(e) {
        console.log(e);
      }

      return count;
    }
  });
}
```
```
if (Meteor.isClient) {
  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Meteor.startup(function() {
    Meteor.call("getUserCount", function(err, data) {
      Session.set("counter", data);
    });
  });
}
```

You can also write your method in a blocking/synchrounous way:

```
Meteor.methods({
  getUserCountSync: function() {
    var count = -1;
    
    try {
      var conn = IBMDB.openSync(connString);
      var rows = conn.querySync("select count(*) as COUNT from mdl_user");
      count = rows[0]["COUNT"];
    } catch(e) {
      console.log(e);
    }

    return count;
  }
});
```
Checkout the [ibm_db package documentation](https://www.npmjs.com/package/ibm_db#api) for more details
## Future work
Currently this is not a full Meteor implementation (no reactivity, no DDP, etc.), so it can only be used server-side.

In the future we plan to fully support Meteor features.

