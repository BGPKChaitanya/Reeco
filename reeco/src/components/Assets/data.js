import greenapple from "../Assets/Apple_Green_Smith.png";
import avacoda from "../Assets/Avocado_Hass.jpg";

export const supplierData = {
  supplierName: "East coast fruits & Vegetables",
  orderId: "32457ABC",
  date: "Thu, Feb 10",
  department: "300-444-678",
  status: "Awaiting your approval",
};

export const orderDetails = [
  {
    id: 1,
    productName: "Avacoda",
    image: avacoda,
    brand: "Levis",
    eachPrice: 60.85,
    quantity: 6,
    status: 0,
  },
  {
    id: 2,
    productName: "Almonds",
    image: greenapple,
    brand: "Levis",
    eachPrice: 60.85,
    quantity: 8,
    status: 0,
  },
  {
    id: 3,
    productName: "Cashew nuts",
    image: avacoda,
    brand: "Levis",
    eachPrice: 260.95,
    quantity: 3,
    status: 0,
  },
  {
    id: 4,
    productName: "Sugar beans",
    image: greenapple,
    brand: "Levis",
    eachPrice: 300.85,
    quantity: 5,
    status: 0,
  },
  {
    id: 5,
    productName: "Spicy chilly powder",
    image: avacoda,
    brand: "Levis",
    eachPrice: 78.85,
    quantity: 9,
    status: 0,
  },
  {
    id: 6,
    productName: "Almond Chocolate",
    image: greenapple,
    brand: "Levis",
    eachPrice: 95.65,
    quantity: 1,
    status: 0,
  },
  {
    id: 7,
    productName: "Almond Chocolate Icecream",
    image: avacoda,
    brand: "Levis",
    eachPrice: 95.65,
    quantity: 4,
    status: 0,
  },
  {
    id: 8,
    productName: "Spicy Fish fillets",
    image: greenapple,
    brand: "Levis",
    eachPrice: 195.65,
    quantity: 2,
    status: 0,
  },
];

export const updateStatus = [
  {
    id: 0,
    statusText: "",
    statusColor: "#8c9190",
  },
  {
    id: 1,
    statusText: "Approved",
    statusColor: "#219675",
  },
  {
    id: 2,
    statusText: "Missing",
    statusColor: "#a65421",
  },
  {
    id: 3,
    statusText: "Missing urgent",
    statusColor: "#c4352b",
  },
  {
    id: 4,
    statusText: "Price updated",
    statusColor: "#219675",
  },
  {
    id: 5,
    statusText: "Quantity updated",
    statusColor: "#219675",
  },
  {
    id: 6,
    statusText: "Quantity and Price updated",
    statusColor: "#219675",
  },
];
