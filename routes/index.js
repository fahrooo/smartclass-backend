import express from "express";
import {
  getUsers,
  Register,
  Login,
  Logout,
  deleteUsers,
  verifyEmail,
  sendVerifyEmail,
  checkVerifyEmail,
  updateEmail,
  updatePassword,
  postUsers,
  putUsers,
  Me,
  getUsersbyId,
  resetPassword,
  sendVerifyEmailAuth,
  checkPassword,
} from "../controller/Users.js";
import {
  deleteUnits,
  getUnits,
  getUnitsAll,
  getUnitsbyId,
  postUnits,
  putUnits,
} from "../controller/Units.js";
import {
  deleteKelas,
  getKelas,
  getKelasbyId,
  matchCodeAkses,
  postKelas,
  putKelas,
  updateCodeAkses,
} from "../controller/Kelas.js";
import {
  deleteOperator,
  getOperator,
  getOperatorbyId,
  postOperator,
  putOperator,
} from "../controller/operatorKelas.js";
import {
  deleteDatastream,
  getDatastream,
  getDatastreambyId,
  postDatastream,
  putDatastream,
} from "../controller/datastream.js";
import {
  deletePerangkatKelas,
  getPerangkatKelas,
  getPerangkatKelasbyId,
  postPerangkatKelas,
  putPerangkatKelas,
} from "../controller/perangkatKelas.js";
import {
  deleteWaktu,
  getWaktu,
  postWaktu,
  putWaktu,
} from "../controller/waktu.js";
import {
  deleteBooking,
  getBooking,
  getBookingbyId,
  getPerangkatKelasBySchedule,
  postBooking,
  putBooking,
  rejectBooking,
  scheduleBooking,
  scheduleKelas,
} from "../controller/booking.js";
import { deleteMember, getMember, postMember } from "../controller/members.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controller/RefreshToken.js";
import {
  getMqtt,
  publishMessage,
  putMqtt,
  sendBufferAudio,
  subscribeMessage,
} from "../controller/mqtt.js";
import {
  deletePerangkat,
  getPerangkat,
  postPerangkat,
  putPerangkat,
} from "../controller/Perangkat.js";

const router = express.Router();

//Authitentication
router.get("/me/:id", Me);
router.post("/register", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);
router.post("/verifyemail", verifyEmail);
router.post("/sendverifyemail", sendVerifyEmail);
router.post("/checkverifyemail", checkVerifyEmail);
router.post("/updateemailverify", updateEmail);
router.post("/updatepassword", updatePassword);
router.post("/checkpassword", verifyToken, checkPassword);
router.post("/sendverifyemailauth", verifyToken, sendVerifyEmailAuth);

//CRUD Users
router.post("/users", verifyToken, getUsers);
router.get("/users/:id", verifyToken, getUsersbyId);
router.post("/users/create", verifyToken, postUsers);
router.put("/users/update/:id", verifyToken, putUsers);
router.delete("/users/delete/:id", verifyToken, deleteUsers);
router.post("/resetpassword", verifyToken, resetPassword);

//CRUD Units
router.get("/units", getUnitsAll);
router.post("/units", verifyToken, getUnits);
router.get("/units/:id", verifyToken, getUnitsbyId);
router.post("/units/create", verifyToken, postUnits);
router.put("/units/update/:id", verifyToken, putUnits);
router.delete("/units/delete/:id", verifyToken, deleteUnits);

//CRUD Kelas
router.post("/kelas", verifyToken, getKelas);
router.get("/kelas/:id", verifyToken, getKelasbyId);
router.post("/kelas/create", verifyToken, postKelas);
router.put("/kelas/update/:id", verifyToken, putKelas);
router.delete("/kelas/delete/:id", verifyToken, deleteKelas);
router.post("/updatecodeakses", verifyToken, updateCodeAkses);
router.post("/matchcodeakses", verifyToken, matchCodeAkses);

//CRUD Operator
router.post("/operator", verifyToken, getOperator);
router.get("/operator/:id", verifyToken, getOperatorbyId);
router.post("/operator/create", verifyToken, postOperator);
router.put("/operator/update/:id", verifyToken, putOperator);
router.delete("/operator/delete/:id", verifyToken, deleteOperator);

//CRUD Perangkat
router.post("/perangkat", getPerangkat);
router.post("/perangkat/create", postPerangkat);
router.put("/perangkat/update/:id", putPerangkat);
router.delete("/perangkat/delete/:id", deletePerangkat);

//CRUD Datastream
router.post("/datastream", verifyToken, getDatastream);
router.get("/datastream/:id", verifyToken, getDatastreambyId);
router.post("/datastream/create", verifyToken, postDatastream);
router.put("/datastream/update/:id", verifyToken, putDatastream);
router.delete("/datastream/delete/:id", verifyToken, deleteDatastream);

//CRUD Perangkat Kelas
router.post("/perangkatkelas", verifyToken, getPerangkatKelas);
router.get("/perangkatkelas/:id", verifyToken, getPerangkatKelasbyId);
router.post("/perangkatkelas/create", verifyToken, postPerangkatKelas);
router.put("/perangkatkelas/update/:id", verifyToken, putPerangkatKelas);
router.delete("/perangkatkelas/delete/:id", verifyToken, deletePerangkatKelas);

//CRUD Waktu
router.get("/waktu", verifyToken, getWaktu);
router.post("/waktu/create", verifyToken, postWaktu);
router.put("/waktu/update/:id", verifyToken, putWaktu);
router.delete("/waktu/delete/:id", verifyToken, deleteWaktu);

//CRUD Booking
router.post("/booking", verifyToken, getBooking);
router.get("/booking/:id", verifyToken, getBookingbyId);
router.post("/booking/create", verifyToken, postBooking);
router.put("/booking/update/:id", verifyToken, putBooking);
router.delete("/booking/delete/:id", verifyToken, deleteBooking);
router.post("/schedulekelas", verifyToken, scheduleKelas);
router.post("/booking/reject", verifyToken, rejectBooking);
router.post("/schedulebooking", verifyToken, scheduleBooking);
router.post(
  "/getperangkatkelasbyschedule",
  verifyToken,
  getPerangkatKelasBySchedule
);

//CRUD Members
router.post("/member", verifyToken, getMember);
router.post("/member/create", verifyToken, postMember);
router.delete("/member/delete/:id", verifyToken, deleteMember);

//MQTT
router.get("/mqtt", verifyToken, getMqtt);
router.put("/mqtt/update/:id", verifyToken, putMqtt);
router.post("/mqtt/publish", verifyToken, publishMessage);
router.post("/mqtt/subscribe", subscribeMessage);

export default router;
