var Sequelize = require('sequelize');

var sequelize = new Sequelize("postgres://dlumsaouucgmbd:fCHRc83bg0aNz9E1el65uHsuze@ec2-107-20-159-155.compute-1.amazonaws.com:5432/d6pk5bcid7t96v", {
  dialect: 'postgres',
  protocol: 'postgres'
});

module.exports = {
  DataTypes: Sequelize,
  sequelize: sequelize
};
