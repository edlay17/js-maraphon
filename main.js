const $arena = document.querySelector('.arena1');
const $attackButton = document.querySelector('#attack')
$attackButton.addEventListener("click", () => {
    let isNeedToCheckWinner = false;
    function setNeedToCheckWinner(){
        isNeedToCheckWinner = true;
        $attackButton.disabled = true;
    }
    addDamage(player1, player2, setNeedToCheckWinner);
    addDamage(player2, player1, setNeedToCheckWinner);
    if(isNeedToCheckWinner){
        if(player1.hp.currentHp === player2.hp.currentHp){
            setTimeout(() => {alert("Draw!!!")}, 0); // setTimeout не всегда помогает, иногда сначала алерт, потом отнимаются хп
        }
        else if(player1.hp.currentHp > player2.hp.currentHp){
            setTimeout(() => {alert(player1.name + " win!!!")}, 0);
        }
        else if(player2.hp.currentHp > player1.hp.currentHp){
            setTimeout(() => {alert(player2.name + " win!!!")}, 0);
        }
    }
})

const player1 = {
    name: "Zero",
    player: 1,
    hp: {
      currentHp: 300,
      defaultHp: 300,
    },
    damage: {
        min: 20,
        max: 40,
    },
    img: "http://reactmarathon-api.herokuapp.com/assets/liukang.gif",
    weapon: ["deagle", "knife", "stick"],
    attack: function (rival){
        console.log(this.name + " attacking " + rival);
    },
}
const player2 = {
    name: "Bulba",
    player: 2,
    hp: {
        currentHp: 140,
        defaultHp: 140,
    },
    damage: {
        min: 60,
        max: 70,
    },
    img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
    weapon: ["deagle", "knife", "stick"],
    attack: function (rival){
        console.log(this.name + " attacking " + rival);
    },
}

function addDamage(fromPlayer, toPlayer, setNeedToCheckWinner){
    fromPlayer.attack();
    toPlayer.hp.currentHp -= getRandom(fromPlayer.damage.min,fromPlayer.damage.max);
    if(toPlayer.hp.currentHp <= 0){
        toPlayer.hp.currentHp = 0;
        setNeedToCheckWinner();
    }
    renderHP(toPlayer);
}

function renderHP(player){
    const $life = document.querySelector(".player"+player.player + " .life");
    $life.style.width = calculateHpProgress(player.hp.currentHp, player.hp.defaultHp) + "%";
}

function createElem(type, classes, otherProp){
    const $elem = document.createElement(type);
    classes.forEach((className) => {
        $elem.classList.add(className);
    })
    if(otherProp !== undefined){
        Object.entries(otherProp).forEach(([key, value]) => $elem[key] = value);
    }
    return $elem
}

function calculateHpProgress(currentHP, HP){
    return Math.ceil(currentHP / HP * 100);
}

function getRandom(min, max){
    return Math.floor(min + Math.random() * (max + 1 - min));
}

function createPlayer(type, player){
    //create
    const $player = createElem("div", [type]);
    const $progressBar = createElem("div", ["progressbar"]);
    const $life = createElem("div", ["life"]);
    const $name = createElem("div", ["name"]);
    const $character = createElem("div", ["character"]);
    const $img = createElem("img", [], {"src": player.img});

    //position
    $arena.appendChild($player);
    $character.appendChild($img);
    $progressBar.appendChild($life);
    $progressBar.appendChild($name);
    $player.appendChild($progressBar);
    $player.appendChild($character);

    //data
    renderHP(player); //$life.style.width=calculateHpProgress(player.hp.currentHp, player.hp.defaultHp) + "%"; - больше кода, но зато нет лишнего querySelector в renderHP
    $name.innerText = player.name;
}

createPlayer("player1", player1);
createPlayer("player2", player2);