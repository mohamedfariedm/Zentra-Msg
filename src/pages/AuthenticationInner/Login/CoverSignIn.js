import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Container, Input, Label, Row, Button, Form, FormFeedback, Alert, Spinner } from 'reactstrap';
import AuthSlider from '../authCarousel';
import logoLight from "../../../assets/images/zentra_logo_high_quality.png";

import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginUser, socialLogin, resetLoginFlag } from '../../../slices/thunks';
import withRouter from '../../../Components/Common/withRouter';
import { createSelector } from 'reselect';
import LanguageDropdownRectangle from '../../../Components/Common/LanguageDropdownRectangle';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const CoverSignIn = (props) => {
    const { t } = useTranslation(); // Destructure the t function from useTranslation
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
            email: Yup.string().required(t('Please Enter Your Email')), // Use t() for translation
            password: Yup.string().required(t('Please Enter Your Password')), // Use t() for translation
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

    document.title = t('Cover SignIn | Zentra Msg'); // Translate the page title

    return (
        <React.Fragment>
            <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
                <div className="bg-overlay"></div>
                <div className="auth-page-content d-flex align-items-center justify-content-center overflow-hidden pt-lg-5">
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={6}>
                                <Card className="overflow-hidden">
                                    <Row className="g-0">
                                        {/* <AuthSlider /> */}
                                        <Col lg={12}>
                                            <div className="p-lg-5 p-4">
                                                <div className="text-center">
                                                    <Link to="/dashboard" className="d-block">
                                                        <img src={logoLight} alt="" height="120" />
                                                    </Link>
                                                </div>
                                                <LanguageDropdownRectangle />

                                                {error && <Alert color="danger">{error}</Alert>}

                                                <div className="mt-4">
                                                    <Form onSubmit={validation.handleSubmit}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="email" className="form-label">{t('Email')}</Label> {/* Translate label */}
                                                            <Input
                                                                id="email"
                                                                name="email"
                                                                type="email"
                                                                placeholder={t('Enter email')} // Use translation for placeholder
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
                                                                <Link to="/auth-pass-reset-cover" className="text-muted">{t('Forgot password?')}</Link> {/* Translate text */}
                                                            </div>
                                                            <Label htmlFor="password" className="form-label">{t('Password')}</Label> {/* Translate label */}
                                                            <div className="position-relative auth-pass-inputgroup mb-3">
                                                                <Input
                                                                    id="password"
                                                                    name="password"
                                                                    type={showPassword ? "text" : "password"}
                                                                    placeholder={t('Enter password')} // Use translation for placeholder
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
                                                            <Label className="form-check-label" htmlFor="auth-remember-check">{t('Remember me')}</Label> {/* Translate text */}
                                                        </div>

                                                        <div className="mt-4">
                                                            <Button color="success" disabled={loading} className="w-100" type="submit">
                                                                {loading && <Spinner size="sm" className="me-2" />} {t('Sign In')} {/* Translate button text */}
                                                            </Button>
                                                        </div>

                                                    </Form>
                                                </div>

                                                <div className="mt-5 text-center">
                                                    <p className="mb-0">{t("Don't have an account ?")} <Link to="/auth-signup-cover" className="fw-semibold text-primary text-decoration-underline">{t('Signup')}</Link></p> {/* Translate text */}
                                                    <div className="mt-3">
                                                        <p className="mb-0 text-muted">
                                                            {t('By continuing, you\'re confirming that you\'ve read our')}{' '}
                                                            <Link to="/terms-and-conditions" className="text-decoration-underline">{t('Terms & Conditions')}</Link>
                                                            {' '}and{' '}
                                                            <Link to="/privacy-policy" className="text-decoration-underline">{t('Privacy Policy')}</Link>.
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
                        <Row>
                            <Col lg={12}>
                                <div className="text-center">
                                    <p className="mb-0">{t('©')} {new Date().getFullYear()} ZentraMsg. {t('Crafted with')} <i className="mdi mdi-heart text-danger"></i> {t('by ZentraMsg Team')}</p>
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
