import * as React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { UInfoProps } from './QuestionsList';
import { mergeStyles } from 'office-ui-fabric-react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { TextField } from '@fluentui/react';

const sectionStyles = mergeStyles({
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
});

const UserInformation: React.FunctionComponent<UInfoProps> = ({ userInfo, setUserInfo, questTemp, setQuestTemp, setExamTime, setTimerStarted }) => {
    const [unameValid, setunameValid] = React.useState<boolean>(false);
    const [uEmailValid, setEmailValid] = React.useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo((prevInfo: any) => ({ ...prevInfo, [name]: value }));

        // Reset validation errors when user makes changes
        if (name === 'name') setunameValid(false);
        if (name === 'email') setEmailValid(false);
    };

    const isValidEmail = (email: string) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const clickHandle = () => {
        let valid = true;

        // Validate name
        if (userInfo.name.length < 3) {
            setunameValid(true);
            valid = false;
        }

        // Validate email
        if (!isValidEmail(userInfo.email)) {
            setEmailValid(true);
            valid = false;
        }

        // If any validation fails, return without starting the timer
        if (!valid) return;

        // If all validation passes, start the timer
        setExamTime(10);
        setTimerStarted(true);
        setQuestTemp(true);
    };

    return (
        <div className={sectionStyles}>
            <Row className="justify-content-center" style={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)', padding: '10px' }}>
                <Col md={6} sm={3}>
                    <Form.Group>
                        <TextField
                            label="Name"
                            name="name"
                            value={userInfo.name}
                            onChange={handleChange}
                            required
                            errorMessage={unameValid ? 'Username must be at least 3 characters long' : ''}
                            style={{ borderColor: unameValid ? 'red' : '' }}
                        />
                    </Form.Group>
                </Col>
                <Col md={6} sm={3}>
                    <Form.Group>
                        <TextField
                            label="Email"
                            name="email"
                            value={userInfo.email}
                            onChange={handleChange}
                            required
                            type="email"
                            errorMessage={uEmailValid ? 'Please enter a valid email address' : ''}
                            style={{ borderColor: uEmailValid ? 'red' : '' }}
                        />
                    </Form.Group>
                </Col>
                <Col md={6} sm={3}>
                    <Form.Group>
                        <TextField
                            label="Phone"
                            name="phone"
                            value={userInfo.phone}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col md={6} sm={3}>
                    <Form.Group>
                        <TextField
                            label="Country"
                            name="country"
                            value={userInfo.country}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col md={12} sm={3} className='m-3'>
                    <Form.Group>
                        <DefaultButton type="submit" style={{ display: questTemp ? 'none' : 'block' }} onClick={clickHandle}>
                            Start
                        </DefaultButton>
                    </Form.Group>
                </Col>
            </Row>
        </div>
    );
}

export default UserInformation;
