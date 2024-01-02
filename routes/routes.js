const express = require('express');
const cors = require('cors');
const CardController = require('../controllers/CardController')
const UserController = require('../controllers/UserController');
const PackController = require('../controllers/PackController');

const router = express.Router();
router.use(cors());

/* CARD ROUTES */
router.get('/card', CardController.getAllCards);
router.get('/card/findById/:id', CardController.getCardById);
router.get('/card/findByName/:name', CardController.getCardByName);
router.get('/card/getCardsNames', CardController.getCardsNames);
router.get('/card/findByRealm/:realm', CardController.getCardsByRealm);
router.get('/card/findByRarity/:rarity', CardController.getCardsByRarity);
router.get('/card/findByClass/:cardClass', CardController.getCardsByCardClass);
router.get('/card/getCardImageId/:name', CardController.getCardImageByName);
router.get('/card/getCardsWithImage', CardController.getCardsWithImage);
router.get('/card/getCollectionCards', CardController.getCollectionCards);
router.get('/card/getCardImageByImageId/:id', CardController.getCardImageByCardId);
router.get('/card/getCardImageByImageId2/:id', CardController.getCardImageByCardId2);

/* USER ROUTES */
router.get('/user/getUserBasicData/:name', UserController.getUserBasicData);
router.get('/user/getUserCollection/:username', UserController.getUserCollection);
router.get('/user/openPack/:username/:packType', UserController.openPack);

/* PACK ROUTES */
router.get('/pack/getAllPacks', PackController.getAllPacks);


module.exports = router;