const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("clinica_med", "root", "", {
  host: "localhost",
  dialect: "mysql"});
async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    throw new Error("Unable to connect to the database:", error);
  }
}
connectDatabase();
module.exports = sequelize;
