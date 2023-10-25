import React from "react";
import Navbar from "../Navbar";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Chip,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  OutlinedInput,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { supplierData } from "../Assets/data";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SearchIcon from "@mui/icons-material/Search";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import OrderTable from "./OrderTable";
import { useSelector } from "react-redux";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

const Order = () => {
  const Outerdiv = styled.div``;
  const Startdiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;
  const [searchInput, setsearchInput] = React.useState("");
  const [loadPrice, setloadPrice] = React.useState(0);
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    console.log("search:", searchInput);
  };
  const rows = useSelector((state) => state.product.product);
  console.log("search:", searchInput);

  React.useEffect(() => {
    let totalLoadPrice = 0;
    for (let each of rows) {
      totalLoadPrice = totalLoadPrice + each.eachPrice * each.quantity;
      console.log(totalLoadPrice);
    }
    setloadPrice(Math.round((totalLoadPrice * 100) / 100));
  }, []);

  return (
    <div>
      <Navbar />
      <Card sx={{ padding: "25px 50px 25px 80px" }}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link underline="hover" color="inherit" href="/">
            Orders
          </Link>
          <Typography>Order {supplierData.orderId}</Typography>
        </Breadcrumbs>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "15px",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Order {supplierData.orderId}
          </Typography>
          <Box>
            <Chip
              label="Back"
              variant="outlined"
              sx={{
                fontWeight: "bold",
                color: "#083b2f",
              }}
            />
            <Chip
              label="Approve Order"
              sx={{
                fontWeight: "bold",
                color: "#fff",
                backgroundColor: "#083b2f",
                marginLeft: "15px",
              }}
            />
          </Box>
        </Box>
      </Card>
      <Startdiv>
        <Box
          sx={{
            border: "1px solid #b8bfba",
            marginTop: "25px",
            borderRadius: "10px",
            width: "90vw",
          }}
        >
          <Grid container sx={{ padding: "10px", borderColor: "#b8bfba" }}>
            <Grid item sx={{ paddingLeft: "15px" }} lg={2}>
              <Typography sx={{ color: "grey" }}>Supplier</Typography>
              <Typography sx={{ fontWeight: "bold", marginTop: "10px" }}>
                {supplierData.supplierName}
              </Typography>
            </Grid>
            <Divider orientation="vertical" flexItem></Divider>
            <Grid item sx={{ paddingLeft: "15px" }} lg={2}>
              <Typography sx={{ color: "grey" }}>Shipping date</Typography>
              <Typography sx={{ fontWeight: "bold", marginTop: "10px" }}>
                {supplierData.date}
              </Typography>
            </Grid>
            <Divider orientation="vertical" flexItem></Divider>
            <Grid item sx={{ paddingLeft: "15px" }} lg={2}>
              <Typography sx={{ color: "grey" }}>Total</Typography>
              <Typography sx={{ fontWeight: "bold", marginTop: "10px" }}>
                $ {loadPrice}
              </Typography>
            </Grid>
            <Divider orientation="vertical" flexItem></Divider>
            <Grid item sx={{ paddingLeft: "15px" }} lg={2}>
              <Typography sx={{ color: "grey" }}>Category</Typography>
              <RestaurantMenuIcon sx={{ color: "grey" }} />
            </Grid>
            <Divider orientation="vertical" flexItem></Divider>
            <Grid item sx={{ paddingLeft: "15px" }} lg={2}>
              <Typography sx={{ color: "grey" }}>Department</Typography>
              <Typography sx={{ fontWeight: "bold", marginTop: "10px" }}>
                {supplierData.department}
              </Typography>
            </Grid>
            <Divider orientation="vertical" flexItem></Divider>
            <Grid item sx={{ paddingLeft: "15px" }}>
              <Typography sx={{ color: "grey" }}>Status</Typography>
              <Typography sx={{ fontWeight: "bold", marginTop: "10px" }}>
                {supplierData.status}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            border: "1px solid #b8bfba",
            marginTop: "25px",
            borderRadius: "10px",
            width: "90vw",
          }}
        >
          <Box
            sx={{
              margin: "15px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FormControl sx={{ m: 1, width: "50ch" }} variant="outlined">
              <OutlinedInput
                type="text"
                sx={{ borderRadius: "50px" }}
                value={searchInput}
                onChange={(e) => {
                  setsearchInput(e.target.value);
                }}
                size="small"
                placeholder="Search"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearch} edge="end">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{
                width: "300px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Chip
                label="Add item"
                variant="outlined"
                sx={{
                  fontWeight: "bold",
                  color: "#083b2f",
                  borderColor: "#083b2f",
                }}
              />
              <LocalPrintshopOutlinedIcon />
            </Box>
          </Box>
          <Box sx={{ padding: "20px" }}>
            <OrderTable />
          </Box>
        </Box>
      </Startdiv>
    </div>
  );
};

export default Order;
