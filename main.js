const player1 = {
    name: "Zero",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/liukang.gif",
    weapon: ["deagle", "knife", "stick"],
    attack: function (){
        console.log("attack " + this.name);
    },
}
const player2 = {
    name: "Bulba",
    hp: 150,
    img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
    weapon: ["deagle", "knife", "stick"],
    attack: function (){
        console.log("attack " + this.name);
    },
}

function createPlayer(type, player){
    alert("123");
    //create
    const $player = document.createElement("div");
    const $progressBar = document.createElement("div");
    const $life = document.createElement("div");
    const $name = document.createElement("div");
    const $character = document.createElement("div");
    const $img = document.createElement("img");
    const $root = document.querySelector('.root');

    //styles
    $player.classList.add(type);
    $progressBar.classList.add("progressbar");
    $life.classList.add("life");
    $name.classList.add("name");
    $character.classList.add("character");
    $img.src = player.img;
    $life.style.width="100%";

    //data
    $life.innerText = player.hp;
    $name.innerText = player.name;

    //position
    $root.appendChild($player);
    $character.appendChild($img);
    $progressBar.appendChild($life);
    $progressBar.appendChild($name);
    $player.appendChild($progressBar);
    $player.appendChild($character);
}

createPlayer("player1", player1);
createPlayer("player2", player2);