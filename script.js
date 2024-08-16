/*## General Info
> Cycle 0: 150AV
> Cycles 1 onwards: 100AV
> AV = 10.000 / SPD

## Robin
> 120spd Vonwacq 
> Ults after 1 skill, 1 NA
> Ult has 90 speed 

## Topaz
> 137 speed 
> Any attack that isn't Numby's gives him 50% Action Advance

## Feixiao
> SPEED BOOTS: 137 SPD
> ATK BOOTS: 112 SPD
> Needs 6 stacks to ult, can hold up to 12
> FUAs after her skill
> Can FUA on ally attack once every rotation
> Using SPD boots gives around 15% less damage on any FUA (Ult damage included)

## Aventurine
> 137 spd
> For all intents and purposes, will only NA and never FUA to keep consistency

## Numby
> 80 speed
> Topaz's ult makes him Action Advance by 50% on ANY hit with Proof of Debt*/

// Cycle counter
let cycle = 0;

// Curent unit
let currentUnit = 0;
let nextUnit = 0

// AV for each turn
const C0AV = 150;
const CAV = 100;

// Each unit

let char = [
    {
        // Char1
        name: "Feixiao",
        img: "Images/Character_Feixiao_Icon.webp",
        spd : localStorage.getItem("char1SPD"),
        av : 0,
        slot : 1
        
    },{
        // Char2
        name: "Aventurine",
        img: "Images/Character_Aventurine_Icon.webp",
        spd : localStorage.getItem("char2SPD"),
        av : 0,
        slot : 2
        
    }, {
        // Char3
        name: "Robin",
        img: "Images/Character_Robin_Icon.webp",
        spd : localStorage.getItem("char3SPD"),
        av : 0,
        slot : 3
        
    }, {
        // Char4
        name: "Topaz",
        img: "Images/Character_Topaz_and_Numby_Icon.webp",
        spd : localStorage.getItem("char4SPD"),
        av : 0,
        slot : 4
        
    }
];


// Gives each character their previous speed back
function retrieveData() {
    document.querySelector('#character1speed').value = char[0].spd
    document.querySelector('#character2speed').value = char[1].spd
    document.querySelector('#character3speed').value = char[2].spd
    document.querySelector('#character4speed').value = char[3].spd
}


/* Inverts display (Flex - None)*/
function swapDisplay(element) {
    if (element.style.display == 'flex'){
        element.style.display = 'none'
    } else {
        element.style.display = 'flex'
    }
}

/* Expands Character Dropdowns */
function expand(selection) {
    console.log("Expanding", selection);
    let selectedCharacter = document.querySelector('#' + selection);
    let selectedCharacterDropdown = selectedCharacter.querySelector('.characterdropdown');
    console.log(selectedCharacterDropdown);
    swapDisplay(selectedCharacterDropdown)

    selectedCharacter.scrollIntoView({ behavior: "smooth", block: "center" }); 
}

/* Calculates Action Values */
function fetchAVs() {
    char[0].spd = document.querySelector('#character1speed').value
    char[1].spd = document.querySelector('#character2speed').value
    char[2].spd = document.querySelector('#character3speed').value
    char[3].spd = document.querySelector('#character4speed').value

    localStorage.setItem("char1SPD",char[0].spd);
    localStorage.setItem("char2SPD",char[1].spd);
    localStorage.setItem("char3SPD",char[2].spd);
    localStorage.setItem("char4SPD",char[3].spd);

    char[0].av = 10000 / char[0].spd;
    char[1].av = 10000 / char[1].spd;
    char[2].av = 10000 / char[2].spd;
    char[3].av = 10000 / char[3].spd;
}

function findDuplicates(array) {
    return array.filter((currentValue, currentIndex) =>
    array.indexOf(currentValue) !== currentIndex);
}

let aValues = [];
function startOrder() {
    aValues = [char[0].av, char[1].av, char[2].av, char[3].av];

    if (findDuplicates(aValues).lenght != 0) {
        currentUnit = 1;
        nextUnit = currentUnit + 1;
    } else {
        aValues.sort(function(a, b) {
            return a - b;
          });
        
        currentUnit = char.map(e => e.av).indexOf(aValues[0]);
        if (currentUnit + 1 == 5) {
            nextUnit = 1;
        } else {
            nextUnit = currentUnit + 1;
        }

    }
    
}

/*Adds action to the Action Order*/
function action(currentUnit){
    document.querySelector('.actionorder').innerHTML += `
        <div class="turn">
                <img src="${char[currentUnit].img}" class="characterimgsm unselectable">
                <div class="turntitle">
                    <p class="turncharactername">${char[currentUnit].name}</p>     
                </div>

                <div class="turnavslot">
                    <p class="turnav">${char[currentUnit].av.toFixed(0)}</p>
                </div>
        </div>
    `
}

/* Whole Calculation Process*/
function calculate() {
    fetchAVs();
    startOrder();
}