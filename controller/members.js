import { Op } from "sequelize";
import Members from "../models/MembersModel.js";
import Users from "../models/UsersModel.js";
import Booking from "../models/BookingModel.js";
import Waktu from "../models/WaktuModel.js";
import Kelas from "../models/KelasModel.js";
import Units from "../models/UnitsModel.js";
import db from "../config/Database.js";

export const getMember = async (req, res) => {
  const { filter_nama, nama, filter_booking, id_booking } = req.body;
  const page = parseInt(req.body.page) - 1;
  const limit = parseInt(req.body.limit);
  const offset = limit * page;

  Kelas.hasMany(Booking, { foreignKey: "id_kelas" });
  Booking.belongsTo(Kelas, { foreignKey: "id_kelas" });
  Users.hasMany(Members, { foreignKey: "id_user" });
  Members.belongsTo(Users, { foreignKey: "id_user" });
  Booking.hasMany(Members, { foreignKey: "id_booking" });
  Members.belongsTo(Booking, { foreignKey: "id_booking" });
  Waktu.hasMany(Booking, { foreignKey: "id_waktu" });
  Booking.belongsTo(Waktu, { foreignKey: "id_waktu" });
  Units.hasMany(Kelas, { foreignKey: "id_unit" });
  Kelas.belongsTo(Units, { foreignKey: "id_unit" });

  if (filter_nama == true && filter_booking == true) {
    const totalRows = await Members.count({
      where: {
        id_booking: id_booking,
      },
      include: [
        {
          model: Booking,
          where: { status: "approved" },
          include: [
            {
              model: Waktu,
            },
            {
              model: Kelas,
              include: [
                {
                  model: Units,
                },
              ],
            },
          ],
        },
        {
          model: Users,
          where: { nama: { [Op.substring]: nama } },
          attributes: ["id", "nama"],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const members = await Members.findAll({
      where: {
        id_booking: id_booking,
      },
      include: [
        {
          model: Booking,
          where: { status: "approved" },
          include: [
            {
              model: Waktu,
            },
            {
              model: Kelas,
              include: [
                {
                  model: Units,
                },
              ],
            },
          ],
        },
        {
          model: Users,
          where: { nama: { [Op.substring]: nama } },
          attributes: ["id", "nama"],
        },
      ],
      offset: offset,
      limit: limit,
      order: [[db.col("waktu_pemesanan"), "DESC"]],
    });

    res.status(200).json({
      status: members.length ? 200 : 404,
      message: members.length ? "Data Found" : "Data Not Found",
      data: members.length ? members : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + members.length - 1,
      totalRows: members.length ? totalRows : null,
      totalPage: members.length ? totalPage : null,
    });
  } else if (filter_nama == true && filter_booking == false) {
    const totalRows = await Members.count({
      include: [
        {
          model: Booking,
          where: { status: "approved" },
          include: [
            {
              model: Waktu,
            },
            {
              model: Kelas,
              include: [
                {
                  model: Units,
                },
              ],
            },
          ],
        },
        {
          model: Users,
          where: { nama: { [Op.substring]: nama } },
          attributes: ["id", "nama"],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const members = await Members.findAll({
      include: [
        {
          model: Booking,
          where: { status: "approved" },
          include: [
            {
              model: Waktu,
            },
            {
              model: Kelas,
              include: [
                {
                  model: Units,
                },
              ],
            },
          ],
        },
        {
          model: Users,
          where: { nama: { [Op.substring]: nama } },
          attributes: ["id", "nama"],
        },
      ],
      offset: offset,
      limit: limit,
      order: [[db.col("waktu_pemesanan"), "DESC"]],
    });

    res.status(200).json({
      status: members.length ? 200 : 404,
      message: members.length ? "Data Found" : "Data Not Found",
      data: members.length ? members : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + members.length - 1,
      totalRows: members.length ? totalRows : null,
      totalPage: members.length ? totalPage : null,
    });
  } else {
    const totalRows = await Members.count({
      where: {
        id_booking: id_booking,
      },
    });

    const totalPage = Math.ceil(totalRows / limit);

    const members = await Members.findAll({
      where: {
        id_booking: id_booking,
      },
      include: [
        {
          model: Booking,
          where: { status: "approved" },
          include: [
            {
              model: Waktu,
            },
            {
              model: Kelas,
              include: [
                {
                  model: Units,
                },
              ],
            },
          ],
        },
        { model: Users, attributes: ["id", "nama"] },
      ],
      offset: offset,
      limit: limit,
      order: [[db.col("waktu_pemesanan"), "DESC"]],
    });

    res.status(200).json({
      status: members.length ? 200 : 404,
      message: members.length ? "Data Found" : "Data Not Found",
      data: members.length ? members : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + members.length - 1,
      totalRows: members.length ? totalRows : null,
      totalPage: members.length ? totalPage : null,
    });
  }
};

export const postMember = async (req, res) => {
  const { id_booking, id_user } = req.body;

  const checkMemberBooking = await Members.findAll({
    where: {
      [Op.and]: [
        {
          id_user: id_user,
        },
        { id_booking: id_booking },
      ],
    },
  });

  if (checkMemberBooking.length > 0) {
    return res.status(200).json({
      status: 400,
      message: "Member already exist",
    });
  }

  try {
    const member = await Members.create({ id_booking, id_user });

    return res.status(200).json({
      status: 200,
      message: "Member created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

export const deleteMember = async (req, res) => {
  const id = req.params.id;

  try {
    const memberbyId = await Members.findAll({
      where: {
        id: id,
      },
    });

    if (memberbyId.length == 0) {
      return res.status(200).json({
        status: 404,
        message: "Member not found",
      });
    }

    const member = await Members.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: "Member delete successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};
