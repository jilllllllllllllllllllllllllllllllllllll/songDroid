angular.module('songApp.services', [])

.service('Songs', function() {

      var songs = Backendless.Persistence.of(Songs).find();
      var dataStore = Backendless.Persistence.of(Songs);

      return {
        all: function() {
          return songs.data;
        },
        active: function() {
          var findActive = {condition: "isActive = 1"};
          var foundActive = Backendless.Persistence.of(Songs).find(findActive);
          return foundActive.data;
        },
        get: function(songId) {
          for (var i = 0; i < songs.data.length; i++) {
            if (songs.data[i].songId === parseInt(songId)) {
              return songs.data[i];
            }
          }
          return null;
        },
        count: function() {
            var ctr = 1;
            for (var i = 0; i < songs.data.length; i++) {
                ctr++;
            }
            return ctr;
        }
      }
})

.service ('sharedProperties', function () {
    var property = 1;
    return {
        getProperty:function () {
            return property;
        },
        setProperty:function (value) {
            property = value;
        }
    };
})

.service ('sharedProperties2', function () {
    var property = 1;
    return {
        getProperty:function () {
            return property;
        },
        setProperty:function (value) {
            property = value;
        }
    };
})

.service('Setlists', function() {

    var setlists = Backendless.Persistence.of(Setlists).find();
    var dataStore = Backendless.Persistence.of(Songs);

    return {
      all: function() {
        return setlists.data;
      },
      count: function() {
        var ctr = 1;
        for (var i = 0; i < setlists.data.length; i++) {
            ctr++;
        }
        return ctr;
      },
      listed: function(setlistObjId) {
          var findItems = {condition: "Setlists[setlistSongs].objectId='" + setlistObjId + "'"};
          var foundItems = dataStore.find( findItems );
//          console.log(JSON.stringify(foundItems.data));
          return foundItems.data;
      },
      get: function(setlistId) {
          for (var i = 0; i < setlists.data.length; i++) {
            if (setlists.data[i].setlistId === parseInt(setlistId)) {
              return setlists.data[i];
            }
          }
          return null;
      },
      active: function() {
        var findActive = {condition: "isActive = 1"};
        var foundActive = Backendless.Persistence.of(Setlists).find(findActive);
        return foundActive.data;
      }
    }
})

.service('Users', function() {

    var users = Backendless.Persistence.of(Backendless.User).find();
    var dataStore = Backendless.Persistence.of(Songs);

    return {
      all: function() {
        return users.data;
      },
      count: function() {
        var ctr = 1;
        for (var i = 0; i < users.data.length; i++) {
            ctr++;
        }
        return ctr;
      },
      get: function(userId) {
          for (var i = 0; i < users.data.length; i++) {
            if (users.data[i].userId === parseInt(userId)) {
              return users.data[i];
            }
          }
          return null;
      },
      active: function() {
        var findActive = {condition: "isActive = 1"};
        var foundActive = Backendless.Persistence.of(Backendless.User).find(findActive);
        return foundActive.data;
      },
      roles: function(role) {
        var findActive = {condition: role + " = true and isActive = 1"};
        console.log("Queried: " + findActive);
        var foundActive = Backendless.Persistence.of(Backendless.User).find(findActive);
        return foundActive.data;
      }
    }
})