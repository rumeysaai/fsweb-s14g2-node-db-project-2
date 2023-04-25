const router = require('express').Router();
const CarsModel = require('./cars-model');
const mw = require('./cars-middleware');

router.get('/', async (req, res, next)=>{
    try {
        
        const cars = await CarsModel.getAll();
        res.status(200).json(cars)

    } catch (error) {
        next(error);
    }
});

router.get('/:id', mw.checkCarId, async (req, res, next)=>{
    try {
        
        res.json(req.Car);

    } catch (error) {
        next(error);
    }
});

router.post('/', mw.checkCarPayload, mw.checkVinNumberValid, mw.checkVinNumberUnique, async (req, res, next)=>{
    try {
        
        const posted = await CarsModel.create(req.body);
        res.json(posted);

    } catch (error) {
        next(error);
    }
});
