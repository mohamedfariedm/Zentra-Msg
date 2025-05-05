import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Container, Input, Label, Row, Button, Form, FormFeedback, Alert, Spinner } from 'reactstrap';
import AuthSlider from '../authCarousel';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginUser, socialLogin, resetLoginFlag } from '../../../slices/thunks';
import withRouter from '../../../Components/Common/withRouter';
import { createSelector } from 'reselect';
import LanguageDropdown from '../../../Components/Common/LanguageDropdown';

const CoverSignIn = (props) => {
    const dispatch = useDispatch();
    const selectLayoutState = (state) => state;
    const loginpageData = createSelector(
        selectLayoutState,
        (state) => ({
            user: state.Account.user,
            error: state.Login.error,
            loading: state.Login.loading,
            errorMsg: state.Login.errorMsg,
        })
    );
    const { user, error, loading, errorMsg } = useSelector(loginpageData);
    const [showPassword, setShowPassword] = useState(false);

    const validation = useFormik({
        initialValues: {
            email: 'admin@themesbrand.com',
            password: '123456',
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Please Enter Your Email'),
            password: Yup.string().required('Please Enter Your Password'),
        }),
        onSubmit: (values) => {
            dispatch(loginUser(values, props.router.navigate));
        },
    });

    useEffect(() => {
        if (errorMsg) {
            const timer = setTimeout(() => {
                dispatch(resetLoginFlag());
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [dispatch, errorMsg]);

    document.title = "Cover SignIn | Zentra Msg";

    return (
        <React.Fragment>
            <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
                <div className="bg-overlay"></div>
                <div className="auth-page-content overflow-hidden pt-lg-5">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <Card className="overflow-hidden">
                                    <Row className="g-0">
                                        <AuthSlider />
                                        <Col lg={6}>
                                            <div className="p-lg-5 p-4">
                                                <div className="text-center">
                                                    <h5 className="text-primary">Welcome Back !</h5>
                                                    <p className="text-muted">Sign in to continue to Velzon.</p>
                                                </div>

                                                {error && <Alert color="danger">{error}</Alert>}

                                                <div className="mt-4">
                                                    <Form onSubmit={validation.handleSubmit}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="email" className="form-label">Email</Label>
                                                            <Input
                                                                id="email"
                                                                name="email"
                                                                type="email"
                                                                placeholder="Enter email"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.email}
                                                                invalid={!!(validation.touched.email && validation.errors.email)}
                                                            />
                                                            {validation.touched.email && validation.errors.email && (
                                                                <FormFeedback>{validation.errors.email}</FormFeedback>
                                                            )}
                                                        </div>

                                                        <div className="mb-3">
                                                            <div className="float-end">
                                                                <Link to="/auth-pass-reset-cover" className="text-muted">Forgot password?</Link>
                                                            </div>
                                                            <Label htmlFor="password" className="form-label">Password</Label>
                                                            <div className="position-relative auth-pass-inputgroup mb-3">
                                                                <Input
                                                                    id="password"
                                                                    name="password"
                                                                    type={showPassword ? "text" : "password"}
                                                                    placeholder="Enter password"
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    value={validation.values.password}
                                                                    invalid={!!(validation.touched.password && validation.errors.password)}
                                                                    className="pe-5"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                                                    onClick={() => setShowPassword(!showPassword)}
                                                                >
                                                                    <i className="ri-eye-fill align-middle"></i>
                                                                </button>
                                                                {validation.touched.password && validation.errors.password && (
                                                                    <FormFeedback>{validation.errors.password}</FormFeedback>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="form-check">
                                                            <Input type="checkbox" className="form-check-input" id="auth-remember-check" />
                                                            <Label className="form-check-label" htmlFor="auth-remember-check">Remember me</Label>
                                                        </div>

                                                        <div className="mt-4">
                                                            <Button color="success" disabled={loading} className="w-100" type="submit">
                                                                {loading && <Spinner size="sm" className="me-2" />} Sign In
                                                            </Button>
                                                        </div>

                                                    </Form>
                                                    <div className='mt-4 text-center'>

                                                            <div className="signin-other-title">
                                                                <h5 className="fs-13 mb-4 title"> Change Language </h5>
                                                            </div>
                                                    </div>
                                                        <div style={{scale:"1.1",position:"relative",zIndex:"10000000000"}} className=" text-center w-100 d-flex justify-content-center align-items-start">
                                                            <LanguageDropdown  />
                                                            {/* <div>
                                                                <Button color="primary" className="btn-icon me-1" onClick={() => dispatch(socialLogin("facebook", props.router.navigate))}>
                                                                    <i className="ri-facebook-fill fs-16" />
                                                                </Button>
                                                                <Button color="danger" className="btn-icon me-1" onClick={() => dispatch(socialLogin("google", props.router.navigate))}>
                                                                    <i className="ri-google-fill fs-16" />
                                                                </Button>
                                                                <Button color="dark" className="btn-icon"><i className="ri-github-fill fs-16" /></Button>
                                                                <Button color="info" className="btn-icon"><i className="ri-twitter-fill fs-16" /></Button>
                                                            </div> */}
                                                        </div>
                                                </div>

                                                <div className="mt-5 text-center">
                                                    <p className="mb-0">Don't have an account ? <Link to="/auth-signup-cover" className="fw-semibold text-primary text-decoration-underline"> Signup</Link></p>
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
                        <Row>
                            <Col lg={12}>
                                <div className="text-center">
                                    <p className="mb-0">&copy; {new Date().getFullYear()} Velzon. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </footer>
            </div>
        </React.Fragment>
    );
};

export default withRouter(CoverSignIn);
