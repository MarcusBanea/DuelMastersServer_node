const Pack = require('../models/pack.model');
const CardService = require('../services/CardService');

function getPackByName(name) {
    return Pack.findOne({name: name}).select({"_id": 0, "image": 0, "_class": 0});
}

function openPack(pack) {
    let cards = new Array();
    console.log("pack = " + pack);
    if(pack.numberOfCommonCards != undefined) {
        cards = addCardsWithRarityToCardList(cards, 'Common', pack.numberOfCommonCards);
    }
    if(pack.numberOfUncommonCards != undefined) {
        cards = addCardsWithRarityToCardList(cards, 'Uncommon', pack.numberOfUncommonCards);
    }
    if(pack.numberOfRareCards != undefined) {
        cards = addCardsWithRarityToCardList(cards, 'Rare', pack.numberOfRareCards);
    }
    if(pack.numberOfVeryRareCards != undefined) {
        cards = addCardsWithRarityToCardList(cards, 'Very Rare', pack.numberOfVeryRareCards);
    }
    if(pack.numberOfSuperRareCards != undefined) {
        cards = addCardsWithRarityToCardList(cards, 'Super Rare', pack.numberOfSuperRareCards);
    }
    if(pack.numberOfLegendaryCards != undefined) {
        cards = addCardsWithRarityToCardList(cards, 'Legendary', pack.numberOfLegendaryCards);
    }
    //console.log(cards);
    return cards;
}

async function addCardsWithRarityToCardList(cardList, rarity, nrOfCards) {
    for(let i = 0; i < nrOfCards; i++) {
        let card = (await CardService.getRandomCardWithRarity(rarity))[0];
        console.log(card);
        cardList.push(await card);
    }
    return cardList;
}

module.exports = {getPackByName, openPack};