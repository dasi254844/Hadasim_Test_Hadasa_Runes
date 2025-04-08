import { useForm } from "react-hook-form";
import { useState } from "react";
import { addSupplierApi } from "../api/supplierService";

/**
 * SignUp component for supplier registration.
 * It handles the form submission and error handling during the supplier registration process.
 */
const SignUp = ({setSupplier}) => {
  const [errorIs, setErrorIs] = useState(false);
  const [status, setStatus] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [products, setProducts] = useState([ // הגדרת state עבור המוצרים
  { name:"" , pricePerUnit: 0,minQuantity: 0} // רשימת מוצרים עם פרטי ברירת מחדל
]);

const handleProductChange = (e, index) => {
  const { name, value } = e.target;
  const updatedProducts = [...products];
  updatedProducts[index] = { ...updatedProducts[index], [name]: value };
  setProducts(updatedProducts);
};
const handleAddProduct = () => {
  setProducts([
    ...products,
    { productName: ""}
  ]);
};


   // Function to handle the form submission and register a new supplier.
   
  const save = (data) => {

    setStatus("loading");
    addSupplierApi(data)
      .then(res => {
        setStatus("done");
        alert("Supplier registered successfully!");
        setErrorIs(false);
      })
      .catch((err) => {
        setStatus("done");
        console.log(err);
        setErrorIs(true);
        alert("Error during registration");
        if (err.response.data.message === "Supplier already exists") {
          setErrorIs(true);
        }
      });
  };

  return (
    <form className="form" noValidate onSubmit={handleSubmit(save)}>
      <input type="text" placeholder="Company Name" {...register("companyName", { required: "Company name is required" })} />
      {errors.companyName && <p className="error">{errors.companyName.message}</p>}

      <input type="text" placeholder="Representative Name" {...register("representativeName", { required: "Representative name is required" })} />
      {errors.representativeName && <p className="error">{errors.representativeName.message}</p>}

      <input type="tel" placeholder="Phone Number" {...register("phoneNumber", { required: "Phone number is required", pattern: { value: /^(\+972|0)([2-9]{1}[0-9]{7}|5[0-9]{8})$/, message: "Invalid phone number" } })} />
      {errors.phone && <p className="error">{errors.phone.message}</p>}

      <input type="password" placeholder="Password" {...register("password", { required: "Password is required" })} />
      {errors.password && <p className="error">{errors.password.message}</p>}

      {errorIs && <p className="error">Supplier already exists</p>}
      {status === "loading" && <p>Loading...</p>}

      {products.map((product, index) => (
         <div key={index}>
         <input 
           type="text" 
           placeholder="Product Name" 
           {...register("name", { required: "Product name is required" })}
         />
         {errors.products && errors.products[index] && errors.products[index].name && 
           <p className="error">{errors.products[index].name.message}</p>
         }

       </div>
      ))}
      <button type="button" onClick={handleAddProduct}>Add Product</button>


      <input type="submit" value="Sign Up" />
    </form>
  );
};

export default SignUp;