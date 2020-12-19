var MOD = {
    MIDDLE : "middle",
    BOTTOM : "bottom"
};
var ATTACK_TYPE = {
    MELEE : "melee",
    RANGED : "ranged"
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
    DEFAULT : "default",
}
var elementLayer = app.activeDocument.layers.getByName('elements');
var activeDocument = app.activeDocument;
var elements = activeDocument.layerSets["elements"];
var textElement = elements.layerSets["text"];
var titleElement = textElement.layers["title"];
var descElement = textElement.layers["desc"];
var imageElement = elements.layerSets["image"];
var typeElement = elements.layerSets["type"];
var placementElement = elements.layerSets["placement"];
var combatElement = elements.layerSets["combat"];
var initElement = combatElement.layerSets["init"];
var attackElement = combatElement.layerSets["attack"];
var defenseElement = combatElement.layerSets["defense"];
var costElement = elements.layerSets["cost"];
var modElement = elements.layerSets["mod"];
var cardId = 1;
var sheetId = 1;
var cardPaths = [];
var cardsPerSheet = 8;

createCards();

function createCards() {
    var cards = buildCards();
    var temporaryIndex = 1;

    for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        if (temporaryIndex >= cardsPerSheet) {
            printSheet();
            temporaryIndex = 0;
        }

        setupCard(card);
        printCard(temporaryIndex);
        temporaryIndex = temporaryIndex + 1;
        cardId = cardId + 1;
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
        combat: {
            attack: 1,
            defense: 3 
        },
        cost: [
            { costType: "food", costVal: 2 },
            { costType: "wood", costVal: 1 }
        ],
        image: IMAGES.DEFAULT,
        desc: "Spearmen are defensive minded troops that can soak up a lot of damage.",
    }));

    addCards(cards, 1, createCard({
        title: "Farm",
        placement: PLACEMENTS.NATION,
        cost: [
            { costType: "wood", costVal: 2 }
        ],
        mod: {
            bottom: [
                { modType: "food", modVal: 2 },
            ]
        },
        deckName: "Civic Buildings",
        image: IMAGES.DEFAULT,
        desc: "Farms are fun for picking and planting.",
    }));

    addCards(cards, 1, createCard({
        cardType: CARD_TYPES.SCIENCE_RESEARCH,
        title: "Card Title",
        placement: PLACEMENTS.NATION,
        combat: {
            init: 1,
            attack: 1,
            attackType: ATTACK_TYPE.MELEE,
            defense: 1,
        },
        mod: {
            middle: [
                { modType: "food", modVal: 1 },
                { modType: "wood", modVal: 2 },
                { modType: "iron", modVal: 3 }
            ],
            bottom: [
                { modType: "knowledge", modVal: 1 },
                { modType: "iron", modVal: 2 },
                { modType: "wood", modVal: 3 }
            ]
        },
        deckName: "Sample Card",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
    }));

    addCards(cards, 1, createCard({
        cardType: CARD_TYPES.CIVIC_RESEARCH,
        title: "Card Title",
        placement: PLACEMENTS.NATION,
        cost: [
            { costType: "food", costVal: 1 },
            { costType: "wealth", costVal: 2 }
        ],
        mod: {
            middle: [
                { modType: "food", modVal: 1 },
                { modType: "wood", modVal: 2 },
                { modType: "iron", modVal: 3 }
            ]
        },
        deckName: "Sample Card",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
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
        combat : ops.combat,
        image: ops.image || IMAGES.DEFAULT,
        cost: ops.cost,
        desc: ops.desc,
        deckName: ops.deckName,
        mod: ops.mod
    };
}

function createMilitaryCard(ops) {
    ops = createCard(ops);
    ops.placement = PLACEMENTS.ARMY;
    return ops;
}

function updateDeckName(ops) {
    ops.deckName = {
        "foot_troop"         : "Foot Troop",
        "mounted_troop"      : "Mounted Troop",
        "siege_engine" : "Siege Engine"
    }[ops.cardType];
    return ops;
}

function createMeleeFootTroop(ops) {
    ops = createMilitaryCard(ops);
    ops.cardType = CARD_TYPES.FOOT;
    ops.combat.attackType = ATTACK_TYPE.MELEE;
    ops.combat.init = 1;
    ops = updateDeckName(ops);
    return ops;
}

function createRangedFootTroop(ops) {
    ops = createMilitaryCard(ops);
    ops.cardType = CARD_TYPES.FOOT;
    ops.combat = ops.combat || { };
    ops.combat.attackType = ATTACK_TYPE.RANGED;
    ops.combat.init = 2;
    ops = updateDeckName(ops);
    return ops;
}

function createMeleeMountedTroop(ops) {
    ops = createMilitaryCard(ops);
    ops.cardType = CARD_TYPES.MOUNTED;
    ops.combat = ops.combat || { };
    ops.combat.attackType = ATTACK_TYPE.MELEE;
    ops.combat.init = 3;
    ops = updateDeckName(ops);
    return ops;
}

function createRangedMountedTroop(ops) {
    ops = createMilitaryCard(ops);
    ops.cardType = CARD_TYPES.MOUNTED;
    ops.combat = ops.combat || { };
    ops.combat.attackType = ATTACK_TYPE.RANGED;
    ops.combat.init = 1;
    ops = updateDeckName(ops);
    return ops;
}

function createSiegeEngineTroop(ops) {
    ops = createMilitaryCard(ops);
    ops.cardType = CARD_TYPES.SIEGE_ENGINE;
    ops.combat = ops.combat || { };
    ops.combat.attackType = ATTACK_TYPE.RANGED;
    ops.combat.init = 5;
    ops = updateDeckName(ops);
    return ops;
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
        updateMod(MOD.BOTTOM, 3, 3)
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
        titleElement.textItem.contents = card.title;
    }
}

function updatePlacement() {
    return function(card) {
        revealOneByName(placementElement, card.placement);
    }
}

function updateInit() {
    return function(card) {
        if (card.combat) {
            initElement.visible = true;
            initElement.layers["text"].textItem.contents = card.combat.init;
        } else {
            initElement.visible = false;
        }
    }
}

function updateAttack() {
    return function(card) {
        if (card.combat) {
            attackElement.visible = true;
            attackElement.layers["text"].textItem.contents = card.combat.attack;
            revealOneByName(attackElement.layerSets["symbols"], card.combat.attackType);
        } else {
            attackElement.visible = false;
        }
    }
}

function updateDefense() {
    return function(card) {
        if (card.combat) {
            defenseElement.visible = true;
            defenseElement.layers["text"].textItem.contents = card.combat.defense;
        } else {
            defenseElement.visible = false;
        }
    }
}

function updateImage() {
    return function(card) {
        revealOneByName(imageElement, card.image);
    }
}

function updateCost(pos) {
    return function(card) {
        var costPosElement = costElement.layerSets["cost_" + pos];

        if (card.cost && pos <= card.cost.length) {
            var costItem = card.cost[pos-1];
            costPosElement.visible = true;

            revealOneByName(costPosElement.layerSets["symbols"], costItem.costType);
            costPosElement.layers["text"].textItem.contents = costItem.costVal;
        } else {
            costPosElement.visible = false;
        }
    };
}

function updateMod(loc, count, pos) {
    return function(card) {
        var layerSet = modElement.layerSets[loc].layerSets["mod_"+count+"_"+pos];

        if (card.mod && card.mod[loc] && count === card.mod[loc].length) {
            var modItem = card.mod[loc][pos-1];
            layerSet.visible = true;

            revealOneByName(layerSet.layerSets["symbols"], modItem.modType);
            layerSet.layers["text"].textItem.contents = (modItem.modVal < 0 ? '-' : '+') + modItem.modVal;
        } else {
            layerSet.visible = false;
        }
    };
}

function updateDesc() {
    return function(card) {
        descElement.textItem.contents = card.desc;
    }
}

function setupCard(card) {
    var elements = buildElements();

    for (var j = 0; j < elements.length; j++) {
        var element = elements[j];
        element(card);
    }
}

function cleanup() {
    // TODO remove temporary files

    setupCard(createCard({
        cardType: CARD_TYPES.SCIENCE_RESEARCH,
        title: "Card Title",
        placement: PLACEMENTS.NATION,
        combat: {
            init: 1,
            attack: 1,
            attackType: ATTACK_TYPE.MELEE,
            defense: 1,
        },
        cost: [
            { costType: "food", costVal: 1 },
            { costType: "wealth", costVal: 2 },
            { costType: "iron", costVal: 3 }
        ],
        mod: {
            middle: [
                { modType: "food", modVal: 1 },
                { modType: "wood", modVal: 2 },
                { modType: "iron", modVal: 3 }
            ],
            bottom: [
                { modType: "knowledge", modVal: 1 },
                { modType: "iron", modVal: 2 },
                { modType: "wood", modVal: 3 }
            ]
        },
        deckName: "Sample Card",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
    }));
}

function printCard(fileIndex) {
    var fileName = "tmp-" + fileIndex + ".jpg";

    cardPaths[fileIndex-1] = activeDocument.path.fullName + "/tmp/" + fileName;
    var fileRef = new File(cardPaths[fileIndex-1]);
    var jpegOptions = new JPEGSaveOptions();
    jpegOptions.quality = 12;
    activeDocument.saveAs(fileRef, jpegOptions, true);
}

function printSheet() {
    var sheetName = "sheet-" + sheetId;
    var sheetWidth = 10; // 4 cards wide = 10 inches
    var sheetHeight = 7; // 2 cards tall = 2 inches

    app.preferences.rulerUnits = Units.INCHES;
    var sheetDoc = app.documents.add(sheetWidth, sheetHeight, 300, sheetName, NewDocumentMode.RGB);
    app.preferences.rulerUnits = Units.PIXELS;

    for (var i = 0; i < cardsPerSheet; i++) {
        if (cardPaths.length > i) {
            var fileObj = File(cardPaths[i]);
            if (fileObj.exists) {
                placeFile(fileObj);
                var newLayer = sheetDoc.layers["tmp-" + (i + 1)];
                moveLayer(newLayer, i+1);
            }
        }
    }

    var fileRef = new File("~/Desktop/sheets/" + sheetName + ".jpg");
    var jpegOptions = new JPEGSaveOptions();
    jpegOptions.quality = 12;
    activeDocument.saveAs(fileRef, jpegOptions, true);
    sheetDoc.close(SaveOptions.DONOTSAVECHANGES);

    sheetId = sheetId + 1;
}

function moveLayer(layer, cardPos) {
    var position = layer.bounds;
    var cardXPos = (cardPos-1) % 4;
    var cardYPos = Math.floor((cardPos-1) / 4);
    var width = (position[2].value) - (position[0].value);
    var height = (position[3].value) - (position[1].value);
    var moveX = cardXPos * width;
    var moveY = cardYPos * height;
    moveLayerTo(layer, moveX , moveY);
}

function moveLayerTo(fLayer,fX,fY) {
    var position = fLayer.bounds;
    position[0] = fX - position[0];
    position[1] = fY - position[1];
    fLayer.translate(-position[0],-position[1]);
}

function placeFile(file) {
    var desc21 = new ActionDescriptor();
    desc21.putPath( charIDToTypeID('null'), new File(file) );
    desc21.putEnumerated( charIDToTypeID('FTcs'), charIDToTypeID('QCSt'), charIDToTypeID('Qcsa') );
    var desc22 = new ActionDescriptor();
    desc22.putUnitDouble( charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), 0.000000 );
    desc22.putUnitDouble( charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), 0.000000 );
    desc21.putObject( charIDToTypeID('Ofst'), charIDToTypeID('Ofst'), desc22 );
    executeAction( charIDToTypeID('Plc '), desc21, DialogModes.NO );
}
