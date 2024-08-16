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
let turn = 0;

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
        stackFunction : "feixiao_terrasplitProc()",
        slot : 0
        
    },{
        // Char2
        name: "Aventurine",
        img: "Images/Character_Aventurine_Icon.webp",
        spd : localStorage.getItem("char2SPD"),
        av : 0,
        slot : 1
        
    }, {
        // Char3
        name: "Robin",
        img: "Images/Character_Robin_Icon.webp",
        spd : localStorage.getItem("char3SPD"),
        av : 0,
        slot : 2
        
    }, {
        // Char4
        name: "Topaz",
        img: "Images/Character_Topaz_and_Numby_Icon.webp",
        spd : localStorage.getItem("char4SPD"),
        av : 0,
        slot : 3
        
    }
];

// Action Order Controller
let actionOrder = [
    {
        slot: 0,
        av: 0
    },
    {
        slot: 1,
        av: 0

    },
    {
        slot: 2,
        av: 0

    },
    {
        slot: 3,
        av: 0

    }
];

// Universal stack calling function
let tempStack = 0
var proc = {
    "feixiao": (function feixiao_terrasplitProc() {
        if (feixiao_terrasplit.currentstack < feixiao_terrasplit.stackcap) {
            feixiao_terrasplit.halfstack++;
            if (feixiao_terrasplit.halfstack == 2) {
                feixiao_terrasplit.currentstack++;
                feixiao_terrasplit.halfstack = 0;
            }
        }
        tempStack = feixiao_terrasplit;
        actionStacks(currentUnit);
    }),

    "robin": (function robin_pinionsAriaProc(action) {
        if (action == "start") {
            robin_pinionsAria.currentstack = 3;
        }
        if (action != "start") {
            if (robin_pinionsAria.currentstack == 0) {
                robin_pinionsAria.currentstack = 3;
            } else {
                if (char[currentUnit].name == "Robin"){
                    robin_pinionsAria.currentstack--;
                    console.log(robin_pinionsAria.currentstack);
                }
            }
        }

        tempStack = robin_pinionsAria;
        actionStacks(currentUnit);
    })
}

function call(name, arg){
    proc[name](arg)
}

// Each Unit's Stacks
// Feixiao
let feixiao_terrasplit = {
    img: "Images/Feixiao/Ability_Terrasplit.webp",
    stackable: 1,
    stackcap: 12,
    currentstack: 0,
    halfstack: 0
}

// Robin
let robin_pinionsAria = {
    img: "Images/Robin/Ability_Pinions_Aria.webp",
    stackable: 1,
    stackcap: 3,
    currentstack: 0,
}


// Gives each character their previous speed back
function retrieveData() {
    document.querySelector('#character1speed').value = char[0].spd
    document.querySelector('#character2speed').value = char[1].spd
    document.querySelector('#character3speed').value = char[2].spd
    document.querySelector('#character4speed').value = char[3].spd
    console.log("Previous data fetched.");
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
function startAVs() {
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

function startOrder() {
    actionOrder = [
        {
            slot: 0,
            av: char[0].av
        },
        {
            slot: 1,
            av: char[1].av
    
        },
        {
            slot: 2,
            av: char[2].av
    
        },
        {
            slot: 3,
            av: char[3].av
    
        }
    ];

    actionOrder.sort((x, y) => x.av - y.av || x.slot - y.slot);
    currentUnit = actionOrder[0].slot;
}
    

/*Adds action to the Action Order*/
let turnstacks = 0;
function actionStacks(currentUnit){
    turnstacks++;

    document.querySelector(`#turnactivebundle${turn}`).innerHTML += `
                    <div class="turnactiveslot stackable" id="turnactiveslot${turn}_${turnstacks}">
                        <img src="" class="turnactiveimg" id="turnactiveimg${turn}_${turnstacks}">
                    </div>
    `

    document.getElementById(`turnactiveimg${turn}_${turnstacks}`).setAttribute("src", tempStack.img);
    console.log("set");

    if (tempStack.stackable == 1) {
        document.querySelector(`#turnactiveslot${turn}_${turnstacks}`).innerHTML += `
            <p class="turnstackammount">${tempStack.currentstack}</p>
        `
    }
}

let currentUnitName = (char[currentUnit].name).toLowerCase()
function action(currentUnit, type){
    turn++;
    document.querySelector('.actionorder').innerHTML += `
        <div class="turn unselectable" id="turn${turn}">
                <img src="${char[currentUnit].img}" class="characterimgsm">
                <div class="turntitle">
                    <p class="turncharactername">${char[currentUnit].name}</p>     
                </div>

                <div class="turnavslot">
                    <p class="turnav">${Math.floor(char[currentUnit].av)}</p>
                </div>

                <div class="turnactiontypeslot">
                    <p class="turnactiontype">${type}</p>
                </div>

                <div class="turnactivebundle" id="turnactivebundle${turn}"></div>
        </div>
    `

    call(currentUnitName);
    call("robin");
}


/* Does Current Action */ 
function currentAction (currentUnit, nextUnit) {
    let remainingAction = char[currentUnit].av 
}


/* Whole Calculation Process*/
function calculate() {
    startAVs();
    startOrder();
    action(currentUnit, "Skill")
}