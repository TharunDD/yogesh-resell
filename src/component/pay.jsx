// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Pay() {
//   const [orderId, setOrderId] = useState(null);

//   useEffect(() => {
//     const createOrderId = async () => {
//       try {
//         const response = await axios.post('/create/orderId', {
//           amount: '50000'
//         });
//         setOrderId(response.data.orderId);
//         console.log(orderId);
//       } catch (error) {
//         console.error('Error creating orderId:', error);
//       }
//     };

//     createOrderId();
//   }, []); // Empty dependency array ensures the effect runs only once, similar to $(document).ready

//   return (
//     <div>
//       {orderId && (
//         <button onClick={() => console.log('Button clicked')}>Show</button>
//       )}
//     </div>
//   );
// }

// export default Pay;
// import React, { useEffect } from 'react';

// const Pay = () => {
//   useEffect(() => {
//     // Check if the Razorpay script has already been loaded
//     if (!document.getElementById('razorpay-embed-btn-js')) {
//       const script = document.createElement('script');
//       script.defer = true;
//       script.id = 'razorpay-embed-btn-js';
//       script.src = 'https://cdn.razorpay.com/static/embed_btn/bundle.js';

//       script.onload = () => {
//         // Initialize Razorpay if the script has loaded
//         const rzp = window['_rzp_'];
//         rzp && rzp.init && rzp.init();
//       };

//       // Append the script to the document body
//       document.body.appendChild(script);
//     }
//   }, []);

//   return (
//     <div className="razorpay-embed-btn" data-url="https://pages.razorpay.com/pl_Mk6KFlQswbw7xl/view" data-text="Pay Now" data-color="#07A8ED" data-size="large">
//       {/* Razorpay script will be loaded dynamically */}
//     </div>
//   );
// };

// export default Pay;
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Pay= () => {
  const [orderId, setOrderId] = useState(null);
  useEffect(() => {
    const createOrderId = async () => {
      try {
        const response = await axios('/create/orderId', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: '50000' }),
        });
  
        if (response.ok) {
          const data = await response.json();
          setOrderId(data.orderId);
  
          // Log the orderId to check if it's set correctly
          console.log('orderId:', data.orderId);
        } else {
          console.error('Error creating orderId:', response.statusText);
        }
      } catch (error) {
        console.error('Error creating orderId:', error);
      }
    };
  
    createOrderId();
  }, []);
  
  useEffect(() => {
    if (orderId) {
      const options = {
        key: 'YOUR_KEY_ID', // Enter your Razorpay Key ID
        amount: '50000',
        currency: 'INR',
        name: 'Acme Corp',
        description: 'Test Transaction',
        image: 'https://example.com/your_logo',
        order_id: orderId,
        handler: function (response) {
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp1 = new Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);

        // You can send payment verification data to your server here
        const verifyData = {
          response,
        };

        fetch('/api/payment/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(verifyData),
        });
      });
      rzp1.open();
    }
  }, [orderId]);

  return (
    <div>
      <button id="rzp-button1">Pay with Razorpay</button>
    </div>
  );
};

export default Pay;
