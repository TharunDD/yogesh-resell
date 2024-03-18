
import React, { Component } from 'react';
import Nabar from './nbar';
import Carsl from './carsol';
import ProductCard from './card';
import Footer from './footer';
import './home.css'; 
class Homee extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return ( 
           <div className='container'>
             <div >    <Nabar></Nabar> <Carsl></Carsl></div>
             <div className="co">
             <h4 id="as">Product for Sales:</h4>
             <div className='container'>            
             <ProductCard></ProductCard>
             <Footer></Footer>
             </div>

            </div>
           </div>
         );
    }
}
 
export default Homee;