import OperatorKelas from "../models/OperatorKelasModel.js";
import { Op } from "sequelize";
import Kelas from "../models/KelasModel.js";
import Users from "../models/UsersModel.js";
import Units from "../models/UnitsModel.js";

export const getOperator = async (req, res) => {
  const { filter_unit, filter_nama, filter_kelas, nama, id_kelas, id_unit } =
    req.body;

  const page = parseInt(req.body.page) - 1;
  const limit = parseInt(req.body.limit);
  const offset = limit * page;

  Kelas.hasMany(OperatorKelas, { foreignKey: "id_kelas" });
  OperatorKelas.belongsTo(Kelas, { foreignKey: "id_kelas" });
  Users.hasMany(OperatorKelas, { foreignKey: "id_user" });
  OperatorKelas.belongsTo(Users, { foreignKey: "id_user" });
  Units.hasMany(Kelas, { foreignKey: "id_unit" });
  Kelas.belongsTo(Units, { foreignKey: "id_unit" });

  if (filter_nama == true && filter_unit == true && filter_kelas == true) {
    const totalRows = await OperatorKelas.count({
      where: {
        id_kelas: id_kelas,
      },
      include: [
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
        {
          model: Users,
          where: {
            [Op.and]: [
              { nama: { [Op.substring]: nama } },
              { role: "operator" },
            ],
          },
          attributes: ["id", "nama"],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const operator = await OperatorKelas.findAll({
      where: {
        id_kelas: id_kelas,
      },
      include: [
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
        {
          model: Users,
          where: {
            [Op.and]: [
              { nama: { [Op.substring]: nama } },
              { role: "operator" },
            ],
          },
          attributes: ["id", "nama"],
        },
      ],
      offset: offset,
      limit: limit,
      order: [
        ["id_user", "ASC"],
        ["id_kelas", "ASC"],
      ],
    });

    res.status(200).json({
      status: operator.length ? 200 : 404,
      message: operator.length ? "Data Found" : "Data Not Found",
      data: operator.length ? operator : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + operator.length - 1,
      totalRows: operator.length ? totalRows : null,
      totalPage: operator.length ? totalPage : null,
    });
  }

  if (filter_nama == true && filter_unit == true && filter_kelas == false) {
    const totalRows = await OperatorKelas.count({
      include: [
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
        {
          model: Users,
          where: {
            [Op.and]: [
              { nama: { [Op.substring]: nama } },
              { role: "operator" },
            ],
          },
          attributes: ["id", "nama"],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const operator = await OperatorKelas.findAll({
      include: [
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
        {
          model: Users,
          where: {
            [Op.and]: [
              { nama: { [Op.substring]: nama } },
              { role: "operator" },
            ],
          },
          attributes: ["id", "nama"],
        },
      ],
      offset: offset,
      limit: limit,
      order: [
        ["id_user", "ASC"],
        ["id_kelas", "ASC"],
      ],
    });

    res.status(200).json({
      status: operator.length ? 200 : 404,
      message: operator.length ? "Data Found" : "Data Not Found",
      data: operator.length ? operator : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + operator.length - 1,
      totalRows: operator.length ? totalRows : null,
      totalPage: operator.length ? totalPage : null,
    });
  }

  if (filter_nama == false && filter_unit == true && filter_kelas == true) {
    const totalRows = await OperatorKelas.count({
      where: {
        id_kelas: id_kelas,
      },
      include: [
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
        {
          model: Users,
          where: { role: "operator" },
          attributes: ["id", "nama"],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const operator = await OperatorKelas.findAll({
      where: {
        id_kelas: id_kelas,
      },
      include: [
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
        {
          model: Users,
          where: { role: "operator" },
          attributes: ["id", "nama"],
        },
      ],
      offset: offset,
      limit: limit,
      order: [
        ["id_user", "ASC"],
        ["id_kelas", "ASC"],
      ],
    });

    res.status(200).json({
      status: operator.length ? 200 : 404,
      message: operator.length ? "Data Found" : "Data Not Found",
      data: operator.length ? operator : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + operator.length - 1,
      totalRows: operator.length ? totalRows : null,
      totalPage: operator.length ? totalPage : null,
    });
  }

  if (filter_nama == true && filter_unit == false && filter_kelas == false) {
    const totalRows = await OperatorKelas.count({
      include: [
        {
          model: Kelas,
          include: [Units],
        },
        {
          model: Users,
          where: {
            [Op.and]: [
              { nama: { [Op.substring]: nama } },
              { role: "operator" },
            ],
          },
          attributes: ["id", "nama"],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const operator = await OperatorKelas.findAll({
      include: [
        {
          model: Kelas,
          include: [Units],
        },
        {
          model: Users,
          where: {
            [Op.and]: [
              { nama: { [Op.substring]: nama } },
              { role: "operator" },
            ],
          },
          attributes: ["id", "nama"],
        },
      ],
      offset: offset,
      limit: limit,
      order: [
        ["id_user", "ASC"],
        ["id_kelas", "ASC"],
      ],
    });

    res.status(200).json({
      status: operator.length ? 200 : 404,
      message: operator.length ? "Data Found" : "Data Not Found",
      data: operator.length ? operator : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + operator.length - 1,
      totalRows: operator.length ? totalRows : null,
      totalPage: operator.length ? totalPage : null,
    });
  }

  if (filter_nama == false && filter_unit == true && filter_kelas == false) {
    const totalRows = await OperatorKelas.count({
      include: [
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
        {
          model: Users,
          where: { role: "operator" },
          attributes: ["id", "nama"],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const operator = await OperatorKelas.findAll({
      include: [
        {
          model: Kelas,
          where: { id_unit: id_unit },
          include: [Units],
        },
        {
          model: Users,
          where: { role: "operator" },
          attributes: ["id", "nama"],
        },
      ],
      offset: offset,
      limit: limit,
      order: [
        ["id_user", "ASC"],
        ["id_kelas", "ASC"],
      ],
    });

    res.status(200).json({
      status: operator.length ? 200 : 404,
      message: operator.length ? "Data Found" : "Data Not Found",
      data: operator.length ? operator : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + operator.length - 1,
      totalRows: operator.length ? totalRows : null,
      totalPage: operator.length ? totalPage : null,
    });
  }

  if (filter_nama == false && filter_unit == false && filter_kelas == false) {
    const totalRows = await OperatorKelas.count({
      include: [
        {
          model: Kelas,
          include: [Units],
        },
        {
          model: Users,
          where: { role: "operator" },
          attributes: ["id", "nama"],
        },
      ],
    });

    const totalPage = Math.ceil(totalRows / limit);

    const operator = await OperatorKelas.findAll({
      include: [
        {
          model: Kelas,
          include: [Units],
        },
        {
          model: Users,
          where: { role: "operator" },
          attributes: ["id", "nama"],
        },
      ],
      offset: offset,
      limit: limit,
      order: [
        ["id_user", "ASC"],
        ["id_kelas", "ASC"],
      ],
    });

    res.status(200).json({
      status: operator.length ? 200 : 404,
      message: operator.length ? "Data Found" : "Data Not Found",
      data: operator.length ? operator : null,
      page: page + 1,
      limit: limit,
      rows: offset + 1,
      rowsPage: offset + 1 + operator.length - 1,
      totalRows: operator.length ? totalRows : null,
      totalPage: operator.length ? totalPage : null,
    });
  }
};

export const getOperatorbyId = async (req, res) => {
  const id = req.params.id;

  Kelas.hasMany(OperatorKelas, { foreignKey: "id_kelas" });
  OperatorKelas.belongsTo(Kelas, { foreignKey: "id_kelas" });
  Users.hasMany(OperatorKelas, { foreignKey: "id_user" });
  OperatorKelas.belongsTo(Users, { foreignKey: "id_user" });
  Units.hasMany(Kelas, { foreignKey: "id_unit" });
  Kelas.belongsTo(Units, { foreignKey: "id_unit" });

  const checkOperatorById = await OperatorKelas.findByPk(id, {
    include: [
      {
        model: Kelas,
        include: [Units],
      },
      {
        model: Users,
        attributes: ["id", "nama"],
      },
    ],
  });

  if (checkOperatorById === null) {
    return res.status(200).json({
      status: 404,
      message: "Operator not found",
    });
  }

  return res.status(200).json({
    status: 200,
    message: "Operator found",
    data: checkOperatorById,
  });
};

export const postOperator = async (req, res) => {
  const { id_user, id_kelas } = req.body;

  const checkOperatorKelas = await OperatorKelas.findAll({
    where: {
      [Op.and]: [
        {
          id_user: id_user,
        },
        { id_kelas: id_kelas },
      ],
    },
  });

  if (checkOperatorKelas.length > 0) {
    return res.status(200).json({
      status: 400,
      message: "Operator already exist",
    });
  }

  try {
    const operator = await OperatorKelas.create({
      id_user: id_user,
      id_kelas: id_kelas,
    });

    return res.status(200).json({
      status: 200,
      message: "Created successfully",
    });
  } catch (error) {
    return res.status(200).json({
      status: 400,
      message: "Created failed",
    });
  }
};

export const putOperator = async (req, res) => {
  const id = req.params.id;
  const { id_user, id_kelas } = req.body;

  const operatorbyid = await OperatorKelas.findAll({
    where: {
      id: id,
    },
  });

  if (operatorbyid.length == 0) {
    return res.status(200).json({
      status: 400,
      message: "Operator not found",
    });
  }

  const checkOperatorKelas = await OperatorKelas.findAll({
    where: {
      [Op.and]: [
        {
          id_user: id_user,
        },
        { id_kelas: id_kelas },
      ],
    },
  });

  if (checkOperatorKelas.length > 0) {
    return res.status(200).json({
      status: 400,
      message: "Operator already exist",
    });
  }

  try {
    const operator = await OperatorKelas.update(
      {
        id_user: id_user,
        id_kelas: id_kelas,
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

export const deleteOperator = async (req, res) => {
  const id = req.params.id;

  try {
    const operatorbyid = await OperatorKelas.findAll({
      where: {
        id: id,
      },
    });

    if (operatorbyid.length > 0) {
      const operator = await OperatorKelas.destroy({
        where: {
          id: id,
        },
      });

      res.status(200).json({
        status: 200,
        message: "Deleted successfully",
      });
    } else {
      res.status(404).json({ status: 404, message: "Operator not found" });
    }
  } catch (error) {
    res.status(200).json({ status: 400, message: "Deleted failed" });
  }
};
