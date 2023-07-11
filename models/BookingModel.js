import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Booking = db.define(
  "booking",
  {
    id_user: {
      type: DataTypes.INTEGER,
    },
    id_kelas: {
      type: DataTypes.INTEGER,
    },
    id_waktu: {
      type: DataTypes.INTEGER,
    },
    waktu_pemesanan: {
      type: DataTypes.DATEONLY,
    },
    is_booking: {
      type: DataTypes.BOOLEAN,
    },
    status: {
      type: DataTypes.STRING,
    },
    keterangan: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Booking;

(async () => {
  await db.sync();
})();
