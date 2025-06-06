import React from 'react';
import { Container } from 'reactstrap';
import EmailToolbar from './EmailToolbar';

const MailInbox = () => {
    document.title="Mailbox | Zentra Msg";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                
                    <div className="email-wrapper d-lg-flex gap-1 mx-n4 mt-n4 p-1">
                        <EmailToolbar />
                    </div>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default MailInbox;