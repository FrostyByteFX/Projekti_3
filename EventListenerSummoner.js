        /*
        Javascriptin tarkoituksena on mahdollistaa enter nappulan avulla käyttäjänimen lähettäminen summonername.js nimiseen LoadSummoner funtiolle.
        Tämä on extra toiminnallisuus ja tämä sama toteutuu nappia painamalla.
        */
        var enter = document.getElementById("summonername"); //Haetaan id summonername, joka on input tagi, joka on muodoltaan tekstiä.
            enter.addEventListener("keydown", function (enterkey) { //Luodaan aijemmin haetun tekstikenttään kuuntelija, joka toimii kun käyttäja painaa näppäimiä tietokoneella
        if (enterkey.key === "Enter") { //kun näppäin painallus on "Enter" niin silloin on painettu enter nappulaa näppäimiställä ja silloin suoritetaan if lauseen sisällä oleva
                                        //jos näppäin painallus ei ole enter silloin ei tehdä mitään. 
        var summonername = document.getElementById("summonername").value; //Haetaan tekstikentässä oleva teksti .value avulla ja tämä on käyttäjän kirjoittama käyttäjänimi
            LoadSummoner (summonername); // Lähetetään kirjoitettu käyttäjänimi paramertinä summonername.js olevaan LoadSummoner funktiolle.
          }
    });