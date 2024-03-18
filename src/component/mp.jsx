import React, { useEffect } from 'react'; // Import useEffect from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './mp.css';
import axios from "axios";
import { AiFillStar } from 'react-icons/ai';
import { BsStar } from 'react-icons/bs';
import { useLocation } from 'react-router-dom'; // Correct the import statement
import { useSelector } from 'react-redux'; // Correct the import statement
import { toast } from 'react-toastify';

const Spa = () => {
  const u = useSelector((state) => state.cart.user);
  const location = useLocation();
 const loadscript=()=>{
  return new Promise((resolve)=>{
    const script=document.createElement('script');
    script.src=`https://cdn.razorpay.com/static/embed_btn/bundle.js`;
    script.onload=()=>{
      resolve(true)
    }
    script.onerror=()=>{
      resolve(false);
    }
    document.body.appendChild(script);
  })
 }
  const displayRazorpay = async(us) => {
    console.log("clicked")
  const res=await loadscript('https://checkout.razorpay.com/v1/checkout.js');

    if(!res){
      alert("fo line")
      return 
    }
    const options={
          key:"rzp_test_SoSRK08sUQm3IH",
          currency:"INR",
          amount:(us.price)*100,
          name:us.model,
          handler:function (response) {
            alert(response.razorpay_payment_id)
          },
          prefill:{
            name:"Tharun"
          }
    };
    const payobj=new window.Razorpay(options);
    payobj.open();
    // const requestData = {
    //   name:us.name,
    //   phone:us.phone,
    //   price:us.price,
    //   model:us.model,
    //   type:us.type,
    //   duration:us.duration,
    //   image:us.image,
    //   uid:u.uid,
    // };
    // const confirmed = window.confirm(`Do you want to buy ${us.model} ?`);
    // if (confirmed) {
    //   console.log(`${us._id} and ${u.uid}`);
    //   axios
    //     .post(`http://localhost:3000/b/product/buy/`,requestData)
    //     .then(response => {
    //       console.log(response.message);
    //       toast.success("Your Order Confirmed");
    //     })
    //     .catch((eror) => {
    //       console.error("Error deleting data:", eror);
    //     });
    // }else{
    //   toast.error("Cancelled Transaction");
    // }
  };

  useEffect(() => {
    console.log("ji", location);
  }, []);

  const { data } = location.state || {};

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12" id="main">
          <div className="col-md-4" id="ff1">
            <img
              src={`https://recommerece.s3.ap-south-1.amazonaws.com/${data.image}`}
              alt="Yphone"
              id='ff2'
            />
          </div>
          <div className="col-md-5" id='ff'>
            <div id="fff1">
              <h4 style={{ fontFamily: 'Caladea', fontSize: "40px" }}>{data.model}</h4>
              <h6 style={{ fontFamily: 'Barlow', fontSize: "17px" }}>{data.desc}</h6>
              <AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><BsStar style={{ fontSize: '16px' }}></BsStar>
              <h4 style={{ fontFamily: 'Caladea', fontSize: "30px" }}>About product:</h4>
              <h6 style={{ fontFamily: 'Caladea', fontSize: "19px" }}>
                &nbsp;&nbsp;Duration: {data.duration} Months&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Owner: {data.nam}
              </h6>
              <h6 style={{ fontFamily: 'Caladea', fontSize: "19px" }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;Type: {data.type} Car&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Contact: {data.phone}
              </h6>
              <br />
              <p style={{ fontFamily: 'Caladea', fontSize: "30px" }}>Price: {data.price}$</p>
              <div id='ui'>
                <button className="btn btn-primary" onClick={() => displayRazorpay(data)}>Buy now</button>
                <button className="btn btn-primary" onClick={() => handleAddToCartClick()}>Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Define functions to handle button clicks

  const handleAddToCartClick = () => {
    // Add logic for Add to Cart button click
  };
}

export default Spa;
