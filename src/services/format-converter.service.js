const formatMap = {
  northgate1: {
    orgName: 'organisationName',
    address: 'location',
  },
  civica5: {
    orgName: 'company',
    address: 'fullAddress',
  },
  idox2: {
    orgName: 'businessName',
    address: 'businessLocation',
  },
  tascomi8: {
    orgName: 'companyName',
    address: 'address',
  },
};

const authorityMap = {
  '001': {
    authorityName: 'bristol',
    format: 'northgate1'
  },
  '002': {
    authorityName: 'camden',
    format: 'civica5'
  },
  '003': {
    authorityName: 'winchester',
    format: 'idox2'
  }
}

const getFormatByAuthority = (authorityCode) => {
  return authorityMap[authorityCode];
}


// 'direction' can be 'send' or 'retrieve'
const convert = (data, authorityCode, direction) => {
  const authorityFormat = getFormatByAuthority(authorityCode).format;
  let format = formatMap[authorityFormat];
  const output = [];

  if(direction === 'retrieve') {
    let formatReversed = {};
    for(var property in format) {
      formatReversed[format[property] ] = property;
    }
    format = formatReversed;
  }

  // Convert each entry in the org
  data.forEach(org => {
    const newConvertedOrg = {};

    Object.keys(org).forEach(property => {
      newConvertedOrg[format[property] || property] = org[property];
    });

    output.push(newConvertedOrg);
  });

  return output;
};

module.exports = { convert };
