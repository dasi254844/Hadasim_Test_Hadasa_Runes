import { approveOrderApi } from "../api/orderService";

/**
 * Order component that displays details of a single order.
 * Allows the user to approve the order if its status is not 'In Process'.
 */
const Order = ({ order }) => {

  function submit() {
    approveOrderApi(order._id)
      .then(res => {
        alert("Sent successfully");
        order.status = 'In Process';
      })
      .catch(err => {
        alert("Error sending invitation");
        console.log(err);
      });
  }


  return (
    <div className="order-card">
      {/* Loop through each item in the order and display its details */}

      {order.items.map((item, index) => (
        <div key={item._id || index}> {/* Use item._id if available */}
          <h3>Name: {item.name}</h3>
          <h4>Quantity: {item.quantity}</h4>
          <h4>Price per unit: {item.pricePerUnit}</h4>
        </div>
      ))}

      {/* Display order status and date */}
      <h2>Status: {order.status}</h2>
      <h3>Date: {new Date(order.date).toLocaleString()}</h3>

      {/* Show the submit button if the order is not 'In Process' */}
      {order.status !== 'In Process' && <button onClick={submit}>Submit</button>}
    </div>
  );
};

export default Order;
