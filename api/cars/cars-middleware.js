const CarsModel = require('./cars-model');

const checkCarId = async (req, res, next) => {
  try {
    const isExist = await CarsModel.getById(req.params.id)
    if(!isExist){
      res.status(404).json({ message: `<car ${req.param.id}> kimliğine sahip araba bulunamadı` })
    }
    else{
      req.car = isExist;
    }
  } catch (error) {
    next(error);
  }
}

const checkCarPayload = (req, res, next) => {
  const {vin, make, model, mileage } = req.body;
  if(!vin || !make || !model || !mileage){
    res.status(400).json({message: 'field is missing'})
  }
  else{
    next();
  }
}

const checkVinNumberValid = async (req, res, next) => {
  try {
    
    const isValid = await CarsModel.getById(req.params.id);
    if(!isValid){
      res.status(400).json({ message: `vin ${req.body.vin} is invalid` })
    }
    else{
      req.vin=isValid;
    }

  } catch (error) {
    next(error);
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try {

    const vinn = await CarsModel.getByVin(req.body.vin);

    vinn ?  next({ code: 400, message: `vin ${req.body.vin} already exists`,}) : next() 
    
  } catch (error) {
    next(error);
  }
}

module.exports={
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
}
