function LoadGame (summonername) {
var region = document.getElementById("region").value;
const APIKEY = "RGAPI-9b808ada-4523-43c7-a063-92048821f22b";
var url = "https://"+region+".api.riotgames.com/lol/summoner/v4/summoners/by-name/"+summonername+"?api_key="+APIKEY;


document.getElementById("onko").innerHTML =
"";
document.getElementById("game1").innerHTML =
"";


fetch(url).then((response) => {
return response.text();
})
.then((data) => {
var obj = JSON.parse(data);
var id = obj.id;

var idurl = "https://"+region+".api.riotgames.com/lol/spectator/v4/active-games/by-summoner/"+id+"?api_key="+APIKEY;
fetch(idurl).then((response) => {
    return response.text();
    })
.then((data) => {
 var game = JSON.parse(data);
 var count = Object.keys(game).length;

 var statusurl = "https://"+region+".api.riotgames.com/lol/spectator/v4/active-games/by-summoner/"+id+"?api_key="+APIKEY;
fetch(statusurl).then((response) => {
    return response.status;
    })
.then((data) => {
 var statusgame = data;


 if (statusgame == 200) {
    document.getElementById("onko").innerHTML =
    "On pelissä!";
    document.getElementById("game1").innerHTML =
    "Pelimuoto " + game.gameMode + " Summoners rift" + count;
 }else{
    document.getElementById("onko").innerHTML =
    "Ei ole pelissä!";


 }
})


})
});}
