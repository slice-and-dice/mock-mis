// the councils' mock-mis stores/databases are identified here by their 'authority code' - 001 to 387 for instance.
const store = {
  '001': [], // e.g. bristol
  '002': [], // e.g. camden
  '003': [], // e.g. winchester
};

const randomlyFail = () => Math.random() > 0.9;

const getAllLas = () =>
  new Promise((resolve, reject) => {
    if (randomlyFail()) {
      reject(new Error('MIS could not be found'));
    } else {
      resolve(store);
    }
  });

const getLa = la =>
  new Promise((resolve, reject) => {
    if (randomlyFail()) {
      reject(new Error('MIS could not be found'));
    } else {
      resolve(store[la]);
    }
  });

const pushToLa = (establishments, la) =>
  new Promise((resolve, reject) => {
    if (randomlyFail()) {
      reject(new Error('MIS could not be found'));
    } else {
      store[la].push(...establishments);
      resolve('Successfully added records to store');
    }
  });

module.exports = {
  getAllLas,
  getLa,
  pushToLa,
};
