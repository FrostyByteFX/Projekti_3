function loadLeaderboard() {
$(document).ready(function(){
    var region = document.getElementById("region").value;
    const APIKEY = "RGAPI-119cc270-73cb-4c00-98d2-20f2005e9208"; //täytyy päivittää 24h välein kunnes saa Node.js serverin hoitamaan API kyselyt ja APIKEY on piilossa .env tiedostossa
                                                                //eikä näkyvissä käyttäjälle sivustolla.
    var url = "https://"+region+".api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key="+APIKEY;
    /*
    Haetaan Riot Games API:sta käyttäjän valitseman alueen perusteella kaikki tän hetkiset top challenger pelaajat eli korkeimman tason/rankin pelaajat.
    Tieto tulee JSON muodossa ja käsittelen hakemisen jqueryllä ja käytän googlen hostaamaa jquery kirjastoa html tiedossa lähteenä.
    */
    $.get( url, function( data ) {
        $( ".result" ).html( data );
        
        Ladder = data;
        var LadderLenght = Ladder.entries.length; /*LadderLenght on tärkeä myöhemmin, sillä eri regioneilla eli servereillä on eri määrä pelaajia, esimerkiksi EUW joka voidaan lukea
        niin sanotuksi major region, jossa pelaa noin 3 miljoonaa pelaajaa ranked ladderillä, kun taas RU serverillä saattaa olla vain 200 tuhatta pelaajaa
        siksi Challenger EUW:llä on 300 pelaajaa ja RU:lla vain 54.*/
        
        /*
        Koska tiedo, joka tulee JSON muodossa Riot Games API:ltä ei ole järjestetty LP mukaan eli sijoituksen mukaiseen järjestykseen. Tämä saadaan sort komennolla aikaan,
        vertaamalla lp määriä toisiinsa ja laittamalla suuremman lp arvon ylös ja pienemmän alas. 
        */
        
        function compare(a, b) {
            return b.leaguePoints - a.leaguePoints;
        }
        Ladder.entries.sort(compare); 

        var addhere = document.getElementById("addhereid");

        var addplayers = document.getElementById("addhereplayer");

        var addonlytop3 = document.getElementById("onlytop3");

        $("#Leaderboard").remove(); //poistetaan elementti, sillä jos EUW haun tekee ensimmäiseksi niin luodaan 300 paikkaa käyttäjille ja jos tekee RU haun sen jälkeen niin jää
                                    //tyhjiä paikkoja muuten.
        var Leader = document.createElement("div");
                Leader.id="Leaderboard";
                addhere.appendChild(Leader);
                Leader.classList.add("contentLeaderboard");
                
        $("#Player-count").remove();
        var playersCreate = document.createElement("div");
            playersCreate.id="Player-count";
            addplayers.appendChild(playersCreate);

        $("#Leaderboardrest").remove()
        var Leaderrest = document.createElement("div");
        Leaderrest.id="Leaderboardrest";
        addonlytop3.appendChild(Leaderrest);
        Leaderrest.classList.add("contentLeaderboard");

        
        var players = document.createElement("p");
            players.id = "playercount";
                playersCreate.appendChild(players);
            players.classList.add("uinav");
            
        /*
        Stwitch muutetaan region tagin, joka on muotoa euw1 tai eun1 tunnuksilla tunnetut arvot, joilla voidaan hakea Riot Games API:stä oikea data url:än avulla, mutta käyttäjälle
        näytettävä sivussa teksti pelaaja määrästä, esim "300 PLAYERS IN EUW CHALLENGER LADDER", jossa numero "300" ja "EUW" muutetaan kyseisen regionin mukaiseksi.
        siksi switch lauseella katsotaan valittu region ja muutetaan tagi euw1 = EUW ja muille region nimille tehdään samoin. Numero saadaan tulostamalla aikaisemmin katsottu 
        LadderLenght.
        */

            switch (region) {
                case "euw1":
                    regionid = "EUW";
                    break;
                case "eun1":
                    regionid = "EUNE";
                    break;
                case "na1":
                    regionid = "NA";
                    break;
                case "br1":
                    regionid = "BR";
                    break;
                case "jp1":
                    regionid = "JP";
                    break;
                case "kr":
                    regionid = "KR";
                    break;
                case "ru":
                    regionid = "RU";
                    break;
                case "tr":
                    regionid = "TR";
                    break;
                case "oc1":
                    regionid = "OCE";
                    break;
                case "la1":
                    regionid = "LAN";
                    break;
                case "la2":
                    regionid = "LAS";
                    break;
                default:
                    break;
                } 

            document.getElementById("playercount").innerHTML = 
            LadderLenght + " PLAYERS IN "+ regionid + " CHALLENGER LADDER";

            //Pelaaja määrä saadaan navigoinnin alle tulostettuna.
        
        for (i = 0; i < LadderLenght; i++) { //for lause kulkeen niin kauan kunnes kaikki pelaajat on tulostettu ja tämä määrittyy LadderLenght pituuden mukaiseksi.
            
            switch (i+1) //Lisätään i arvoon 1 sillä i on 0 ja rank 0 ei ole olemassa, joten lisään i arvoon +1 jotta saan elementit luotua rank1,rank2,rank3 erikseen erottuakseen muista.
            {
                case 1:
                var location = document.getElementById("Leaderboard");
            
                var rank1 = document.createElement("div"); 
                        $(rank1).attr("id", "Rank" + (i+1));
                        location.appendChild(rank1); 
                        $(rank1).addClass("r1Leaderboard-bg");
        
                var r1leftdiv = document.createElement("div");
                        $(r1leftdiv).attr("id", "r1LDiv" + i);
                        rank1.appendChild(r1leftdiv);
                        $(r1leftdiv).addClass("r1left-bg");
        
                var r1rightdiv = document.createElement("div");
                        r1rightdiv.id = "r1RDiv" + i;
                        rank1.appendChild(r1rightdiv);
                        r1rightdiv.classList.add("r1right-bg");
        
                
                var r1ID = document.createElement("p");
                        r1ID.id = "r1ID-div" + i;
                            r1leftdiv.appendChild(r1ID);
                        r1ID.classList.add("r1rankstyle");
                            document.getElementById("r1ID-div" + i).innerHTML = 
                            "Rank "+ (i + 1) + ". " + Ladder.entries[i].summonerName;
        
                var r1win = document.createElement("p");
                        r1win.id = "r1wins" + i;
                            r1rightdiv.appendChild(r1win);
                            r1win.classList.add("r1pleaderboard");
                            var wins = Ladder.entries[i].wins;
                            var losses = Ladder.entries[i].losses;
                            var games = losses + wins;
                            var winrate = wins/games*100;
                            document.getElementById("r1wins" + i).innerHTML = 
                            "Win Ratio " + winrate.toFixed(0) + "%"; 
        
                var r1LP = document.createElement("p");
                        r1LP.id = "r1LP" + i;
                            r1rightdiv.appendChild(r1LP);
                        r1LP.classList.add("r1pstyler");
                            document.getElementById("r1LP" + i).innerHTML = 
                            "LP " + Ladder.entries[i].leaguePoints;

                    break;
                case 2:
                    var location = document.getElementById("Leaderboard");
                    
                    var rank2 = document.createElement("div");
                        $(rank2).attr("id", "Rank" + (i+1));
                                location.appendChild(rank2); 
                                rank2.classList.add("r2Leaderboard-bg"); 
                
                    var r2leftdiv = document.createElement("div");
                                r2leftdiv.id = "r2LDiv" + i;
                                rank2.appendChild(r2leftdiv);
                                r2leftdiv.classList.add("r2left-bg");
                
                    var r2rightdiv = document.createElement("div");
                                r2rightdiv.id = "r2RDiv" + i;
                                rank2.appendChild(r2rightdiv);
                                r2rightdiv.classList.add("r2right-bg");
                
                        
                    var r2ID = document.createElement("p");
                                r2ID.id = "r2ID-div" + i;
                                    r2leftdiv.appendChild(r2ID);
                                r2ID.classList.add("r2rankstyle");
                                    document.getElementById("r2ID-div" + i).innerHTML = 
                                    "Rank "+ (i + 1) + ". " + Ladder.entries[i].summonerName;
                
                    var r2win = document.createElement("p");
                                r2win.id = "r2wins" + i;
                                    r2rightdiv.appendChild(r2win);
                                    r2win.classList.add("r2pleaderboard");
                                    var wins = Ladder.entries[i].wins;
                                    var losses = Ladder.entries[i].losses;
                                    var games = losses + wins;
                                    var winrate = wins/games*100;
                                    document.getElementById("r2wins" + i).innerHTML = 
                                    "Win Ratio " + winrate.toFixed(0) + "%";
                
                    var r2LP = document.createElement("p");
                                r2LP.id = "r2LP" + i;
                                    r2rightdiv.appendChild(r2LP);
                                r2LP.classList.add("r2pstyler");
                                    document.getElementById("r2LP" + i).innerHTML = 
                                    "LP " + Ladder.entries[i].leaguePoints;

                    break;
                case 3:
                    var location = document.getElementById("Leaderboard");
                
                    var rank3 = document.createElement("div");
                        $(rank3).attr("id", "Rank" + (i+1));
                                location.appendChild(rank3); 
                                rank3.classList.add("r3Leaderboard-bg"); 
                
                    var r3leftdiv = document.createElement("div");
                                r3leftdiv.id = "r3LDiv" + i;
                                rank3.appendChild(r3leftdiv);
                                r3leftdiv.classList.add("r3left-bg");
                
                    var r3rightdiv = document.createElement("div");
                                r3rightdiv.id = "r3RDiv" + i;
                                rank3.appendChild(r3rightdiv);
                                r3rightdiv.classList.add("r3right-bg");
                
                        
                    var r3ID = document.createElement("p");
                                r3ID.id = "r3ID-div" + i;
                                    r3leftdiv.appendChild(r3ID);
                                r3ID.classList.add("r3rankstyle");
                                    document.getElementById("r3ID-div" + i).innerHTML = 
                                    "Rank "+ (i + 1) + ". " + Ladder.entries[i].summonerName;
                
                    var r3win = document.createElement("p");
                                r3win.id = "r3wins" + i;
                                    r3rightdiv.appendChild(r3win);
                                    r3win.classList.add("r3pleaderboard");
                                    var wins = Ladder.entries[i].wins;
                                    var losses = Ladder.entries[i].losses;
                                    var games = losses + wins;
                                    var winrate = wins/games*100;
                                    document.getElementById("r3wins" + i).innerHTML = 
                                    "Win Ratio " + winrate.toFixed(0) + "%";
                
                    var r3LP = document.createElement("p");
                                r3LP.id = "r3LP" + i;
                                    r3rightdiv.appendChild(r3LP);
                                r3LP.classList.add("r3pstyler");
                                    document.getElementById("r3LP" + i).innerHTML = 
                                    "LP " + Ladder.entries[i].leaguePoints;
                    break;
                default:
            var location = document.getElementById("Leaderboardrest");
            
            var Bg = document.createElement("div");  //luodaan uusi div, jota käytetään taustana, muille elementeille jotka luodaan tämän jälkeen
                $(Bg).attr("id", "Rank" + (i+1));    
                //Bg.id = "Bg" + i; // + i ottaa kyseisen i arvon ja lisää sen Bg perään luoden monta eri id:llä omaavaa elementtiä, joihin voidaan loopin aikana myöhemmin viitata.
                location.appendChild(Bg); //yhdistetään Bg elementti osaksi events-divc divin sisälle.
                Bg.classList.add("Leaderboard-bg"); //luodaan uusi class, jossa voidaan css tiedostossa myöhemmin määritellä eri tyyli asetuksia.

            var leftdiv = document.createElement("div");
                leftdiv.id = "LDiv" + i;
                Bg.appendChild(leftdiv);
                leftdiv.classList.add("left-bg");

            var rightdiv = document.createElement("div");
                rightdiv.id = "RDiv" + i;
                Bg.appendChild(rightdiv);
                rightdiv.classList.add("right-bg");

        
            var ID = document.createElement("p");
                ID.id = "ID-div" + i;
                    leftdiv.appendChild(ID);
                ID.classList.add("rankstyle");
                    document.getElementById("ID-div" + i).innerHTML = 
                    (i + 1) + ". " + Ladder.entries[i].summonerName;

            var win = document.createElement("p");
                win.id = "wins" + i;
                    rightdiv.appendChild(win);
                    win.classList.add("pleaderboard");
                    var wins = Ladder.entries[i].wins;
                    var losses = Ladder.entries[i].losses;
                    var games = losses + wins;
                    var winrate = wins/games*100;
                    document.getElementById("wins" + i).innerHTML = 
                    "Win Ratio " + winrate.toFixed(0) + "%";

            var LP = document.createElement("p");
                LP.id = "LP" + i;
                    rightdiv.appendChild(LP);
                LP.classList.add("pstyler");
                    document.getElementById("LP" + i).innerHTML = 
                    "LP " + Ladder.entries[i].leaguePoints; 
                    break;
            }
        }
    })
  });
}
