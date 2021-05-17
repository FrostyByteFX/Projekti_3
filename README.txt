############################################## statslol.gg ########################################################
1. Tiedostojen Sisältö
2. Projektin tarkoitus
3. Projektin sijainnit
4. Projektin Tulevaisuus
5. Tekijä

### 1. Tiedostojen Sisältö
index.html                    -- sisältää League of Legends API avulla pelaajan tilastojen hakemisen ja esittämisen.
gamelookup.html               -- sisältää League of Legends API:sta tällä hetkellä menevän peli tietojen hakemisen.
leaderboard.html              -- sisältää League of Legends API:stä haettu challenger pelaajat eli jokaisen käyttäjän 
                                 päättämän regionin parhaimmat pelaajat listana järjestettynä korkeimman sijoituksen
                                 perusteella.            
summonername.js               -- sisältää index.html tarvittavan javascriptin.
gamelookup.js                 -- sisältää gamelookup.html tarvittavan javascriptin.
leaderboard.js                -- sisältää leaderboard.html tarvittavan javascriptin.
EventListenerSummoner.js      -- sisältää toiminnallisuuden, jossa index.html sivulla olevan texti kentän sisällä
                                 voi lähettää lomakkeen enter nappulalla.
EventListenerGame.js          -- sisältää toiminnallisuuden, jossa gamelookup.html sivulla olevan texti kentän sisällä
                                 voi lähettää lomakkeen enter nappulalla.    
showbutton.js                 -- sisältää funktion, joka toggle nappulalla leaderboard.html sivulla oleva nappulalla
                                 näyttää vain top 3 pelaajaa tai näyttää kaikki pelaajat.
                             
style.css                     -- cascading style sheets tiedosto, joka kuvaa koko html tyylin ja sivuston ulkonäon.

### 2. Projektin tarkoitus
Projekti on luotu koulu ja harrastus projektina ja tarkoitus olisi jatkaa projektia tulevaisuudessa.

### 3. Projektin sijainnit
Github: https://github.com/FrostyByteFX/Projekti_3
Netlify: https://statslol.netlify.app

Projektissa käytetään myös Amazon Web Services eli AWS S3 tietokantaa, johon olen ladannut kyseisen League of Legends pelin "Data Dragon" 
paketti, joka sisältää League of Legends Patch 10.10 pelin profiili kuvia ja muita nettisivun kuviin/videoo tarvittavia tiedostoja.
Valitsin tämän hostin, koska pystyin lataamaan kansioita ja ne pitivät saman linkin ja kansion sisäiset kuvat säilyttivät nimensä url:ssä, 
jolloin niitä pystyy helposti hakemaan koodin sisällä.

### 4. Projektin Tulevaisuus
Projektin tulevaisuus olisi tehdä hyödyllinen sivusto League of Legends API avulla. 
Node.js serveri ympäristö olisi tarpeessa cors ongelmien välttämiseksi ja myös Riot API:sta saisi pysyvän APIKEYn, jos 
sivustolla ei olisi APIKEY näkyvissä julkisesti. Riot APIKEY on voimassa vain 24h ja tarkoitettu testaamaan projekteja
tarkoitus olisi luoda Node.js avulla serveri, joka hoitaisi API kyselyt Riot Games API:hin ja nettisivu tekisi nämä kyselyt
omalle Node.js serverille, joka ne hoitaisi. APIKEY tulisi olla myös piilotettuna koodista piilotetussa .env tiedostossa.

! 
Jos index sivua haluaa testata voi ensiksi etsiä leaderboard sivulta, jonkun pelaajan nimen ja kunhan varmistaa, että region on sama
niin voi hakea kyseisen pelaajan profiili tiedot (Esimerkiksi voi hakea pelaajaa "Long time no see" EUW regionilta). 
Olisin halunnut tehdä nappulan suoraan, joka näyttäisi pelaajan tiedot, mutta en ehtinyt kyseistä toiminnallisuutta saada toimimaan 
tähän versioon. Myös Index ja gamelookup sivut ovat joskus hitaita, koska niissä on video elementtejä jatkossa haluisin laittaa nappulan, 
josta voisi laittaa videon päälle jos haluaa, mutta muuten tausta olisi kuva. Myäs css tiedosto on todella sekava.
!

### 5. Tekijä
Tämän projektin on luonut Ville Vierros
Viimeiseksi päivitetty: 18:43:02 UTC Maanantai, 17 Toukokuuta 2021

############################################## statslol.gg ########################################################
