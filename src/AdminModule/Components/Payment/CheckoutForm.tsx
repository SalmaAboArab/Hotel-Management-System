import {useState} from "react";
import {
  Button,
  Container,
  Box,
  Typography,
  TextField,
 
  
} from "@mui/material";
import {useStripe, useElements, CardElement, AddressElement} from '@stripe/react-stripe-js';
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../Constants/Components/Urls";


const CheckoutForm = ({bookingId,setActiveStep}) => {
  console.log("from checkout",bookingId);
  // const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
 
  const handleSubmit = async (event) => {
 
      event.preventDefault();
    

    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    const {token, error} = await stripe.createToken(cardElement);
    let tokenId = token.id
    handlePayment({tokenId,error})

  }


  const handlePayment = async({tokenId,tokenError})=>{  

    console.log(tokenError);
    
    try{
      const response = await axios.post(`${baseUrl}/portal/booking/662d82aa6ebbbefbc1a33feb/pay`,
        {tokenId},
        {headers:{
          Authorization:localStorage.getItem("adminToken")
        }}
      )
      console.log(response);
      setActiveStep(1)
      
      toast.success("booking payed successfully")
    }catch (error) {
      console.error(error);
      toast.error(tokenError.message||"There's a mistake.")
    }
    
  }
 

  return (
    <>
      <Container
        maxWidth="sm"
        
      >
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
        >
          <AddressElement options={{mode: 'shipping'}}  />
          <Typography component={"p"} variant="body2" sx={{mt:1,opacity:0.9}}>Cart Number</Typography>
          <Box sx={{bgcolor:"#f1f1f1",padding:2,borderRadius:3}} >

          <CardElement />
          </Box>

          {/* {errorMessage && (
        <Typography component={"p"} sx={{ color: 'red' }}>{errorMessage}</Typography>
      )} */}
           <Button
      disabled={!stripe}
      type="submit"
      sx={{
        width: "100%",
        bgcolor: "primary.main",
        color: "white",
        transition:"0.5s",
        mt: 2,
        
        "&:hover": {
          bgcolor: "primary.light"
        }
      }}
    
    >
      Continue to Book
    </Button>
         
        </Box>
      </Container>
     
    </>
  );
};

export default CheckoutForm;