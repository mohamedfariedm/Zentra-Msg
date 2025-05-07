import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Container, Row } from 'reactstrap';

// import images
import AuthSlider from '../authCarousel';

// Formik
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const CoverTwosVerify = () => {
    const { t } = useTranslation(); // Destructure the t() function to access translations
    document.title = t('Two Step Verification | Zentra Msg'); // Translated page title

    const getInputElement = (index) => {
        return document.getElementById('digit' + index + '-input');
    }

    const moveToNext = (index) => {
        if (getInputElement(index).value.length === 1) {
            if (index !== 4) {
                getInputElement(index + 1).focus();
            } else {
                getInputElement(index).blur();
                // Submit code
                console.log('submit code');
            }
        }
    }

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
                                                <div className="mb-4">
                                                    <div className="avatar-lg mx-auto">
                                                        <div className="avatar-title bg-light text-primary display-5 rounded-circle">
                                                            <i className="ri-mail-line"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-muted text-center mx-lg-3">
                                                    <h4>{t('Verify Your Email')}</h4> {/* Translated title */}
                                                    <p>{t('Please enter the 4 digit code sent to')} <span className="fw-semibold">example@abc.com</span></p> {/* Translated message */}
                                                </div>

                                                <div className="mt-4">
                                                    <form>
                                                        <Row>
                                                            <Col className="col-3">
                                                                <div className="mb-3">
                                                                    <label htmlFor="digit1-input" className="visually-hidden">{t('Digit 1')}</label>
                                                                    <input type="text"
                                                                        className="form-control form-control-lg bg-light border-light text-center"
                                                                        maxLength="1"
                                                                        id="digit1-input" onKeyUp={() => moveToNext(1)} />
                                                                </div>
                                                            </Col>

                                                            <Col className="col-3">
                                                                <div className="mb-3">
                                                                    <label htmlFor="digit2-input" className="visually-hidden">{t('Digit 2')}</label>
                                                                    <input type="text"
                                                                        className="form-control form-control-lg bg-light border-light text-center"
                                                                        maxLength="1"
                                                                        id="digit2-input" onKeyUp={() => moveToNext(2)} />
                                                                </div>
                                                            </Col>

                                                            <Col className="col-3">
                                                                <div className="mb-3">
                                                                    <label htmlFor="digit3-input" className="visually-hidden">{t('Digit 3')}</label>
                                                                    <input type="text"
                                                                        className="form-control form-control-lg bg-light border-light text-center"
                                                                        maxLength="1"
                                                                        id="digit3-input" onKeyUp={() => moveToNext(3)} />
                                                                </div>
                                                            </Col>

                                                            <Col className="col-3">
                                                                <div className="mb-3">
                                                                    <label htmlFor="digit4-input" className="visually-hidden">{t('Digit 4')}</label>
                                                                    <input type="text"
                                                                        className="form-control form-control-lg bg-light border-light text-center"
                                                                        maxLength="1"
                                                                        id="digit4-input" onKeyUp={() => moveToNext(4)} />
                                                                </div>
                                                            </Col>
                                                        </Row>

                                                        <div className="mt-3">
                                                            <Button color="success" className="w-100">{t('Confirm')}</Button> {/* Translated button */}
                                                        </div>

                                                    </form>

                                                </div>

                                                <div className="mt-5 text-center">
                                                    <p className="mb-0">{t("Didn't receive a code ?")} <Link to="/auth-pass-reset-cover" className="fw-semibold text-primary text-decoration-underline">{t('Resend')}</Link> </p>
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
                                    <p className="mb-0">© {new Date().getFullYear()} ZentraMsg. {t('Crafted with')} <i className="mdi mdi-heart text-danger"></i> {t('by ZentraMsg Team')}</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </footer>
            </div>
        </React.Fragment >
    );
};

export default CoverTwosVerify;
