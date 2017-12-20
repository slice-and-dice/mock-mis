const data = [];

const getData = () => {
  return data;
}

const pushData = (items) => {
  data.push(...items);
}

module.exports = {
  getData,
  pushData
}