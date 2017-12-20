const store = {
  camden: [],
  bristol: [],
  lambeth: [],
  winchester: []
};

const randomlyFail = () => Math.random() > 0.9;

const getAllLas = () => new Promise((resolve, reject) => {
  if (randomlyFail()) {
    reject('MIS could not be found');
  } else {
    resolve(store);
  }
});

const getLa = (la) => new Promise((resolve, reject) => {
  if (randomlyFail()) {
    reject('MIS could not be found');
  } else {
    resolve(store[la]);
  }
});

const pushToLa = (establishments, la) => {
  return new Promise((resolve, reject) => {
    if (randomlyFail()) {
      reject('MIS could not be found');
    } else {
      console.log(la);
      store[la].push(...establishments);
      resolve('Successfully added records to store');
    }
  });
}

module.exports = {
  getAllLas,
  getLa,
  pushToLa
}