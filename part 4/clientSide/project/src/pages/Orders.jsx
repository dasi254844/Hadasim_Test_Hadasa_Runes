import { useEffect, useState } from 'react';
import axios from 'axios';
import { getOrdersFromSupplierByIdApi } from '../api/orderService';
import Order from '../components/order';



/**
 * Orders component responsible for fetching and displaying
 * all orders associated with the currently logged-in supplier.
 */
export default function Orders({supplier}) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders for the given supplier ID when the component mounts
    getOrdersFromSupplierByIdApi(supplier._id)
      .then(res => {
        setOrders(res.data);
        alert("hi");
      })
      .catch(err => {
        alert("error by get all orders")
        console.log(err);
      })
  }, []);

  return (

    
    <div className="orders-list">
      {
        orders.map(o => <Order order={o} />)
        
        
      }
    </div>
    
  );
  
}
