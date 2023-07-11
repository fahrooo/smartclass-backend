import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Members = db.define(
  "members",
  {
    id_booking: {
      type: DataTypes.INTEGER,
    },
    id_user: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Members;

(async () => {
  await db.sync();
})();
