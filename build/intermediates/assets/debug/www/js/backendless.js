var APPLICATION_ID = '48F7E0A1-E799-EE7C-FF56-D3687FF1BF00',
    SECRET_KEY = 'B68610CE-62FD-34D1-FFD2-EF348786DD00',
    VERSION = 'v1';

Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);

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

}

function Setlists(args) {
    args = args || {};
    this.setlistId = args.setlistId || "";
    this.setlistName = args.setlistName || "";
    this.setlistGuitar1 = args.setlistGuitar1 || "";
    this.setlistGuitar2 = args.setlistGuitar2|| "";
    this.setlistBass = args.setlistBass || "";
    this.setlistDrums = args.setlistDrums || "";
    this.setlistKeyboard = args.setlistKeyboard || "";
    this.setlistVocals1 = args.setlistVocals1 || "";
    this.setlistVocals2 = args.setlistVocals2 || "";
    this.setlistSongs = args.setlistSongs || {};
    this.setlistNotes = args.setlistNotes || "";
    this.isActive = args.isActive || "";
}


//USERS
function initUsers() {
    var user = new Backendless.User();
        user.email = "tkmdrhtt@yahoo.com";
        user.username = "Jilles";
        user.password = "Muireadhach";
        user.userId = 1;
    Backendless.UserService.register( user );

    var user1 = new Backendless.User();
        user1.email = "vocalist@yahoo.com";
        user1.username = "Fionnbharr Ó Corráin";
        user1.password = "Muireadhach";
        user1.isBass = true;
        user1.isVocals = true;
        user1.userId = 2;
    Backendless.UserService.register( user1 );

    var user2 = new Backendless.User();
        user2.email = "guitarist@yahoo.com";
        user2.username = "Síle Ní Chathasaigh";
        user2.password = "Muireadhach";
        user2.isGuitar = true;
        user2.userId = 3;
    Backendless.UserService.register( user2 );

    var user3 = new Backendless.User();
        user3.email = "drummer@yahoo.com";
        user3.username = "Catríona Ní Dhubhghaill";
        user3.password = "Muireadhach";
        user3.isDrummer = true;
        user3.userId = 4;
    Backendless.UserService.register( user3 );

    var user4 = new Backendless.User();
        user4.email = "personeOne@yahoo.com";
        user4.username = "Mánus Ó Cadhla";
        user4.password = "Muireadhach";
        user4.isGuitar = true;
        user4.isBass = true;
        user4.userId = 5;
    Backendless.UserService.register( user4 );

    var user5 = new Backendless.User();
        user5.email = "personTwo@yahoo.com";
        user5.username = "Rónán Mac an t-Saoir";
        user5.password = "Muireadhach";
        user5.isDrummer = true;
        user5.isVocalist = true;
        user5.userId = 6;
    Backendless.UserService.register( user5 );

    var user6 = new Backendless.User();
        user6.email = "personThree@yahoo.com";
        user6.username = "Aisling Ní Raghallaigh";
        user6.password = "Muireadhach";
        user6.isDrummer = true;
        user6.isVocalist = true;
        user6.userId = 7;
    Backendless.UserService.register( user6 );
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

    var updated = Backendless.Persistence.of(Songs).save(update);
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
        isActive: 1
    })
    var updated = Backendless.Persistence.of(Songs).save(newSong);
    console.log("Song saved: " + updated);
}

function saveNewSetlist(info) {
    var newSetlist = new Setlists({
        setlistId: parseInt(info.count),
        setlistName: String(info.name),
        setlistVocals1: String(info.vocals1),
        setlistVocals2: String(info.vocals2),
        setlistGuitar1: String(info.guitar1),
        setlistGuitar2: String(info.guitar2),
        setlistBass: String(info.bass),
        setlistKeyboard: String(info.keyboard),
        setlistDrums: String(info.drums),
        setlistNotes: String(info.notes),
        setlistSongs: [],
        isActive: 1
    })
    var updated = Backendless.Persistence.of(Setlists).save(newSetlist);
    console.log("Setlist saved: " + updated);
}

function deleteItem(id) {
    var objectId = getObject(id).objectId;
    var update = Backendless.Persistence.of(Songs).findById(objectId);
        update["isActive"] = 0;
    var updated = Backendless.Persistence.of(Songs).save(update);
    console.log("Song deleted: " + updated);
}

function deleteSetlist(id) {
    var objectId = getSetlist(id).objectId;
    console.log(objectId);
    var update = Backendless.Persistence.of(Setlists).findById(objectId);
        update.isActive = 0;
    var updated = Backendless.Persistence.of(Setlists).save(update);
    console.log("Setlist deleted " + updated);
}

function getObject(songId) {
    var songs = Backendless.Persistence.of(Songs).find();
     for (var i = 0; i < songs.data.length; i++) {
        if (songs.data[i].songId === parseInt(songId)) {
          return (songs.data[i]);
        }
     }
}

function getSetlist(setlistId) {
    var setlists = Backendless.Persistence.of(Setlists).find();
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

     var stupidArray = setlistObject.setlistSongs;

        var newObject = Songs({
            objectId: String(songObject.objectId),
             ___class: "Songs"
        })

     var update = stupidArray.push(newObject);
     var updated = Backendless.Persistence.of(Songs).save(setlistObject);
     console.log("Song added to Setlist: " + updated);
}

angular.isUndefinedOrNull = function(val) {
    return angular.isUndefined(val) || val === null
}

function saveEditedSetlist(info, id) {
    var objectId = getSetlist(id).objectId;
    var update = Backendless.Persistence.of(Setlists).findById(objectId);
        update["setlistName"] = info.name;
        update["setlistNotes"] = info.notes;
    var updated = Backendless.Persistence.of(Setlists).save(update);
    console.log("Setlist updated: " + updated);
}