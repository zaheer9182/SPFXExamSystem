import * as React from 'react';
import {  Col, Container, Form, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { DefaultButton, TextField } from '@fluentui/react';
import { sp } from '@pnp/sp';
import { IItemAddResult } from '@pnp/sp/items';
import CustomAlertDialog from '../CustomComponents/Alerts';


const UserSurvey: React.FC = () => {
  const { state } = useLocation();
  const stateParamVal = state?.userInfo;
  const [isMsgValid, setunameValid] = React.useState<boolean>(true);

  const [formData, setFormData] = React.useState({
    username: stateParamVal?.name || '',
    userEmail: stateParamVal?.email || '',
    userPhone: stateParamVal?.phone || '',
    userCountry: stateParamVal?.country || '',
    message: '',
    rating: 0
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setunameValid(false);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    let valid = true;

    if (formData.message.length < 1) {
      setunameValid(false);
      console.log(isMsgValid)
      valid = false;
    }

    if (!valid) return;

    const iar: IItemAddResult = await sp.web.lists.getByTitle("Survey").items.add({
      Title: formData.username,
      Email: formData.userEmail,
      Country: formData.userCountry,
      Phone: formData.userPhone,
      Message: formData.message
    });
  console.log(iar.item);
  setIsAlertOpen(true);
};

  const [isAlertOpen, setIsAlertOpen] = React.useState(false);

  const handleDismissAlert = () => {
    setIsAlertOpen(false);
  };


  return (
    <Container>
      <Row>
        <Col>
          <div>
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled={true}
            />
            <TextField
              label="Email"
              name="userEmail"
              type="email"
              value={formData.userEmail}
              onChange={handleChange}
              disabled={true}
            />
            <TextField
              label="Phone"
              name="userPhone"
              type="number"
              value={formData.userPhone}
              onChange={handleChange}
              disabled={true}
            />
            <TextField
              label="Country"
              name="userCountry"
              value={formData.userCountry}
              onChange={handleChange}
              disabled={true}
            />
            <Form.Group controlId="message">
              <TextField
              label="Message"
              name="message"
              multiline
              rows={3}
              value={formData.message}
              onChange={handleChange}
              errorMessage={isMsgValid ? '' : 'Please fill the Message'}
              style={{ border: isMsgValid ? 'solid 1px black' : 'solid 1px red' }}
            />
            </Form.Group>
            <Form.Group style={{marginTop: '10px'}}>
            <DefaultButton onClick={handleSubmit}>
              Submit
            </DefaultButton>
            </Form.Group>
            
          </div>
        </Col>
      </Row>
      <div>
      <CustomAlertDialog
        isOpen={isAlertOpen}
        title="Confirmation"
        message="Thank you so much for your feedback."
        onDismiss={handleDismissAlert}
        navigateTo="/"
      />
    </div>
    </Container>
  );
}

export default UserSurvey;

