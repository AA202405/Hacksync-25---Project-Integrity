const express = require("express");
const router = express.Router();
const filterController = require("./filter.controller");

router.get("/issues", filterController.getFilteredIssues);

module.exports = router;
