import "../Styles/cadastro.css"
import Img from "../Assets/result.svg"
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import { Link } from 'react-router-dom';


function Cadastro({ logado = false }) {

    const handleRegister = (values) => {
        Axios.post("http://localhost:3001/register", {
            email: values.email,
            password: values.password,
        }).then((response) => {
            alert(response.data.msg);
            console.log(response);
            window.location.reload();
        });
    };

    const validationsRegister = yup.object().shape({
        email: yup
            .string()
            .email("E-mail invalid")
            .required("E-mail is Required"),
        password: yup
            .string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
        confirmation: yup
            .string()
            .oneOf([yup.ref("password"), null], "Passwords are different")
            .required("Password confirmation is required"),
    });


    return (
        <div className="body">
            <div className="left-cadastro">
                <img src={Img} alt="Pessoas olhando gráficos" className="chart" />
            </div>
            <div className="right-cadastro">
                <div className="card-cadastro">
                    <div className="user-links">
                        <div className="user-link-home">
                            {!logado && <Link to="/">Home</Link>}
                        </div>

                        <div className="user-link-cad">
                            {!logado && <Link to="/cadastro">REGISTER</Link>}
                        </div>
                    </div>
                    <h1>REGISTER</h1>
                    <Formik
                        initialValues={{}}
                        onSubmit={handleRegister}
                        validationSchema={validationsRegister}
                    >
                        <Form className="login-form">
                            <div className="form-group">
                                <label form="email">User</label>

                                <Field name="email" type='email' className="form-field" placeholder="Email" />

                                <ErrorMessage
                                    component="span"
                                    name="email"
                                    className="form-error"
                                />
                            </div>

                            {/*Another Field*/}

                            <div className="form-group">
                                <label form="email">Password</label>
                                <Field name="password" type='password' className="form-field" placeholder="Password" />

                                <ErrorMessage
                                    component="span"
                                    name="password"
                                    className="form-error"
                                />
                            </div>

                            {/*Confirmation*/}

                            <div className="form-group">
                                <label form="email">Confirm your Password</label>
                                <Field name="confirmation" type='password' className="form-field" placeholder="Password" />

                                <ErrorMessage
                                    component="span"
                                    name="confirmation"
                                    className="form-error"
                                />
                            </div>
                            <button className="button" type="submit">
                                REGISTER
                            </button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default Cadastro;