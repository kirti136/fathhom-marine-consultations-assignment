const getShipDetails = (req, res) => {
  try {
const { name = "" } = req.query;

    const data = [
      {
        name: "Titanic",
        status: "Active",
        imo: "9811000",
        type: "Container Ship",
        image:
          "https://cdn.pixabay.com/photo/2017/05/01/12/24/ship-2275399_640.jpg",
      },
      {
        name: "Titanic",
        status: "Sank (1912)",
        imo: "0000001",
        type: "Ocean Liner",
        image:
          "https://cdn.pixabay.com/photo/2015/09/22/19/00/ship-952292_640.jpg",
      },
      {
        name: "Symphony of the Seas",
        status: "Active",
        imo: "9744001",
        type: "Cruise Ship",
        image:
          "https://cdn.pixabay.com/photo/2024/05/28/12/28/ship-8793759_640.jpg",
      },
      {
        name: "USS Enterprise",
        status: "Decommissioned",
        imo: "CVN-65",
        type: "Aircraft Carrier",
        image:
          "https://cdn.pixabay.com/photo/2018/05/14/08/38/sailing-boat-3399014_640.jpg",
      },
      {
        name: "Seawise Giant",
        status: "Scrapped (2010)",
        imo: "7381154",
        type: "Oil Tanker",
        image:
          "https://cdn.pixabay.com/photo/2013/04/18/14/39/ship-105596_640.jpg",
      },
    ];

    const filtered = data.filter((ship) =>
      ship.name.toLowerCase().includes(name.toLowerCase())
    );

    res.status(200).json(filtered);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getShipDetails,
};
