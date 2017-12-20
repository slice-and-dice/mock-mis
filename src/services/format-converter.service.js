const targetFormats = {
  northgate1: {
    orgName: "organisationName",
    address: "location"
  },
  civica5: {},
  idox2: {},
  tascomi8: {}
}

const convert = (data, targetFormatName) => {
  const targetFormat = targetFormats[targetFormatName];
  const output = [];

  data.forEach((org) => {
    const newOrg = {};

    Object.keys(org).forEach((property) => {
      newOrg[targetFormat[property]] = org[property];
    });

    output.push(newOrg);
  });

  return output;
}

module.exports = { convert };