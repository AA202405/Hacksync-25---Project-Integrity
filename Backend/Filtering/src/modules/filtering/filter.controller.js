const filterService = require("./filter.service");

exports.getFilteredIssues = (req, res) => {
  const filters = {
    infrastructureType: req.query.infrastructureType,
    status: req.query.status
  };

  const data = filterService.applyFilters(filters);

  res.status(200).json({
    count: data.length,
    data
  });
};
