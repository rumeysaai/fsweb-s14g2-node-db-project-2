const db = require('../../data/db-config');

const getAll = () => {
  return db('Cars');
}

const getById = (id) => {
  return db('Cars').where('id',id).first();
}

const getByVin = (vin) =>{
  return db('Cars').where({vin}).first();
}

const create = (cars) => {
  const insertedCar = db('Cars').insert(cars).then(ids=>{
    return getById(ids[0]);
  })
  return insertedCar;
}

module.exports = {
  getAll,
  getById,
  getByVin,
  create,
}
