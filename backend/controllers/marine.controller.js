const getShipDetails = (req, res) => {
  try {
    const { name } = req.params;

    const data = {
      "Ever Given": {
        imo: "9811000",
        flag: "Panama",
        type: "Container Ship",
        status: "Active",
      },
      Titanic: {
        imo: "0000000",
        flag: "UK",
        type: "Passenger Ship",
        status: "Sank in 1912",
      },
    };

    res.status(200).json(data[name] || { message: "Ship not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getShipDetails,
};
