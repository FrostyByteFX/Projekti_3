$(document).ready(function(){ //.ready vain siksi että tapahtuu vasta kun document on valmis
$("#showid").click(function(){ //klikkaamalla showid nappulaa tapahtuu seuraava fuktio.

    $("#onlytop3").slideToggle(); //jquary toggle slide ominaisuuteen
    
    var show = document.getElementById("showid").innerHTML

    switch(show) { //vaihdetaan nappulan teksti
        case "Show top 3":
            document.getElementById("showid").innerHTML = 
            "Show all"; 
          break;
        case "Show all":
            document.getElementById("showid").innerHTML = 
            "Show top 3";
          break;
        default:
      }    
  });
});