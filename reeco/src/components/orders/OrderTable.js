import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Slide from "@mui/material/Slide";
import { useDispatch, useSelector } from "react-redux";
import { productAction } from "../../Store/productSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};

export default function OrderTable() {
  const [OpenClearbox, setOpenClearbox] = React.useState(false);
  const [OpenEditbox, setOpenEditbox] = React.useState(false);
  const [productPrice, setproductPrice] = React.useState(0);
  const [productQuantity, setproductQuantity] = React.useState(0);
  const [productDetails, setProductDetails] = React.useState("");
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.product.product);

  const handleUpdates = (id) => {
    if (productPrice !== 0 && productQuantity !== 0) {
      if (
        productDetails[0].eachPrice !== productPrice &&
        productDetails[0].quantity !== productQuantity
      ) {
        dispatch(
          productAction.PriceandQuantityChangeStatus({
            id: id,
            quantity: productQuantity,
            price: productPrice,
          })
        );
      } else if (productDetails[0].eachPrice !== productPrice) {
        dispatch(
          productAction.PriceChangeStatus({
            id: id,
            quantity: productQuantity,
            price: productDetails[0].eachPrice,
          })
        );
      } else if (productDetails[0].quantity !== productQuantity) {
        dispatch(
          productAction.QuantityChangeStatus({
            id: id,
            quantity: productDetails[0].quantity,
            price: productPrice,
          })
        );
      }
      setOpenEditbox(false);
    }
  };

  const handleClearButton = (id) => {
    setOpenClearbox(true);
    const filterDetails = rows.filter((each) => each.id === id);
    setProductDetails(filterDetails);
  };
  const handleEditBox = (id) => {
    setOpenEditbox(true);
    const filterDetails = rows.filter((each) => each.id === id);
    console.log(filterDetails);
    setProductDetails(filterDetails);
    setproductPrice(filterDetails[0].eachPrice);
    setproductQuantity(filterDetails[0].quantity);
  };
  const handleApproveStatus = (id) => {
    const filterDetail = rows.filter((each) => each.id === id);

    if (filterDetail[0].status === 0) {
      dispatch(productAction.ApproveStatus(id));
    }
  };
  const handleMissingStatus = (id) => {
    setOpenClearbox(false);
    dispatch(productAction.MissingStatus(id));
  };
  const handleMissingUrgentStatus = (id) => {
    setOpenClearbox(false);
    dispatch(productAction.MissingUrgentStatus(id));
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell align="center">Brand</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  <img
                    src={row.image}
                    alt={row.productName}
                    style={{ width: "50px", height: "50px" }}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.productName}
                </TableCell>
                <TableCell align="center">{row.brand}</TableCell>
                <TableCell align="center">
                  $ {row.eachPrice} / {row.quantity} + 1LB
                </TableCell>
                <TableCell align="center">$ {row.quantity} / 6 + 1LB</TableCell>
                <TableCell align="center">
                  $ {Math.round(row.eachPrice * row.quantity * 100) / 100}
                </TableCell>
                <TableCell align="center">
                  {row.status !== 0 ? (
                    <Chip
                      label={row.statusText}
                      sx={{
                        fontWeight: "bold",
                        color: "#fff",
                        backgroundColor: row.statusColor,
                      }}
                    />
                  ) : null}
                </TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleApproveStatus(row.id)}>
                    <CheckIcon
                      sx={{ color: row.status !== 0 ? "#8c9190" : "primary" }}
                    />
                  </Button>
                  <Button onClick={() => handleClearButton(row.id)}>
                    <ClearIcon
                      sx={{ color: row.status !== 0 ? "#8c9190" : "primary" }}
                    />
                  </Button>
                  <Button
                    onClick={() => handleEditBox(row.id)}
                    sx={{ color: row.status !== 0 ? "#8c9190" : "primary" }}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {OpenClearbox && productDetails[0].status === 0 && (
        <Dialog
          open={OpenClearbox}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setOpenClearbox(false)}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Missing Product"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Is {productDetails[0].productName} urgent?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleMissingUrgentStatus(productDetails[0].id)}
            >
              Yes
            </Button>
            <Button onClick={() => handleMissingStatus(productDetails[0].id)}>
              No
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {OpenEditbox && productDetails[0].status === 0 && (
        <Modal
          open={OpenEditbox}
          onClose={() => setOpenEditbox(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              {productDetails[0].productName}
            </Typography>
            <Typography sx={{ mt: 2 }}>{productDetails[0].brand}</Typography>
            <Box
              sx={{ display: "flex", flexDirection: "row", marginLeft: "10px" }}
            >
              <Box>
                <img
                  src={productDetails[0].image}
                  alt={productDetails[0].productName}
                  style={{ widht: "150px", height: "150px" }}
                />
              </Box>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ width: "100px" }}>Price</Typography>
                  <TextField
                    size="small"
                    sx={{ width: "150px" }}
                    onChange={(e) => setproductPrice(e.target.value)}
                    value={productPrice}
                  />
                  <Typography sx={{ marginLeft: "15px" }}>/ 6 + 1LB</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <Typography sx={{ width: "100px" }}>Quantity</Typography>
                  <TextField
                    size="small"
                    sx={{ width: "150px" }}
                    onChange={(e) => setproductQuantity(e.target.value)}
                    value={productQuantity}
                  />
                  <Typography sx={{ marginLeft: "15px" }}>x 6 + 1LB</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <Typography sx={{ width: "100px" }}>Total</Typography>
                  <Typography sx={{ marginLeft: "15px" }}>
                    $ {Math.round((productPrice * productQuantity * 100) / 100)}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Button
                sx={{
                  color: "#083b2f",
                  fontWeight: "bold",
                }}
                onClick={() => setOpenEditbox(false)}
              >
                Cancel
              </Button>
              <Button
                sx={{
                  backgroundColor: "#083b2f",
                  fontWeight: "bold",
                  color: "#fff",
                  borderRadius: "50px",
                  width: "100px",
                  marginLeft: "15px",
                }}
                onClick={() => handleUpdates(productDetails[0].id)}
              >
                Send
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
}
