import { useForm } from "react-hook-form"
import { useState } from "react";
import { loginSupplierApi } from "../api/supplierService";
import { useNavigate } from "react-router-dom";

/**
 * Login component that allows a supplier to log in.
 * On successful login, updates the supplier state and navigates accordingly.
 */
const Login = ({ setSupplier }) => {

    let navigate = useNavigate();
    const [errorNoExist, setErrorNoExist] = useState(false);

    /**
     * Handles form submission and performs login via API.
     * Displays relevant error messages based on the response.
     */
    function login(data) {
        loginSupplierApi(data)
            .then(res => {
                setErrorNoExist(false)
                setSupplier(res.data);
                alert(" Hello to: " + res.data.representativeName);
                console.log(res)
            })
            .catch(err => {
                console.log(err)
                if (err.response.data.message == "The password is incorrect.")
                    setErrorNoExist(true);
                if (err.response.data.message == "No supplier with such details") {
                    alert("The supplier does not exist! Please register")
                    navigate("/register")
                }
            })
    }

    let { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <form className="form" onSubmit={handleSubmit(login)}>
            <input type="text" {...register("representativeName", {
                required: { value: true, message: "representativeName is required" },
            })} />
            {errors.email && <p className="error">{errors.email.message}</p>}

            <input type="password" placeholder="password" {...register("password", {
                required: { value: true, message: "password is required" },
            })} />
            {errors.password && <p className="error">{errors.password.message}</p>}

            <input type="submit" />
            {errorNoExist && <p className="error"> The password is incorrect. </p>}
        </form>
    );
}

export default Login;
