  var APPLICATION_ID = '48F7E0A1-E799-EE7C-FF56-D3687FF1BF00',
      SECRET_KEY = 'B68610CE-62FD-34D1-FFD2-EF348786DD00',
      VERSION = 'v1';

  function doConnectFunction() {
    Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
    localStorage.setItem('localSongs', JSON.stringify(Backendless.Persistence.of(Songs).find()));
    localStorage.setItem('localSetlists', JSON.stringify(Backendless.Persistence.of(Setlists).find()));
    localStorage.setItem('localUsers', JSON.stringify(Backendless.Persistence.of(Backendless.User).find()));
    localStorage.setItem('localRoles', JSON.stringify(Backendless.Persistence.of(Roles).find()));

    console.log("Backendless connection sucess.");
  }
  function doNotConnectFunction() {
      console.log("Backendless connection failed.");
  }

  var i = new Image();
  i.onload = doConnectFunction;
  i.onerror = doNotConnectFunction;
  i.src = 'http://gfx2.hotmail.com/mail/uxp/w4/m4/pr014/h/s7.png?d=' + escape(Date());

function Songs(args) {
    args = args || {};
    this.songId = args.songId || "";
    this.songTitle = args.songTitle || "";
    this.songArtist = args.songArtist || "";
    this.songAlbum = args.songAlbum || "";
    this.songAlbumName = args.songAlbumName || "";
    this.songKey = args.songKey || "";
    this.songYoutube = args.songYoutube || "";
    this.songSpotify = args.songSpotify || "";
    this.isActive = args.isActive || "";
    this.___class = 'Songs';
    this.songSheet = args.songSheet || "";
    this.songLyrics = args.songLyrics || "";
    this.songChords = args.songChords || "";
    this.songTags = args.songTags || "";
    this.songOthers = args.songOthers || "";
    this.songBPM = args.songBPM || "";
    this.songSections = args.songSections || "";
}

function Setlists(args) {
    args = args || {};
    this.setlistId = args.setlistId || "";
    this.setlistName = args.setlistName || "";
    this.setlistRoles = args.setlistRoles || "";
    this.setlistSongs = args.setlistSongs || {};
    this.setlistNotes = args.setlistNotes || "";
    this.isActive = args.isActive || "";
    this.setlistSpotify = args.setlistSpotify || "";
    this.___class = 'Setlists';

}

function Tags(args) {
    args = args || {};
    this.tagId = args.tagId || "";
    this.tagName = args.tagName || "";
    this.setlists = args.setlists || {};
    this.songs = args.songs || {};
    this.___class = 'Tags';
}

function Roles(args) {
    args = args || {};
    this.___class = 'Roles';
    this.roleName = args.roleName || "";
}

// FUNCTIONS
function saveEditSong(id, info) {
    var objectId = getObject(id).objectId;
    var update = Backendless.Persistence.of(Songs).findById(objectId);

    if(info.title != null) {
        update["songTitle"] = String(info.title);
    }
    if(info.artist != null) {
        update["songArtist"] = String(info.artist);
    }
    if(info.albumName != null) {
        update["songAlbumName"] = String(info.albumName);
    }
    if(info.key != null) {
        update["songKey"] = String(info.key);
    }
    if(info.albumArt != null) {
        update["songAlbum"] = String(info.albumArt);
    }
    if(info.youtube != null) {
        update["songYoutube"] = String(info.youtube);
    }
    if(info.spotify != null) {
        update["songSpotify"] = String(info.spotify);
    }

    update = Backendless.Persistence.of(Songs).save(update);
    console.log("Song edited: " + updated);
}

function saveNewSong(info) {

    var object = new Setlists();

    var newSong = new Songs({
        songId: parseInt(info.count),
        songTitle: String(info.title),
        songArtist: String(info.artist),
        songAlbumName: String(info.albumName),
        songAlbum: String(info.albumArt),
        songKey: String(info.key),
        songYoutube: String(info.youtube),
        songSpotify: String(info.spotify),
        ownerId: "testUser",
        isActive: 1
    })
    var updated = Backendless.Persistence.of(Songs).save(newSong);
    console.log("Song saved: " + updated);
}

function saveNewSetlist(info) {
    var newSetlist = new Setlists({
        setlistId: parseInt(info.count),
        setlistName: String(info.name),
        setlistNotes: String(info.notes),
        setlistSongs: [],
        isActive: 1
    })
    var updated = Backendless.Persistence.of(Setlists).save(newSetlist);
    console.log("Setlist saved: " + updated);
}

function deleteItem(id) {
    var update = getObject(id).objectId;
        update = Backendless.Persistence.of(Songs).findById(update);
        update["isActive"] = 0;
        update = Backendless.Persistence.of(Songs).save(update);
    console.log("Song deleted: " + updated);
}

function deleteSetlist(id) {
    var update = getSetlist(id).objectId;
        update = Backendless.Persistence.of(Setlists).findById(update);
        update.isActive = 0;
        update = Backendless.Persistence.of(Setlists).save(update);
    console.log("Setlist deleted " + updated);
}

function getObject(songId) {
    var songs = localStorage.getItem('localSongs');
        songs = JSON.parse(songs);
     for (var i = 0; i < songs.data.length; i++) {
        if (songs.data[i].songId === parseInt(songId)) {
          return (songs.data[i]);
        }
     }
}

function getSetlist(setlistId) {
    var setlists = localStorage.getItem('localSetlists');
        setlists = JSON.parse(setlists);
     for (var i = 0; i < setlists.data.length; i++) {
        if (setlists.data[i].setlistId === parseInt(setlistId)) {
          return (setlists.data[i]);
        }
     }
}

function addSongToSetlist(songId, setlistId) {
     var songId = getObject(songId).objectId;
     var setlistId = getSetlist(setlistId).objectId;

     var setlistObject = Backendless.Persistence.of(Setlists).findById(setlistId);
     var songObject = Backendless.Persistence.of(Songs).findById(songId);

     var stupidArray = setlistObject["setlistSongs"].push({objectId: songObject.objectId,___class: "Songs"});

//     console.log("Setlist: " + JSON.stringify(setlistObject));
//     console.log("Array: " + JSON.stringify(stupidArray));
//     console.log("Array: " + JSON.stringify(stupidArray));

     var updated = Backendless.Persistence.of(Setlists).save(setlistObject);
     console.log("Song added to Setlist: " + updated);
}

angular.isUndefinedOrNull = function(val) {
    return angular.isUndefined(val) || val === null
}

function saveEditedSetlist(info, id) {
    var objectId = getSetlist(id).objectId;
    var update = Backendless.Persistence.of(Setlists).findById(objectId);
        update["setlistName"] = info.name;
        update["setlistSpotify"] = info.spotify;
        update["setlistNotes"] = info.notes;

    var updated = Backendless.Persistence.of(Setlists).save(update);
    console.log("Setlist updated: " + updated);
}

function pinSetlist(setlistId) {
     var setlistId = getSetlist(setlistId).objectId;
     console.log(setlistId);
     var setlistObject = Backendless.Persistence.of(Setlists).findById(setlistId);

     var userObject = Backendless.Persistence.of(Backendless.User).findById("F2AC443E-7F6D-4D8E-FFD1-5BEA2E195300");

     var unpin = userObject["setlists"].splice(0,5);
     var stupidArray = userObject["setlists"].push({objectId: setlistObject.objectId,___class: "Setlists"});

     var updated = Backendless.Persistence.of(Backendless.User).save(userObject);
     console.log("Setlist added to User: " + JSON.stringify(updated));
}

function spliceFromSetlist(setlistId, songId) {

     var setlistId = getSetlist(setlistId).objectId;
     var setlistObject = Backendless.Persistence.of(Setlists).findById(setlistId);

     var stupidArray = setlistObject["setlistSongs"];

    for (var i = 0; i < stupidArray.length; i++) {
        if (stupidArray[i].songId === parseInt(songId)) {
          console.log("Found---");
          stupidArray.splice(i, 1);

           var updated = Backendless.Persistence.of(Setlists).save(setlistObject);
           console.log("Song spliced : " + JSON.stringify(stupidArray));
        }
    }
}

function spliceFromUser(userId, setlistId) {

     var userObject = Backendless.Persistence.of(Backendless.User).findById(userId);
     var stupidArray = userObject["setlists"];

    for (var i = 0; i <= stupidArray.length; i++) {
        if (stupidArray[i].setlistId === parseInt(setlistId)) {
              console.log("Found---");
              stupidArray.splice(i, 1);

           var updated = Backendless.Persistence.of(Backendless.User).save(userObject);
           console.log("Song spliced : " + JSON.stringify(stupidArray));

           return;
        } else {
            console.log("Request not found.");
        }
    }
}

function retrieveSearched(tagId) {
     var setlistObject = Backendless.Persistence.of(Setlists).findById(setlistId);
     var songObject = Backendless.Persistence.of(Songs).findById(songId);

     var stupidArray = setlistObject["setlistSongs"].push({objectId: songObject.objectId,___class: "Songs"});

     var updated = Backendless.Persistence.of(Setlists).save(setlistObject);
     console.log("Song added to Setlist: " + updated);
}

angular.isUndefinedOrNull = function(val) {
    return angular.isUndefined(val) || val === null
}

function processSheetMusic(info, id) {
    var songId = getObject(id).objectId;

    var collect = info.match(/[\"].+[\"]/gi);
        collect = JSON.stringify(collect).replace(/[\"]/gi, '').replace(/\\/gi, '\"').replace(/\ /g, '_');;

    var sheet = info;
    var lyrics = sheet.replace(/\[[^ ]\]/g, '').replace(/\[.[a-z#\d]+\]/g, '').replace(/(\[.\/.)+\]/g, '').replace(/\ (?=([a-z0-9]*">))/g, '_');
    var chords = sheet.replace(/[^[\n\r\ \]](?![^[\]]*])/g, " ").replace(/[\[\]]/g, "");
    var headers = sheet.replace(/[^\<\>\n\r](?![^\<\>]*>)/g, '').replace(/<.[^.>]+(?=\=\")/g, '').replace(/[="]/g, '').replace(/(<\/a\>)/g, '').replace(/>/g, ':');

    var update = Backendless.Persistence.of(Songs).findById(songId);
        update["songLyrics"] = lyrics;
        update["songSheet"] = sheet;
        update["songChords"] = chords;
        update["songSections"] = collect;
        update["songHeaders"] = headers;
    var updated = Backendless.Persistence.of(Songs).save(update);
    console.log("Sheet processed: \n" + chords);
}

function saveEditedRoles(info, id) {
    var objectId = getSetlist(id).objectId;
    var update = Backendless.Persistence.of(Setlists).findById(objectId);
        update["setlistNotes"] = info.notes;
    var setlistRoles;

    console.log(update['setlistRoles']);
        setlistRoles = JSON.parse(update['setlistRoles']);
        var arr = [];

        for(var x in setlistRoles){
          arr.push(setlistRoles[x]);
        }

        var role = {roleName: info.roleName, roleUser: info.roleUser};
        arr.push(role);

        update["setlistRoles"] = JSON.stringify(arr);


    var updated = Backendless.Persistence.of(Setlists).save(update);
    console.log("Setlist updated: " + updated);
}

function transposeUp(id) {
var songChords = getObject(id).songChords;
    songChords = songChords.replace(/A(?=[^#&*])/g, 'A*').replace(/A#/g, 'B&');
    songChords = songChords.replace(/B(?=[^#&*])/g, 'C&');
    songChords = songChords.replace(/C(?=[^#&*])/g, 'C*').replace(/C#/g, 'D&');
    songChords = songChords.replace(/D(?=[^#&*])/g, 'D*').replace(/D#/g, 'E&');
    songChords = songChords.replace(/E(?=[^#&*])/g, 'F&');
    songChords = songChords.replace(/F(?=[^#&*])/g, 'F*').replace(/F#/g, 'G&');
    songChords = songChords.replace(/G(?=[^#&*])/g, 'G*').replace(/G#/g, 'A&');
    songChords = songChords.replace(/[*]/g, '#').replace(/\&/g, '');

var objectId = getObject(id).objectId;
var update = Backendless.Persistence.of(Songs).findById(objectId);
    update["songChords"] = songChords;
    update = Backendless.Persistence.of(Songs).save(update);

}

function transposeDown(id) {
var songChords = getObject(id).songChords;
    songChords = songChords.replace(/A(?=[^#&*])/g, 'G*').replace(/A#/g, 'A&');
    songChords = songChords.replace(/B(?=[^#&*])/g, 'A&');
    songChords = songChords.replace(/C(?=[^#&*])/g, 'B&').replace(/C#/g, 'C&');
    songChords = songChords.replace(/D(?=[^#&*])/g, 'C*').replace(/D#/g, 'D&');
    songChords = songChords.replace(/E(?=[^#&*])/g, 'D*');
    songChords = songChords.replace(/F(?=[^#&*])/g, 'E&').replace(/F#/g, 'F&');
    songChords = songChords.replace(/G(?=[^#&*])/g, 'G*').replace(/G#/g, 'G&');
    songChords = songChords.replace(/[*]/g, '#').replace(/\&/g, '');
console.log(songChords);

var objectId = getObject(id).objectId;
var update = Backendless.Persistence.of(Songs).findById(objectId);
    update["songChords"] = songChords;
    update = Backendless.Persistence.of(Songs).save(update);
}

function sendMail() {
    var successCallback = function( response ) {
      console.log( "[ASYNC] message has been sent" );
    };
     
    var failureCallback = function( fault ) {
      console.log( "Error - " + fault.message );
    };
     
    // prepare message bodies (plain and html) and attachment
    var bodyParts = new Bodyparts();
    bodyParts.textmessage = "Check out this awesome code generation result";
    bodyParts.htmlmessage = "Check out this <b>awesome</b> code generation result";
    var attachments = [];
     
    // asynchronous call
    var responder = new Backendless.Async( successCallback, failureCallback );
    Backendless.Messaging.sendEmail( "Backendless code gen", bodyParts, [ "maoiwendell@yahoo.com" ], attachments, responder );
}

var offlineSongs = [];
function pushOffline(songObject) {
    offlineSongs.push(songObject);
    window.localStorage.setItem("offlineSongs", JSON.stringify(offlineSongs));
    console.log(JSON.stringify(offlineSongs));
}

function editProfileRoles(id,info){
    var update = Backendless.Persistence.of(Backendless.User).findById(id);

    if(info.email != null) {
        update["email"] = String(info.email);
    }
    if(info.bandrole != null) {
        update["profileBandRole"] = String(info.bandrole);
    }
    var updated = Backendless.Persistence.of(Backendless.User).save(update);
    console.log("Song edited: " + updated);
}

function addRole(info) {
   var newRole = new Roles({
        roleName: info
    })

    var updated = Backendless.Persistence.of(Roles).save(newRole);
    console.log("Role saved: " + updated);
}