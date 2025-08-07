const express = require("express");
const { addSchools, listSchools } = require("../controllers/schoolControllers");
const router = express.Router(); // <-- Uppercase "R"

router.post("/addSchool", addSchools);
router.get("/listSchools", listSchools);

module.exports = router; // <-- Export the router
