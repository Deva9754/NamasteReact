import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { forwardRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../../utils/CartSlice";
import { Link, useParams } from "react-router-dom";
import useProductCard from "../../utils/useProductCard";
import "./AddButton.css";
import { Slide } from "@mui/material";
const AddButton = () => {
  const { proId } = useParams();
  const product = useProductCard(proId);

  // custom Alert
  const [open, setOpen] = useState(false);
  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const handleAddItem = (product) => {
    dispatch(addItems(product));
  };

  const cartItems = useSelector((store) => store?.cart?.items);
  return (
    <div>
      <button
        className="add-btn"
        onClick={() => {
          handleAddItem(product);
          handleClickOpen();
        }}
      >
        ADD TO CART
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        maxWidth="xs" // Sets maximum width to 'xs' (extra small)
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle id="responsive-dialog-title">
          {"Cart is ready !!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You Added {cartItems.length} items to the cart.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to={"/Cart"} style={{ textDecoration: "none" }}>
            <Button autoFocus color="primary">
              Go to cart
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default AddButton;
