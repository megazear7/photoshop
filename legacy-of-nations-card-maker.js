var MOD = {
    MIDDLE : "MOD.MIDDLE",
    BOTTOM : "MOD.BOTTOM"
};
var ATTACK_TYPE = {
    MELEE : "ATTACK_TYPE.MELEE",
    RANGED : "ATTACK_TYPE.RANGED"
};
var CARD_TYPES = {
    FOOT              : "foot_troop",
    MOUNTED           : "mounted_troop",
    SIEGE_ENGINE      : "siege_engine",
    MILITARY_RESEARCH : "military",
    CIVIC_RESEARCH    : "civic",
    COMMERCE_RESEARCH : "commerce",
    SCIENCE_RESEARCH  : "science",
};
var PLACEMENTS = {
    NATION   : "nation_placement",
    BUILDING : "building_placement",
    RESEARCH : "research_placement",
    ARMY     : "army_placement",
};
var IMAGES = {
    DEFAULT : "IMAGES.DEFAULT",
}
var elementLayer = app.activeDocument.layers.getByName('elements');
var activeDocument = app.activeDocument;
var elements = activeDocument.layerSets["elements"];
var textElement = elements.layerSets["text"];
var imageElement = elements.layerSets["image"];
var typeElement = elements.layerSets["type"];
var placementElement = elements.layerSets["placement"];
var combatElement = elements.layerSets["combat"];
var initElement = combatElement.layerSets["init"];
var attackElement = combatElement.layerSets["attack"];
var defenseElement = combatElement.layerSets["defense"];
var costElement = elements.layerSets["cost"];
var modBottomElement = elements.layerSets["mod"].layerSets["bottom"];
var modMiddleElement = elements.layerSets["mod"].layerSets["middle"];

createCards();

function createCards() {
    var cards = buildCards();
    var elements = buildElements();
    hideAllElements();

    for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        var temporaryIndex = temporaryIndex + 1;
        if (temporaryIndex >= 6) {
            printSheet();
            temporaryIndex = 0;
        }

        for (var j = 0; j < elements.length; j++) {
            var element = elements[j];
            element(card);
        }

        printCard(temporaryIndex);
    }

    printSheet();
    cleanup();
    alert("Creation complete");
}

function buildCards() {
    // TODO Add all the cards for the game.

    var cards = [];

    addCards(cards, 1, createMeleeFootTroop({
        title: "Spearmen",
        combat : {
            attack: 1,
            defense: 4 
        },
        cost: [
            { costType: "food", costVal: 2 },
            { costType: "wood", costVal: 1 }
        ],
        image: IMAGES.DEFAULT,
        desc: "Spearmen are defensive minded troops that can soak up a lot of damage.",
    }));

    return cards;
}

function addCards(cards, count, card) {
    for (var i = 0; i < count; i++) {
        cards.push(card);
    }
}

function createCard(ops) {
    return {
        cardType: ops.cardType,
        title: ops.title,
        placement: ops.placement,
        combat : {
            init: ops.init,
            attack: ops.attack,
            attackType: ops.attackType,
            defense: ops.defense
        },
        image: ops.image || IMAGES.DEFAULT,
        cost: ops.cost,
        desc: ops.desc,
        deckName: ops.deckName,
        mod: ops.mod
    };
}

function createMilitaryCard(ops) {
    ops.deckName = {
        "CARD_TYPES.FOOT"         : "Foot Troop",
        "CARD_TYPES.MOUNTED"      : "Mounted Troop",
        "CARD_TYPES.SIEGE_ENGINE" : "Siege Engine"
    }[ops.cardType];
    ops.placement = PLACEMENTS.ARMY;

    return createCard(ops);
}

function createMeleeFootTroop(ops) {
    ops.cardType = CARD_TYPES.FOOT;
    ops.attackType = ATTACK_TYPE.MELEE;
    ops.init = 1;
    return createMilitaryCard(ops);
}

function createRangedFootTroop(ops) {
    ops.attackType = ATTACK_TYPE.RANGED;
    ops.cardType = CARD_TYPES.FOOT;
    ops.init = 2;
    return createMilitaryCard(ops);
}

function createMeleeMountedTroop(ops) {
    ops.attackType = ATTACK_TYPE.MELEE;
    ops.cardType = CARD_TYPES.MOUNTED;
    ops.init = 3;
    return createMilitaryCard(ops);
}

function createRangedMountedTroop(ops) {
    ops.attackType = ATTACK_TYPE.RANGED;
    ops.cardType = CARD_TYPES.MOUNTED;
    ops.init = 1;
    return createMilitaryCard(ops);
}

function createSiegeEngineTroop(ops) {
    ops.attackType = ATTACK_TYPE.RANGED;
    ops.cardType = CARD_TYPES.SIEGE_ENGINE;
    ops.init = 5;
    return createMilitaryCard(ops);
}

function buildElements() {
    return [
        updateCardType(),
        updateTitle(),
        updatePlacement(),
        updateInit(),
        updateAttack(),
        updateDefense(),
        updateImage(),
        updateCost(1),
        updateCost(2),
        updateCost(3),
        updateDesc(),
        updateId(),
        updateMod(MOD.MIDDLE, 1, 1),
        updateMod(MOD.MIDDLE, 2, 1),
        updateMod(MOD.MIDDLE, 2, 2),
        updateMod(MOD.MIDDLE, 3, 1),
        updateMod(MOD.MIDDLE, 3, 2),
        updateMod(MOD.MIDDLE, 3, 3),
        updateMod(MOD.BOTTOM, 1, 1),
        updateMod(MOD.BOTTOM, 2, 1),
        updateMod(MOD.BOTTOM, 2, 2),
        updateMod(MOD.BOTTOM, 3, 1),
        updateMod(MOD.BOTTOM, 3, 2),
        updateMod(MOD.BOTTOM, 3, 3),
        updateMod(MOD.BOTTOM, 4, 1),
        updateMod(MOD.BOTTOM, 4, 2),
        updateMod(MOD.BOTTOM, 4, 3),
        updateMod(MOD.BOTTOM, 4, 4),
    ];
}

function revealOneByName(group, layerName) {
    for (var i = 0; i < group.layers.length; i++) {
        var layer = group.layers[i];

        if (layer.name === layerName) {
            layer.visible = true;
        } else {
            layer.visible = false;
        }
    }
}

function updateCardType() {
    return function(card) {
        revealOneByName(typeElement, card.cardType);
    }
}

function updateTitle() {
    return function(card) {
        // TODO update and hide or show element
    }
}

function updatePlacement() {
    return function(card) {
        revealOneByName(placementElement, card.placement);
    }
}

function updateInit() {
    return function(card) {
    }
}

function updateAttack() {
    return function(card) {
        // TODO update and hide or show element
    }
}

function updateDefense() {
    return function(card) {
        // TODO update and hide or show element
    }
}

function updateImage() {
    return function(card) {
        // TODO update and hide or show element
    }
}

function updateCost(pos) {
    return function(card) {
        var costPosElement = costElement.layerSets["cost_" + pos];

        if (card.cost && pos <= card.cost.length) {
            costPosElement.visible = true;

            revealOneByName(costPosElement.layerSets["symbols"], card.cost[pos-1].costType);
            // TODO set cost text
        } else {
            costPosElement.visible = false;
        }
    };
}

function updateMod(loc, count, pos) {
    return function(card) {
        // TODO update and hide or show element
        /*
        for (var i = 0; i < costElement.layerSets.length; i++) {
            var layerSet = costElement.layerSets[i];

            if (layerSet.name.startsWith(card.cost.length)) {
                layerSet.visible = false;

                for (var j = 0; j < card.cost; j++) {
                    var costItem = card.cost[j];
                    revealOneByName(layerSet.layerSets["symbols"], costItem.costType);
                }
            } else {
                layerSet.visible = false;
            }
        }
        */
    };
}

function updateDesc() {
    return function(card) {
        // TODO update and hide or show element
    }
}

function updateId() {
    return function(card) {
        // TODO update and hide or show element
    }
}

function hideAllElements() {
    // TODO
}

function cleanup() {
    // TODO remove temporary files
    // TODO Reset to default text/icon values
}

function printCard(fileIndex) {
    var fileName = "legacy-of-nations-temp-file-" + fileIndex;
    // TODO print the card to a temporary file
}

function printSheet() {
    // TODO Combine the temporary files into a single sheet
    // There may be up to 6 temporary files (but there could be less).
}