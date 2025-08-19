const cardNumber = document.querySelector("#cardNumber");
const type = document.querySelector("#types");
const submit = document.querySelector("#submit");
const pokemonData = [];
let index = 0;
let bgc = {
    "fire": "linear-gradient(180deg,#ed5f5a,#2c0101",
    "fighting": "linear-gradient(180deg,#eb8209,#1e1a16",
    "normal": "linear-gradient(180deg,#626060,#0f0e0e",
    "flying": "linear-gradient(180deg,#35fdfd,#012626",
    "poison": "linear-gradient(180deg,#895a9f,#210030",
    "ground": "linear-gradient(180deg,#915050,#280101",
    "rock": "linear-gradient(180deg,#9f9782f0,#1b1700",
    "bug": "linear-gradient(180deg,#bedc74f0,#131b00",
    "ghost": "linear-gradient(180deg,#a574dcf0,#0a001b",
    "steel": "linear-gradient(180deg,#688fc5,#000b1b",
    "water": "linear-gradient(180deg,#454efb,#000126",
    "grass": "linear-gradient(180deg,#a3eea3,#002606",
    "electric": "linear-gradient(180deg,#fbff7c,#262400",
    "psychic": "linear-gradient(180deg,#915f82,#26001b",
    "ice": "linear-gradient(180deg,#a3e8fb,#002226",
    "dragon": "linear-gradient(180deg,#5446a8,#05001f",
    "dark": "linear-gradient(180deg,#382f2f,#1c0000",
    "fairy": "linear-gradient(180deg,#f346bf,#301130"
}

async function dataCollection() {
    const data = await fetch(`https://pokeapi.co/api/v2/type/${type.value}`)
    .then(response => response.json());
    const img = document.createElement('img');
    img.id = "categoryImg";
    const card = document.createElement('div');
    card.id = "card";
    card.style = `background: ${bgc[type.value]}`
    
    const nav = document.createElement('div');
    nav.id = 'nav';
    const mid = document.createElement('div');
    mid.id = "mid";
    const prev = document.createElement('button');
    prev.id = "prev";
    const next = document.createElement('button');
    next.id = "next";
    const head = document.createElement('div');
    head.id = "cardHead";
    const charImg = document.createElement('img');
    charImg.id = "charImg";
    const charData = document.createElement('div')
    charData.id = "charData";
    const charAbility = document.createElement('div');
    charAbility.id = "charAbility";
    
    if(cardNumber.value > 0){
        pokemonData.push(...data["pokemon"].slice(0, cardNumber.value));
        document.body.innerHTML = '';
        img.src = data["sprites"]["generation-ix"]["scarlet-violet"]["name_icon"];
        nav.appendChild(img);
        document.body.appendChild(nav);
        prev.innerText = "<";
        next.innerText = ">";
        prev.onclick = anotherCard;
        next.onclick = anotherCard;

        const pokemon = await fetch(pokemonData[index]["pokemon"]["url"])
        .then(response => response.json())
        head.innerHTML = `<img src = ${pokemon["sprites"]["front_default"]} id="sprite">${pokemon["name"]}   <span style="font-size: small">LV.${pokemon["base_experience"]}</span>    HP ${pokemon["stats"][0]["base_stat"]}`
        charImg.src = pokemon["sprites"]["other"]["dream_world"]["front_default"];
        for (const element of pokemon["stats"]) {
            if(element["stat"]["name"] == "hp"){
                continue;
            }
            charData.textContent += element["stat"]["name"].toUpperCase()+" : "+String(element["base_stat"])+"\n"
        }

        if(pokemon["abilities"].length >= 2){
            charAbility.innerHTML = 
            `<span style="font-size: large">ABILITY</span>\n${pokemon["abilities"][0]["ability"]["name"]}\n${pokemon["abilities"][1]["ability"]["name"]}`
        }
        else{
            charAbility.innerHTML = 
        `<span style="font-size: large">ABILITY</span>\n${pokemon["abilities"][0]["ability"]["name"]}\n`;
        }

        card.appendChild(head);
        card.appendChild(charImg);
        card.appendChild(charAbility);
        card.appendChild(charData);
        mid.appendChild(prev);
        mid.appendChild(card);
        mid.appendChild(next);
        document.body.appendChild(mid);
    }
    else{
        alert("Please Select positive number of Cards");
        return; 
    }

}

submit.addEventListener('click', dataCollection);

async function anotherCard(event){
    if(event.target.id == "next"){
        index = (index+1) % pokemonData.length;
    }   
    else if(event.target.id == "prev"){
        index = (index-1) % pokemonData.length;
        if(index == -1){
            index = pokemonData.length - 1;
        }
    }

    const head = document.querySelector("#cardHead");
    const card = document.querySelector("#card");
    const charImg = document.querySelector("#charImg");
    const charData = document.querySelector("#charData");
    const charAbility = document.querySelector("#charAbility");

    charData.innerHTML = ''
    const pokemon = await fetch(pokemonData[index]["pokemon"]["url"])
    .then(response => response.json())
    head.innerHTML = `<img src = ${pokemon["sprites"]["front_default"]} id="sprite">${pokemon["name"]}   <span style="font-size: small">LV.${pokemon["base_experience"]}</span>    HP ${pokemon["stats"][0]["base_stat"]}`
    charImg.src = pokemon["sprites"]["other"]["dream_world"]["front_default"];
    for (const element of pokemon["stats"]) {
        if(element["stat"]["name"] == "hp"){
            continue;
        }
        charData.textContent += element["stat"]["name"].toUpperCase()+" : "+String(element["base_stat"])+"\n"
    }
    if(pokemon["abilities"].length >= 2){
        charAbility.innerHTML = 
        `<span style="font-size: large">ABILITY</span>\n${pokemon["abilities"][0]["ability"]["name"]}\n${pokemon["abilities"][1]["ability"]["name"]}`
    }
    else{
        charAbility.innerHTML = 
        `<span style="font-size: large">ABILITY</span>\n${pokemon["abilities"][0]["ability"]["name"]}\n`;
    }
}