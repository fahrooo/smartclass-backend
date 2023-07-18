import { Op, QueryTypes } from "sequelize";
import Booking from "../models/BookingModel.js";
import Kelas from "../models/KelasModel.js";
import Units from "../models/UnitsModel.js";
import db from "../config/Database.js";
import Users from "../models/UsersModel.js";
import Waktu from "../models/WaktuModel.js";
import PerangkatKelas from "../models/PerangkatKelasModel.js";
import Datastream from "../models/DatastreamModel.js";

export const getBooking = async (req, res) => {
  const {
    filter_nama,
    filter_unit,
    filter_status,
    filter_kelas,
    filter_id,
    id,
    nama,
    status,
    id_kelas,
    id_unit,
  } = req.body;

  const page = parseInt(req.body.page) - 1;
  const limit = parseInt(req.body.limit);
  const offset = limit * page;

  Kelas.hasMany(Booking, { foreignKey: "id_kelas" });
  Booking.belongsTo(Kelas, { foreignKey: "id_kelas" });
  Users.hasMany(Booking, { foreignKey: "id_user" });
  Booking.belongsTo(Users, { foreignKey: "id_user" });
  Waktu.hasMany(Booking, { foreignKey: "id_waktu" });
  Booking.belongsTo(Waktu, { foreignKey: "id_waktu" });
  Units.hasMany(Kelas, { foreignKey: "id_unit" });
  Kelas.belongsTo(Units, { foreignKey: "id_unit" });

  if (
    filter_status == true &&
    filter_unit == true &&
    filter_kelas == true &&
    filter_nama == true
  ) {
    const totalRows = await Booking.count({
      where: {
        [Op.and]: [{ status: status }, { id_kelas: id_kelas }],
      },
      include: [
        {
          model: Users,
          where: { nama: { [Op.substring]: nama } },
          attributes: ["id", "nama"],
        },
        {
          model: Waktu,
        },
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const booking = await Booking.findAll({
      where: {
        [Op.and]: [{ status: status }, { id_kelas: id_kelas }],
      },
      include: [
        {
          model: Users,
          where: { nama: { [Op.substring]: nama } },
          attributes: ["id", "nama"],
        },
        {
          model: Waktu,
        },
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
      ],
      offset: offset,
      limit: limit,
      order: [
        ["waktu_pemesanan", "DESC"],
        ["status", "ASC"],
      ],
    });

    res.status(200).json({
      status: booking.length ? 200 : 404,
      message: booking.length ? "Data Found" : "Data Not Found",
      data: booking.length ? booking : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + booking.length - 1,
      totalRows: booking.length ? totalRows : null,
      totalPage: booking.length ? totalPage : null,
    });
  }

  if (
    filter_status == true &&
    filter_unit == true &&
    filter_kelas == true &&
    filter_nama == false
  ) {
    const totalRows = await Booking.count({
      where: {
        [Op.and]: [{ status: status }, { id_kelas: id_kelas }],
      },
      include: [
        {
          model: Users,
          attributes: ["id", "nama"],
        },
        {
          model: Waktu,
        },
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const booking = await Booking.findAll({
      where: {
        [Op.and]: [{ status: status }, { id_kelas: id_kelas }],
      },
      include: [
        {
          model: Users,
          attributes: ["id", "nama"],
        },
        {
          model: Waktu,
        },
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
      ],
      offset: offset,
      limit: limit,
      order: [
        ["waktu_pemesanan", "DESC"],
        ["status", "ASC"],
      ],
    });

    res.status(200).json({
      status: booking.length ? 200 : 404,
      message: booking.length ? "Data Found" : "Data Not Found",
      data: booking.length ? booking : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + booking.length - 1,
      totalRows: booking.length ? totalRows : null,
      totalPage: booking.length ? totalPage : null,
    });
  }

  if (
    filter_status == false &&
    filter_unit == true &&
    filter_kelas == true &&
    filter_nama == true
  ) {
    const totalRows = await Booking.count({
      where: {
        id_kelas: id_kelas,
      },
      include: [
        {
          model: Users,
          where: { nama: { [Op.substring]: nama } },
          attributes: ["id", "nama"],
        },
        {
          model: Waktu,
        },
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const booking = await Booking.findAll({
      where: {
        id_kelas: id_kelas,
      },
      include: [
        {
          model: Users,
          where: { nama: { [Op.substring]: nama } },
          attributes: ["id", "nama"],
        },
        {
          model: Waktu,
        },
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
      ],
      offset: offset,
      limit: limit,
      order: [
        ["waktu_pemesanan", "DESC"],
        ["status", "ASC"],
      ],
    });

    res.status(200).json({
      status: booking.length ? 200 : 404,
      message: booking.length ? "Data Found" : "Data Not Found",
      data: booking.length ? booking : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + booking.length - 1,
      totalRows: booking.length ? totalRows : null,
      totalPage: booking.length ? totalPage : null,
    });
  }

  if (
    filter_status == false &&
    filter_unit == true &&
    filter_kelas == true &&
    filter_nama == false
  ) {
    const totalRows = await Booking.count({
      where: {
        id_kelas: id_kelas,
      },
      include: [
        {
          model: Users,
          attributes: ["id", "nama"],
        },
        {
          model: Waktu,
        },
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const booking = await Booking.findAll({
      where: {
        id_kelas: id_kelas,
      },
      include: [
        {
          model: Users,
          attributes: ["id", "nama"],
        },
        {
          model: Waktu,
        },
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
      ],
      offset: offset,
      limit: limit,
      order: [
        ["waktu_pemesanan", "DESC"],
        ["status", "ASC"],
      ],
    });

    res.status(200).json({
      status: booking.length ? 200 : 404,
      message: booking.length ? "Data Found" : "Data Not Found",
      data: booking.length ? booking : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + booking.length - 1,
      totalRows: booking.length ? totalRows : null,
      totalPage: booking.length ? totalPage : null,
    });
  }

  if (
    filter_status == true &&
    filter_unit == true &&
    filter_kelas == false &&
    filter_nama == true
  ) {
    const totalRows = await Booking.count({
      where: {
        status: status,
      },
      include: [
        {
          model: Users,
          where: { nama: { [Op.substring]: nama } },
          attributes: ["id", "nama"],
        },
        {
          model: Waktu,
        },
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const booking = await Booking.findAll({
      where: {
        status: status,
      },
      include: [
        {
          model: Users,
          where: { nama: { [Op.substring]: nama } },
          attributes: ["id", "nama"],
        },
        {
          model: Waktu,
        },
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
      ],
      offset: offset,
      limit: limit,
      order: [
        ["waktu_pemesanan", "DESC"],
        ["status", "ASC"],
      ],
    });

    res.status(200).json({
      status: booking.length ? 200 : 404,
      message: booking.length ? "Data Found" : "Data Not Found",
      data: booking.length ? booking : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + booking.length - 1,
      totalRows: booking.length ? totalRows : null,
      totalPage: booking.length ? totalPage : null,
    });
  }

  if (
    filter_status == true &&
    filter_unit == true &&
    filter_kelas == false &&
    filter_nama == false
  ) {
    const totalRows = await Booking.count({
      where: {
        status: status,
      },
      include: [
        {
          model: Users,
          attributes: ["id", "nama"],
        },
        {
          model: Waktu,
        },
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const booking = await Booking.findAll({
      where: {
        status: status,
      },
      include: [
        {
          model: Users,
          attributes: ["id", "nama"],
        },
        {
          model: Waktu,
        },
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
      ],
      offset: offset,
      limit: limit,
      order: [
        ["waktu_pemesanan", "DESC"],
        ["status", "ASC"],
      ],
    });

    res.status(200).json({
      status: booking.length ? 200 : 404,
      message: booking.length ? "Data Found" : "Data Not Found",
      data: booking.length ? booking : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + booking.length - 1,
      totalRows: booking.length ? totalRows : null,
      totalPage: booking.length ? totalPage : null,
    });
  }

  if (
    filter_status == true &&
    filter_unit == false &&
    filter_kelas == false &&
    filter_nama == true
  ) {
    const totalRows = await Booking.count({
      where: {
        status: status,
      },
      include: [
        {
          model: Users,
          where: { nama: { [Op.substring]: nama } },
          attributes: ["id", "nama"],
        },
        {
          model: Waktu,
        },
        {
          model: Kelas,
          include: [Units],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const booking = await Booking.findAll({
      where: {
        status: status,
      },
      include: [
        {
          model: Users,
          where: { nama: { [Op.substring]: nama } },
          attributes: ["id", "nama"],
        },
        {
          model: Waktu,
        },
        {
          model: Kelas,
          include: [Units],
        },
      ],
      offset: offset,
      limit: limit,
      order: [
        ["waktu_pemesanan", "DESC"],
        ["status", "ASC"],
      ],
    });

    res.status(200).json({
      status: booking.length ? 200 : 404,
      message: booking.length ? "Data Found" : "Data Not Found",
      data: booking.length ? booking : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + booking.length - 1,
      totalRows: booking.length ? totalRows : null,
      totalPage: booking.length ? totalPage : null,
    });
  }

  if (
    filter_status == true &&
    filter_unit == false &&
    filter_kelas == false &&
    filter_nama == false
  ) {
    const totalRows = await Booking.count({
      where: {
        status: status,
      },
      include: [
        {
          model: Users,
          attributes: ["id", "nama"],
        },
        {
          model: Waktu,
        },
        {
          model: Kelas,
          include: [Units],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const booking = await Booking.findAll({
      where: {
        status: status,
      },
      include: [
        {
          model: Users,
          attributes: ["id", "nama"],
        },
        {
          model: Waktu,
        },
        {
          model: Kelas,
          include: [Units],
        },
      ],
      offset: offset,
      limit: limit,
      order: [
        ["waktu_pemesanan", "DESC"],
        ["status", "ASC"],
      ],
    });

    res.status(200).json({
      status: booking.length ? 200 : 404,
      message: booking.length ? "Data Found" : "Data Not Found",
      data: booking.length ? booking : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + booking.length - 1,
      totalRows: booking.length ? totalRows : null,
      totalPage: booking.length ? totalPage : null,
    });
  }

  if (
    filter_status == false &&
    filter_unit == true &&
    filter_kelas == false &&
    filter_nama == true
  ) {
    const totalRows = await Booking.count({
      include: [
        {
          model: Users,
          where: { nama: { [Op.substring]: nama } },
          attributes: ["id", "nama"],
        },
        {
          model: Waktu,
        },
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const booking = await Booking.findAll({
      include: [
        {
          model: Users,
          where: { nama: { [Op.substring]: nama } },
          attributes: ["id", "nama"],
        },
        {
          model: Waktu,
        },
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
      ],
      offset: offset,
      limit: limit,
      order: [
        ["waktu_pemesanan", "DESC"],
        ["status", "ASC"],
      ],
    });

    res.status(200).json({
      status: booking.length ? 200 : 404,
      message: booking.length ? "Data Found" : "Data Not Found",
      data: booking.length ? booking : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + booking.length - 1,
      totalRows: booking.length ? totalRows : null,
      totalPage: booking.length ? totalPage : null,
    });
  }

  if (
    filter_status == false &&
    filter_unit == true &&
    filter_kelas == false &&
    filter_nama == false
  ) {
    const totalRows = await Booking.count({
      include: [
        {
          model: Users,
          attributes: ["id", "nama"],
        },
        {
          model: Waktu,
        },
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const booking = await Booking.findAll({
      include: [
        {
          model: Users,
          attributes: ["id", "nama"],
        },
        {
          model: Waktu,
        },
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
      ],
      offset: offset,
      limit: limit,
      order: [
        ["waktu_pemesanan", "DESC"],
        ["status", "ASC"],
      ],
    });

    res.status(200).json({
      status: booking.length ? 200 : 404,
      message: booking.length ? "Data Found" : "Data Not Found",
      data: booking.length ? booking : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + booking.length - 1,
      totalRows: booking.length ? totalRows : null,
      totalPage: booking.length ? totalPage : null,
    });
  }

  if (
    filter_status == false &&
    filter_unit == false &&
    filter_kelas == false &&
    filter_nama == true
  ) {
    const totalRows = await Booking.count({
      include: [
        {
          model: Users,
          where: { nama: { [Op.substring]: nama } },
          attributes: ["id", "nama"],
        },
        {
          model: Waktu,
        },
        {
          model: Kelas,
          include: [Units],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const booking = await Booking.findAll({
      include: [
        {
          model: Users,
          where: { nama: { [Op.substring]: nama } },
          attributes: ["id", "nama"],
        },
        {
          model: Waktu,
        },
        {
          model: Kelas,
          include: [Units],
        },
      ],
      offset: offset,
      limit: limit,
      order: [
        ["waktu_pemesanan", "DESC"],
        ["status", "ASC"],
      ],
    });

    res.status(200).json({
      status: booking.length ? 200 : 404,
      message: booking.length ? "Data Found" : "Data Not Found",
      data: booking.length ? booking : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + booking.length - 1,
      totalRows: booking.length ? totalRows : null,
      totalPage: booking.length ? totalPage : null,
    });
  }

  if (
    filter_status == false &&
    filter_unit == false &&
    filter_kelas == false &&
    filter_nama == false
  ) {
    const totalRows = await Booking.count({
      include: [
        {
          model: Users,
          attributes: ["id", "nama"],
        },
        {
          model: Waktu,
        },
        {
          model: Kelas,
          include: [Units],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const booking = await Booking.findAll({
      include: [
        {
          model: Users,
          attributes: ["id", "nama"],
        },
        {
          model: Waktu,
        },
        {
          model: Kelas,
          include: [Units],
        },
      ],
      offset: offset,
      limit: limit,
      order: [
        ["waktu_pemesanan", "DESC"],
        ["status", "ASC"],
      ],
    });

    res.status(200).json({
      status: booking.length ? 200 : 404,
      message: booking.length ? "Data Found" : "Data Not Found",
      data: booking.length ? booking : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + booking.length - 1,
      totalRows: booking.length ? totalRows : null,
      totalPage: booking.length ? totalPage : null,
    });
  }
};

export const getBookingbyId = async (req, res) => {
  const id = req.params.id;

  Kelas.hasMany(Booking, { foreignKey: "id_kelas" });
  Booking.belongsTo(Kelas, { foreignKey: "id_kelas" });
  Users.hasMany(Booking, { foreignKey: "id_user" });
  Booking.belongsTo(Users, { foreignKey: "id_user" });
  Waktu.hasMany(Booking, { foreignKey: "id_waktu" });
  Booking.belongsTo(Waktu, { foreignKey: "id_waktu" });
  Units.hasMany(Kelas, { foreignKey: "id_unit" });
  Kelas.belongsTo(Units, { foreignKey: "id_unit" });

  const checkBookingbyId = await Booking.findByPk(id, {
    include: [
      {
        model: Users,
        attributes: ["id", "nama"],
      },
      {
        model: Waktu,
      },
      {
        model: Kelas,
        include: [Units],
      },
    ],
  });

  if (checkBookingbyId === null) {
    return res.status(200).json({
      status: 404,
      message: "Booking not found",
    });
  }

  return res.status(200).json({
    status: 200,
    message: "Booking found",
    data: checkBookingbyId,
  });
};

export const postBooking = async (req, res) => {
  const {
    id_user,
    id_kelas,
    id_waktu,
    waktu_pemesanan,
    is_booking,
    status,
    keterangan,
  } = req.body;

  try {
    const booking = await Booking.create({
      id_user,
      id_kelas,
      id_waktu,
      waktu_pemesanan,
      is_booking,
      status,
      keterangan,
    });

    return res.status(200).json({
      status: 200,
      message: "Created successfully",
    });
  } catch (error) {
    return res.status(200).json({
      status: 400,
      message: error,
    });
  }
};

export const putBooking = async (req, res) => {
  const id = req.params.id;
  const {
    id_user,
    id_kelas,
    id_waktu,
    waktu_pemesanan,
    is_booking,
    status,
    keterangan,
  } = req.body;

  try {
    const booking = await Booking.update(
      {
        id_user,
        id_kelas,
        id_waktu,
        waktu_pemesanan,
        is_booking,
        status,
        keterangan,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return res.status(200).json({
      status: 200,
      message: "Updated successfully",
    });
  } catch (error) {
    return res.status(200).json({
      status: 400,
      message: "Updated failed",
    });
  }
};

export const deleteBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const bookingbyid = await Booking.findAll({
      where: {
        id: id,
      },
    });

    if (bookingbyid.length == 0) {
      return res.status(200).json({
        status: 404,
        message: "Booking not found",
      });
    }

    const booking = await Booking.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: "Deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

export const rejectBooking = async (req, res) => {
  const { waktu_pemesanan, id_waktu, id_kelas } = req.body;

  try {
    const booking = await Booking.update(
      {
        status: "rejected",
      },
      {
        where: {
          [Op.and]: [
            { id_kelas: id_kelas },
            { id_waktu: id_waktu },
            { waktu_pemesanan: waktu_pemesanan },
          ],
          [Op.or]: [{ status: "approved" }, { status: "waiting" }],
        },
      }
    );

    console.log("Hallo", booking);

    return res.status(200).json({
      status: 200,
      message: "Updated successfully",
    });
  } catch (error) {
    return res.status(200).json({
      status: 400,
      message: "Updated failed",
    });
  }
};

export const scheduleKelas = async (req, res) => {
  const { id_unit, waktu_pemesanan } = req.body;

  try {
    const booking = await db.query(
      `SELECT
      * 
    FROM
      (
      SELECT
        x.ID,
        x.nama,
        "count" ( y.id_kelas ) AS jumlah_booking 
      FROM
        "classrooms" x
        LEFT JOIN booking y ON x."id" = y.id_kelas 
      WHERE
        x.id_unit = ${id_unit} 
        AND DATE ( y.waktu_pemesanan ) = '${waktu_pemesanan}' 
        AND y.status = 'approved' 
      GROUP BY
        x.nama,
        x.ID 
      ORDER BY
        x.nama 
      ) AS booking_true UNION ALL
    SELECT ID
      ,
      nama,
      0 AS jumlah_booking 
    FROM
      classrooms 
    WHERE
      id_unit = ${id_unit} 
      AND nama NOT IN (
      SELECT
        x.nama 
      FROM
        "classrooms" x
        LEFT JOIN booking y ON x."id" = y.id_kelas 
      WHERE
        x.id_unit = ${id_unit} 
        AND DATE ( y.waktu_pemesanan ) = '${waktu_pemesanan}' 
        AND y.status = 'approved' 
      GROUP BY
        x.nama,
        x.ID 
      ORDER BY
      x.nama 
      )
      ORDER BY nama ASC`,
      {
        type: QueryTypes.SELECT,
      }
    );

    if (booking.length > 0) {
      return res.status(200).json({
        status: 200,
        data: booking,
      });
    } else {
      return res.status(200).json({
        status: 404,
        message: "Data not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

export const scheduleBooking = async (req, res) => {
  const { id_kelas, waktu_pemesanan } = req.body;

  try {
    const booking = await db.query(
      `SELECT * FROM (SELECT waktu.id, to_char(time_start,'HH24:MI') as time_start, to_char(time_end,'HH24:MI') as time_end, booking.id as id_booking, id_user, id_kelas, id_waktu, waktu_pemesanan, is_booking, status, keterangan, booking."createdAt" FROM "waktu" JOIN booking ON booking.id_waktu=waktu."id" WHERE id_kelas = ${id_kelas} AND date(waktu_pemesanan) = '${waktu_pemesanan}' AND status='approved'
      UNION ALL
      SELECT waktu.id, to_char(time_start,'HH24:MI') as time_start, to_char(time_end,'HH24:MI') as time_end, booking.id as id_booking, id_user, id_kelas, id_waktu, waktu_pemesanan, is_booking, status, keterangan, booking."createdAt" FROM "waktu" LEFT JOIN booking ON booking.id_waktu=NULL WHERE waktu.id NOT IN (SELECT waktu.id FROM "waktu" JOIN booking ON booking.id_waktu=waktu."id" WHERE id_kelas = ${id_kelas} AND date(waktu_pemesanan) = '${waktu_pemesanan}' AND status='approved')) AS waktu_booking ORDER BY id ASC`,
      {
        type: QueryTypes.SELECT,
      }
    );

    if (booking.length > 0) {
      return res.status(200).json({
        status: 200,
        data: booking,
      });
    } else {
      return res.status(200).json({
        status: 404,
        message: "Data not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

export const getPerangkatKelasBySchedule = async (req, res) => {
  const { waktu_pemesanan, time_start } = req.body;

  try {
    const booking = await db.query(
      `SELECT
      booking."id",
      booking.waktu_pemesanan,
      booking.status,
      to_char( waktu.time_start, 'HH24:MI' ) AS time_start,
      to_char( waktu.time_end, 'HH24:MI' ) AS time_end,
      perangkat_kelas.nama AS nama_perangkat,
      classrooms.topic,
      datastream.turn_on,
      datastream.turn_off 
    FROM
      "booking"
      JOIN waktu ON booking."id_waktu" = waktu."id"
      JOIN perangkat_kelas ON booking.id_kelas = perangkat_kelas.id_kelas
      JOIN classrooms ON perangkat_kelas.id_kelas = classrooms."id"
      JOIN datastream ON perangkat_kelas.id_datastream = datastream."id" 
    WHERE
      waktu_pemesanan = '${waktu_pemesanan}' 
      AND time_start = '${time_start}' 
      AND status = 'approved'`,
      {
        type: QueryTypes.SELECT,
      }
    );

    if (booking.length > 0) {
      return res.status(200).json({
        status: 200,
        data: booking,
      });
    } else {
      return res.status(200).json({
        status: 404,
        message: "Data not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};
