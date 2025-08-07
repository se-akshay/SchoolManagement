const School = require("../models/db.js");

const addSchools = async (req, res) => {
  const { name, address, long, lat } = req.body;
  if (
    !name ||
    !address ||
    long === undefined ||
    lat === undefined ||
    typeof long !== "number" ||
    typeof lat !== "number"
  ) {
    return res.status(400).json({ message: "all fields are required!" });
  }

  try {
    const newSchool = new School({ name, address, long, lat });
    await newSchool.save();
    return res.status(200).json({ message: "School saved in the db." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error adding school.", error: error.message });
  }
};

const listSchools = async (req, res) => {
  const Lat = parseFloat(req.query.lat);
  const Long = parseFloat(req.query.long);

  if (isNaN(Lat) || isNaN(Long)) {
    return res
      .status(400)
      .json({
        message:
          "User latitude and longitude are required as query parameters.",
      });
  }

  try {
    const schools = await School.find();

    const schoolsWithDistance = schools.map((school) => {
      const toRad = (value) => (value * Math.PI) / 180;
      const R = 6371; 
      const dLat = toRad(school.lat - Lat);
      const dLon = toRad(school.long - Long);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(Lat)) *
          Math.cos(toRad(school.lat)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;
      return { ...school.toObject(), distance };
    });

    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    return res.status(200).json({ schools: schoolsWithDistance });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving schools.", error: error.message });
  }
};

module.exports = { addSchools, listSchools };
