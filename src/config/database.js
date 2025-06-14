const { Sequelize } = require('sequelize');
const config = require('../../config.json');

const sequelize = new Sequelize(
  config.postgresql.database,
  config.postgresql.user,
  config.postgresql.password,
  {
    host: config.postgresql.host,
    port: config.postgresql.port,
    dialect: 'postgres',
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
      schema: config.postgresql.schema
    },
    pool: {
      max: config.postgresql.max_connections,
      min: 0,
      acquire: config.postgresql.connection_timeout,
      idle: config.postgresql.idle_timeout
    }
  }
);

// 测试数据库连接
sequelize.authenticate()
  .then(() => {
    console.log('数据库连接成功');
  })
  .catch(err => {
    console.error('数据库连接失败:', err);
  });

module.exports = sequelize; 