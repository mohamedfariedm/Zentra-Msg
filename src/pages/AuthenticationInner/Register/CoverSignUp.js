import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Container, Row, FormFeedback, Input, Button, Label } from 'reactstrap';
import logoLight from "../../../assets/images/zentra_logo_high_quality.png";

import AuthSlider from '../authCarousel';

//formik
import { useFormik } from 'formik';
import * as Yup from 'yup';
import LanguageDropdownRectangle from '../../../Components/Common/LanguageDropdownRectangle';

const CoverSignUp = () => {
    document.title = "Cover SignUp | Zentra Msg";

    const [passwordShow, setPasswordShow] = useState(false);

    const validation = useFormik({
        enableReinitialize: true,

        initialValues: {
            password: "",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .matches(RegExp('(.*[a-z].*)'), 'At least lowercase letter')
                .matches(RegExp('(.*[A-Z].*)'), 'At least uppercase letter')
                .matches(RegExp('(.*[0-9].*)'), 'At least one number')
                .required("This field is required"),
        }),
        onSubmit: (values) => {
            // console.log(values);
        }
    });

    return (
        <React.Fragment>
            <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
                <div className="bg-overlay"></div>
                <div className="auth-page-content overflow-hidden pt-lg-5">
                    <Container>
                        <Row className='justify-content-center'>
                            <Col lg={6}>
                                <Card className="overflow-hidden m-0">
                                    <Row className="justify-content-center g-0">
                                        {/* <AuthSlider /> */}

                                        <Col lg={12}>
                                            <div className="p-lg-5 p-4">
                                            <div className="text-center">
                                                    <Link to="/dashboard" className="d-block">
                                                        <img src={logoLight} alt="" height="120" />
                                                    </Link>
                                                </div>
                                                <LanguageDropdownRectangle />

                                                <div className="mt-4">
                                                    <form className="needs-validation" noValidate action="index">

                                                        <div className="mb-3">
                                                            <label htmlFor="useremail" className="form-label">Email <span className="text-danger">*</span></label>
                                                            <input type="email" className="form-control" id="useremail" placeholder="Enter email address" required />
                                                            <div className="invalid-feedback">
                                                                Please enter email
                                                            </div>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="username" className="form-label">Username <span className="text-danger">*</span></label>
                                                            <input type="text" className="form-control" id="username" placeholder="Enter username" required />
                                                            <div className="invalid-feedback">
                                                                Please enter username
                                                            </div>
                                                        </div>


                                                        <div className="mb-3">
                                                            <label className="form-label" htmlFor="password-input">Password</label>
                                                            <div className="position-relative auth-pass-inputgroup">
                                                                <Input
                                                                    type={passwordShow ? "text" : "password"}
                                                                    className="form-control pe-5 password-input"
                                                                    placeholder="Enter password"
                                                                    id="password-input"
                                                                    name="password"
                                                                    value={validation.values.password}
                                                                    onBlur={validation.handleBlur}
                                                                    onChange={validation.handleChange}
                                                                    invalid={validation.errors.password && validation.touched.password ? true : false}
                                                                />
                                                                {validation.errors.password && validation.touched.password ? (
                                                                    <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                                                                ) : null}
                                                                <Button color="link" onClick={() => setPasswordShow(!passwordShow)} className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button"
                                                                    id="password-addon"><i className="ri-eye-fill align-middle"></i></Button>
                                                            </div>
                                                        </div>

                                                        <div className="form-check">
                                                            <Input type="checkbox" className="form-check-input" id="auth-remember-check" />
                                                            <Label className="form-check-label" htmlFor="auth-remember-check">I Agree to Terms & Conditions</Label>
                                                        </div>

                                                        <div id="password-contain" className="p-3 bg-light mb-2 rounded">
                                                            <h5 className="fs-13">Password must contain:</h5>
                                                            <p id="pass-length" className="invalid fs-12 mb-2">Minimum <b>8 characters</b></p>
                                                            <p id="pass-lower" className="invalid fs-12 mb-2">At <b>lowercase</b> letter (a-z)</p>
                                                            <p id="pass-upper" className="invalid fs-12 mb-2">At least <b>uppercase</b> letter (A-Z)</p>
                                                            <p id="pass-number" className="invalid fs-12 mb-0">A least <b>number</b> (0-9)</p>
                                                        </div>

                                                        <div className="mt-4">
                                                            <button className="btn btn-success w-100" type="submit">Sign Up</button>
                                                        </div>

                                                        

                                                    </form>
                                                </div>

                                                <div className="mt-5 text-center">
                                                    <p className="mb-0">Already have an account ? <Link to="/auth-signin-cover" className="fw-semibold text-primary text-decoration-underline"> Signin</Link> </p>
                                                    <div className="mt-3">
                                                        <p className="mb-0 text-muted">
                                                            By continuing, you're confirming that you've read our{' '}
                                                            <Link to="/terms-and-conditions" className="text-decoration-underline">Terms & Conditions</Link>
                                                            {' '}and{' '}
                                                            <Link to="/privacy-policy" className="text-decoration-underline">Privacy Policy</Link>.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>

                        </Row>
                    </Container>
                </div>

                <footer className="footer">
                    <Container>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-center">
                                    <p className="mb-0">© {new Date().getFullYear()} ZentraMsg. Crafted with <i className="mdi mdi-heart text-danger"></i> by ZentraMsg Team</p>
                                </div>
                            </div>
                        </div>
                    </Container>
                </footer>
            </div>
        </React.Fragment>
    );
};

export default CoverSignUp;