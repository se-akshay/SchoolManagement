const express = require("express");
const { addSchools, listSchools } = require("../controllers/schoolControllers");
const router = express.Router();

router.post("/addSchool", addSchools);
router.get("/listSchools", listSchools);

module.exports = router;
