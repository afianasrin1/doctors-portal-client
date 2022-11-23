import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useNavigation } from "react-day-picker";
import { useLoaderData } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";
import Checkout from "./Checkout";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log(stripePromise);
const Payment = () => {
  //data na likhe booking likhlam eki kotha
  const booking = useLoaderData();
  const navigation = useNavigation();
  //   console.log("booking data", data);
  const { treatment, price, appointmentDate, slot } = booking;
  if (navigation.state === "loading") {
    return <Loading></Loading>;
  }
  return (
    <div className="mx-5">
      <h3 className="text-3xl mb-5 font-bold">Payment for {treatment}</h3>
      <h3 className="text-xl mb-5">
        please pay for fee <strong>${price}</strong> your appointment on{" "}
        {appointmentDate} at time{" "}
        <span className="text-purple-900">{slot}</span>
      </h3>
      <div className="w-96 my-10 mx-auto ">
        {" "}
        <Elements stripe={stripePromise}>
          <Checkout booking={booking} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
