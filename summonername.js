function LoadSummoner (summonername) {
var region = document.getElementById("region").value;
/*
Region tulee käyttäjän valitseman alueen perusteella ja .value ottaa option tagissä määritetyn value arvon, joka on siis eri kuin käyttäjän näkemä teksti dropdown valikossa.
Regioneita on League of Legends tai LoL pelissä monia ja peliä pelaavat yleensä tietävät oman regionin nimensä lyhenteen avulla esimerkiksi EUW on Europe West. 
*/
const APIKEY = "RGAPI-b7de62f4-8513-42ea-ad14-832b6c70454a";
/*
APIKEY täytyy päivittää 24h välein niin kauan kun sivustosta ei ole ilmoitettu Riot Games yhtiölle. Tulevaisuudessa tekisin node.js avulla serverin sivustolle, joka hoitaisi 
kaikki Riot Games API tietokannasta pyydetyt haut ja APIKEY olisi talletettuna johonkin .env tiedostoon, jossa olisi piilotettuna APIKEY enviroment variablena eli APIKEY ei olisi
koodissa suoraan näkyvillä vaan piilotettuna tiedostoon ja tällöin sen voisi myös hakea yhdestä tiedostosta kaikkiin javascripteihin.
*/
var url = "https://"+region+".api.riotgames.com/lol/summoner/v4/summoners/by-name/"+summonername+"?api_key="+APIKEY; 
/*
url hakee Riot Games API:sta League of Legends nimisen pelin käyttäjänimen eli summonername nimen tiedot JSON muodossa, joita voidaan käsitellä myöhemmin.
url sisältää käyttäjän valitseman "region (EUW,EUNE,NA... jne)" ja "summonername" eli käyttäjänimi tuodaan funtioon parametrinä eli, kun käyttäjä syöttää haluamansa käyttäjätilin
html tiedostossa olevaan teksti kenttään ja hakee painamalla *enter* tai painamalla nappia joka suorittaa funtion "LoadSummoner (summonername.value)" jossa lähetetään tälle funtiolle
tekstikentässä oleva value eli kirjoitettu teksti. Tekstikentän pituuden voisi määrittää samalla tavalla, kuin Riot Games määrittää summonername pituudeksi vähintää 3 merkkiä ja 
maksimissaan 16 merkkiä. 
*/

//tyhjennetään kentät, joissa voi olla aikaisemmalta käyttäjätieto haun jälkeen tietoa.
document.getElementById("summonernames").innerHTML =
"";
document.getElementById("summonerlevel").innerHTML =
"";
document.getElementById("rank").innerHTML =
"";
document.getElementById("lp").innerHTML =
"";
document.getElementById("wr").innerHTML =
"";
document.getElementById("icon").src =
"";
document.getElementById("icon").height=
"0";
document.getElementById("icon").width=
"0";
document.getElementById("rankicon").src =
"";
document.getElementById("rankicon").height=
"";
document.getElementById("rankicon").width=
"";

document.getElementById("contenthere").style.display = "block"; /*contenthere class .content on piilotettu normaalisti, mutta haettaessa se tulisi olla näkyvissä, koska tämän divin 
                                                                sisälle sijoitetaan kaikki muu tieto*/




fetch(url).then((response) => {
return response.text();
})
.then((data) => {
    var obj = JSON.parse(data);
    
    const icon = "https://icons-lol.s3.eu-north-1.amazonaws.com/profileicon/" + obj.profileIconId + ".png"; /*Icon on käyttäjätilin profiilikuva ja olen ladannut Riot Games API:stä
    kyseisen League of Legends patch 10.10 summoner iconit eli käyttäjä kuvat Amazon Web Services pilvipalveluun, koska silloin pystyin helposti lataamaan koko kansion ja kuvien
    osoite on aina sama ja niitä voi hakea kuvien nimillä urlista, joka mahdollistaa helpon profiilikuvan hakemisen. kun url haetaan palautuu JSON tiedosto, jossa on tietoa
    käyttäjästä kuten profiili kuva ID muodossa ja sen voi hakea JSON tiedostosta .profileIconId. Koska AWS palvelimella on kuvat samojen ID mukaan nimetty voin hakea suoraan
    oikean profiili kuvan, jonka käyttäjä on valinnut pelin sisällä lisäämällä icon url loppuun vain .png */

    document.getElementById("icon").height= //määritän profiilikuvan korkeuden pienemmäksi kuin normaali 300 korkeus
    "100";
    document.getElementById("icon").width= //määritän profiilikuvan leveys pienemmäksi kuin normaali 300 leveys
    "100";
    
    document.getElementById("icon").src = //sijoitetaan icon img tagiin src:hen linkki profiili kuvaan.
    icon;

    /*
    Testataan onko icon saatavissa, sillä kaikki patch 10.10 ei ole uusin päivitys pelissä ja 10.11 saa ladattua vain jos rekisteröi tuotteen Riot Games:sin API:ssä, jolloin
    minulla tulisi olla node.js palvelin ympäristö toimimassa sivustolla, koska APIKEY ei saa olla näkyvissä rekisteröidyissä sivustoissa tai palveluissa. Mutta koska AWS palvelin
    ei sisällä kaikkia profiili kuvia, niin siinä tapauksessa jos tapahtuu virhe image tagin sisällä olevassa src:ssä niin sijoitan profiilikuvaksi alemmassa if lauseessa määritellyn
    kuvan. Tämän pitäisi vaikuttaa vain pelaajiin, joilla on uudessa päivityksessä valitsemia profiili kuvia. Jos haetaan myös esimerkiksi käyttäjää, jota ei ole olemassa
    palvelin palauttaa 404 (Not Found) ja tällöin myös kuva id:tä ei voida hakea JSON tiedostosta.
    */
    icontest = document.getElementById("icon");

    icontest.onerror = function () {
        if (icontest.onerror = true) { //jos icon kuva elementissä on ongelma eli on true niin silloin tapahtuu kuvan muuttaminen 3504.png:hen ja kirjoitetaan consoleen ongelma.
        console.log(this.src + " can't be loaded."); //kertoo consolessa, jos kuvaa ei voi ladata
        document.getElementById("icon").src =
        "https://icons-lol.s3.eu-north-1.amazonaws.com/profileicon/3504.png";
        }
    }
    


    /*Seuraavaksi summonernames id:llä olevaan div elemennttin kirjoitetaan HTML:län silälle "Summoner name " ja haettu Riot Games API:stä JSON eli obj. JSON tiedosta .name on
    käyttäjänimi eli summonername. */
    document.getElementById("summonernames").innerHTML = 
    "Summoner name " + obj.name;                            
    
    /*Teen tämän saman myös käyttäjän profiilin tason eli minkä levelinen kyseinen käyttäjä on pelissä. 
    */

    document.getElementById("summonerlevel").innerHTML =
    "Current Summoner level " + obj.summonerLevel;
    
    var id = obj.id; //määritän JSON tiedosta id eli Riot Games API:stä haetun profiilin käyttäjän piilotetun id:n

        /*
        Tarvitsen tätä id:tä että voin hakea eri Riot Games API moduulista tiedot kyseisen pelaajan rankki eli kilpailullisen sijoituksen tiedot, kuten tämän hetkinen rank kyseisellä
        ranked seasonilla. Tähän tarvitaan piilotettu id, jonka saa vain haettua profiilitiedoista, jonka hain aikaisemmassa fetch haussa JSON muodossa.

        idurl on sama kuin url eli hakee region ja apikey, mutta käyttäjänimen sijaan sijoitetaan id, jonka saimme käyttäjä tilin JSON tiedosta.
        */
    
        var idurl = "https://"+region+".api.riotgames.com/lol/league/v4/entries/by-summoner/"+id+"?api_key="+APIKEY; 
        fetch(idurl).then((response) => {
            return response.text();
            })
        .then((data) => {

        var ranked = JSON.parse(data);
        
        /* 
        Koska pelissä League of Legends on 2 eri ranked ladderiä eli 2 eri peli muotoa rankki sijoituksille, jotka ovat FLEX ja SOLOQ.
        Tämän takia, jos haluan tietää vain SOLOQ sijoituksen kyseisestä pelaajasta tulee minun eka tietää JSON tiedon, joka palautuu niin kuinka monta eri niin sanottua taulua
        kyseisessä JSON tiedossa on? Koska jos käyttäjä on pelannut molempia pelimuotoja palautuu kaksi eri taulua 0 ja 1 jotka voidaan avata. Jos käyttäjä on pelannut molempia 
        pelimuotoja niin 0 sisältää tiedot Ranked SOLOQ ja FLEX on sijoitettu tauluun 1.
        */
        var count = Object.keys(ranked).length;
    
    if (count > 0) { /*jos pelaajalla on soloq tai flex rankki niin silloin count on > 0 jolloin tapahtuu if lauseen sisällä hankittava muodostettava data sivulle ja jos näin ei ole
        niin silloin tämä skipataan kokonaan koska pelaajalla ei ole rankkia.*/
        var i = 0; //etsitään JSON tiedosta vain taulun 0 tiedot eli Ranked SoloQ jos tämän vaihtaisi 1 niin silloin löydettäisiin flex rankin sijoitukset.
            lolrank = ranked[i].tier; //.tier sisältää pelaajan rankin ja sijoitan sen muuttujaan objectiin lolrank
            document.getElementById("rank").innerHTML =
            "Current solo rank: " + lolrank + 
            " " + ranked[i].rank + /*ranked[0].rank sisältää rankkin roomalaisen numeron eli jokaisesta rankista on roomalaisin numeroin IV-I eli 4:sesta 1:seen ja pienempi on
                                     korkeampi rankki eli esimerksiki GOLD IV < GOLD I ladderillä*/
            ", LP " + ranked[i].leaguePoints; /*Kertoo kuinka monta pistettä kyseissellä pelaajalla on ladderillä. 100LP on maksimi ja 0lp on minimi per ranked tier.

        
            /*
            Seuraavassa switch lauseessa haetaan rankin eli lolrank avulla jokaiselle rankille vastaavan pelissä olevan kuvan jotka ovat myös uploadattu aws s3 palvelimelle.
            rankin nimi saadaan JSONista ranked[0].tier sijainnista ja jokaisessa casessa switch lauseessa verrataan kyseiseen rankin nimeen.
            */
            
            switch (lolrank)
            {
                case "CHALLENGER":
                    document.getElementById("rankicon").height=
                    "100";
                    document.getElementById("rankicon").width=
                    "100";
                    document.getElementById("rankicon").src =
                    "https://icons-lol.s3.eu-north-1.amazonaws.com/ranked-emblems/Emblem_Challenger.png";
                    break;
                case "GRANDMASTER":
                    document.getElementById("rankicon").height=
                    "100";
                    document.getElementById("rankicon").width=
                    "100";
                    document.getElementById("rankicon").src =
                    "https://icons-lol.s3.eu-north-1.amazonaws.com/ranked-emblems/Emblem_Grandmaster.png";
                    break;
                case "MASTER":
                    document.getElementById("rankicon").height=
                    "100";
                    document.getElementById("rankicon").width=
                    "100";
                    document.getElementById("rankicon").src =
                    "https://icons-lol.s3.eu-north-1.amazonaws.com/ranked-emblems/Emblem_Master.png";
                    break;
                case "DIAMOND":
                    document.getElementById("rankicon").height=
                    "100";
                    document.getElementById("rankicon").width=
                    "100";
                    document.getElementById("rankicon").src =
                    "https://icons-lol.s3.eu-north-1.amazonaws.com/ranked-emblems/Emblem_Diamond.png";
                    break;
                case "PLATINUM":
                    document.getElementById("rankicon").height=
                    "100";
                    document.getElementById("rankicon").width=
                    "100";
                    document.getElementById("rankicon").src =
                    "https://icons-lol.s3.eu-north-1.amazonaws.com/ranked-emblems/Emblem_Platinum.png";
                    break;
                case "GOLD":
                    document.getElementById("rankicon").height=
                    "100";
                    document.getElementById("rankicon").width=
                    "100";
                    document.getElementById("rankicon").src =
                    "https://icons-lol.s3.eu-north-1.amazonaws.com/ranked-emblems/Emblem_Gold.png";
                    break;
                case "SILVER":
                    document.getElementById("rankicon").height=
                    "100";
                    document.getElementById("rankicon").width=
                    "100";
                    document.getElementById("rankicon").src =
                    "https://icons-lol.s3.eu-north-1.amazonaws.com/ranked-emblems/Emblem_Silver.png";
                    break;
                case "BRONZE":
                    document.getElementById("rankicon").height=
                    "100";
                    document.getElementById("rankicon").width=
                    "100";
                    document.getElementById("rankicon").src =
                    "https://icons-lol.s3.eu-north-1.amazonaws.com/ranked-emblems/Emblem_Bronze.png";
                    break;
                case "IRON":
                    document.getElementById("rankicon").height=
                    "100";
                    document.getElementById("rankicon").width=
                    "100";
                    document.getElementById("rankicon").src =
                    "https://icons-lol.s3.eu-north-1.amazonaws.com/ranked-emblems/Emblem_Iron.png";
                    break;
                default:
                    break;
            }
                
            
            document.getElementById("lp").innerHTML =
            "League Points " + ranked[i].leaguePoints;
            
            /*
            Haetaan JSON tidosta voitot ja häviöt ja lasketaan voittosuhde niin perusteella. 
            */
            var wins = ranked[i].wins;          
            var losses = ranked[i].losses;
            var games = losses + wins;
            var winrate = wins/games*100;
            
            document.getElementById("wr").innerHTML =
            "Wins " + wins + " Losses " + losses + " Winrate " + winrate.toFixed(0) + "%";
            }else{ //tämä else lause on vain siksi että jos ei ole pelannut rankkia niin laitetaan unranked niminen kuva rankki kuvan tilalle.
            document.getElementById("rankicon").height=
            "100";
            document.getElementById("rankicon").width=
            "100";
            document.getElementById("rankicon").src =
            "https://icons-lol.s3.eu-north-1.amazonaws.com/ranked-emblems/Unranked.png";
            }
        })
        }
    );
}
