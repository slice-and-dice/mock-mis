const store = {
  camden: [],
  bristol: [],
  lambeth: [],
  winchester: []
};

const getLa = (la) => store[la];

const getAllLas = () => store;

const pushToLa = (establishments, la) => {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.9) {
      reject('MIS could not be found');
    } else {
      console.log(la);
      store[la].push(...establishments);
      resolve('Successfully added records to store');
    }
  });
}

module.exports = {
  getLa,
  getAllLas,
  pushToLa
}