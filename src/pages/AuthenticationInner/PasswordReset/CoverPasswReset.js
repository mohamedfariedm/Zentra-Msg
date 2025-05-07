import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Col, Container, Row, Form, FormFeedback, Label, Input } from 'reactstrap';
import logoLight from "../../../assets/images/zentra_logo_high_quality.png";

import AuthSlider from '../authCarousel';

// Formik
import { useFormik } from 'formik';
import * as Yup from 'yup';
import LanguageDropdownRectangle from '../../../Components/Common/LanguageDropdownRectangle';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const CoverPasswReset = () => {
    const { t } = useTranslation(); // Use the translation hook
    document.title = t('Reset Password | Zentra Msg'); // Translate document title

    let router = useNavigate();
    const validation = useFormik({
        enableReinitialize: true,

        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().required(t("Please Enter Your Email")), // Translate validation message
        }),
        onSubmit: (values) => {
            router("/auth-twostep-cover");
        }
    });

    return (
        <React.Fragment>
            <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
                <div className="bg-overlay"></div>
                <div className="auth-page-content overflow-hidden pt-lg-5">
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={6}>
                                <Card className="overflow-hidden">
                                    <Row className="justify-content-center g-0">
                                        <Col lg={12}>
                                            <div className="p-lg-5 p-4">
                                                <div className="text-center">
                                                    <Link to="/dashboard" className="d-block">
                                                        <img src={logoLight} alt="" height="120" />
                                                    </Link>
                                                </div>
                                                <LanguageDropdownRectangle />
                                              
                                                <div className="mt-2 text-center">
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/rhvddzym.json"
                                                        trigger="loop"
                                                        colors="primary:#19A075"
                                                        className="avatar-xl"
                                                        style={{ width: "120px", height: "120px" }}>
                                                    </lord-icon>
                                                </div>

                                                <div className="alert border-0 alert-warning text-center mb-2 mx-2" role="alert">
                                                    {t('Enter your email and instructions will be sent to you!')} {/* Translated alert message */}
                                                </div>
                                                <div className="p-2">
                                                    <Form onSubmit={validation.handleSubmit}>
                                                        <div className="mb-4">
                                                            <Label className="form-label">{t('Email')} <span className="text-danger">*</span></Label>
                                                            <Input
                                                                type="email"
                                                                className="form-control"
                                                                id="email"
                                                                placeholder={t('Enter email address')} 
                                                                name="email"
                                                                value={validation.values.email}
                                                                onBlur={validation.handleBlur}
                                                                onChange={validation.handleChange}
                                                                invalid={validation.errors.email && validation.touched.email ? true : false}
                                                            />
                                                            {validation.errors.email && validation.touched.email ? (
                                                                <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                                                            ) : null}
                                                        </div>

                                                        <div className="text-center mt-4">
                                                            <Button color="success" className="w-100" type="submit">{t('Send OTP')}</Button> {/* Translated button text */}
                                                        </div>
                                                    </Form>
                                                </div>

                                                <div className="mt-5 text-center">
                                                    <p className="mb-0">{t('Wait, I remember my password...')} <Link to="/auth-signin-cover" className="fw-bold text-primary text-decoration-underline">{t('Click here')}</Link> </p>
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
                                    <p className="mb-0">© {new Date().getFullYear()} ZentraMsg. Crafted with <i className="mdi mdi-heart text-danger"></i> {t('by ZentraMsg Team')}</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </footer>
            </div>
        </React.Fragment>
    );
};

export default CoverPasswReset;
