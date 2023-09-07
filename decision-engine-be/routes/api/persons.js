const express = require("express");
const router = express.Router();
const persons = require("../../Persons");

router.get("/:personalCode", (req, res) => {
  const found = persons.some(
    (person) => person.personalCode === req.params.personalCode
  );
  if (found) {
    res.json(
      persons.filter(
        (person) => person.personalCode === req.params.personalCode
      )
    );
  } else {
    res.status(400).json({
      msg: `No person with the personal code of ${req.params.personalCode}`,
    });
  }
});

module.exports = router;
