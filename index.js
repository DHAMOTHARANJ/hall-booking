import express from "express";
const app = express();
const PORT = 9000;
app.use(express.json());
//initlaizing the data
const hallData = [
  {
    id: "1",
    numberOfSeats: 50,
    amenities: ["Ac", "discolights", "Tech Equipment and Support", "Kitchen for Catering"],
    price: 15000,
    ifBooked: "true",
    customerName: "Dhamo",
    date: "17-dec-2023",
    startTime: "23-dec-2023 at 12PM",
    endTime: "24-dec-2023 at 11am",
    RoomId: 150,
    RoomName: "Duplex",
  },
  {
    id: "2",
    numberOfSeats: 70,
    amenities: ["Ac", "discolights", "Kitchen for Catering"],
    price: 10000,
    ifBooked: "false",
    customerName: "",
    date: "",
    startTime: "",
    endTime: "",
    RoomId: 151,
    RoomName: "Duplex",
  },
  {
    id: "3",
    numberOfSeats: 50,
    amenities: ["Ac"],
    price: 5000,
    ifBooked: "false",
    customerName: "",
    date: "",
    startTime: "",
    endTime: "",
    RoomId: 152,
    RoomName: "Suite",
  },
  {
    id: "4",
    numberOfSeats: 80,
    amenities: ["Ac", "discolights"],
    price: 5000,
    ifBooked: "true",
    customerName: "Karthi",
    date: "15-dec-2023",
    startTime: "30-dec-2023 at 10am",
    endTime: "01-jan-2024 at 10am",
    RoomId: 153,
    RoomName: "Duplex",
  },
  {
    id: "5",
    numberOfSeats: 100,
    amenities: ["Ac", "discolights", "buffet", "Tech Equipment and Support"],
    price: 12000,
    ifBooked: "true",
    customerName: "Ram",
    date: "14-dec-2023",
    startTime: "30-dec-2023 at 09am",
    endTime: "01-jan-2024 at 12pm",
    RoomId: 154,
    RoomName: "Suite",
  },
];

//get request logic and method

app.get("/hall-details", (req, res) => {
  //to check the details of the booked rooms logic using request.query 
  const { ifBooked, numberOfSeats } = req.query;
  console.log(req.query, ifBooked);
  console.log(req.query, numberOfSeats);
  let filteredHall = hallData;
  if (ifBooked) {
    filteredHall = filteredHall.filter((halls) => halls.ifBooked === ifBooked);
  }
  if (numberOfSeats) {
    filteredHall = filteredHall.filter(
      (halls) => halls.numberOfSeats >= +numberOfSeats
    );
  }
  res.send(filteredHall);
});

//getting specific Room

app.get("/hall-details/:id", (req, res) => {
  //to get the details of the specif room
  const { id } = req.params;
  console.group(id);

  const halls = hallData.find((hall) => hall.id === id);
  res.send(halls);
});

//posting a new hall

app.post("/hall-details", (req, res) => {
  const newHall = {
    id: hallData.length + 1,
    numberOfSeats: req.body.numberOfSeats,
    amenities: req.body.amenities,
    price: req.body.price,
    RoomId: req.body.RoomId,
  };
  hallData.push(newHall);
  res.send(newHall);
});

//updating a hall which is not booked 
app.put("/hall-details/:id", (req, res) => {
  const { id } = req.params;
  const halls = hallData.find((hall) => hall.id === id);
  //logic for not updating an already booked room.
  if (halls.ifBooked === "true") {
    res.status(400).send("This Room already booked, please check with other options");
    return;
  } else halls.customerName = req.body.customerName;
  halls.date = req.body.date;
  halls.startTime = req.body.startTime;
  halls.endTime = req.body.endTime;
  res.send(halls);
});

app.listen(PORT, () =>
  console.log(`Server started on port: localhost:${PORT}/hall-details`, PORT)
);