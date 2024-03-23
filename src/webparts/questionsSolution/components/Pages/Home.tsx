import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { createTheme, mergeStyles } from '@fluentui/react/lib/Styling';
import { Col, Container, Row } from 'react-bootstrap';

const examImage = require('../../assets/bg.jpg'); // Import the image

const theme = createTheme({
  palette: {
    themePrimary: '#0078d4', // Primary color
    themeLighterAlt: '#f3f9fd',
    themeLighter: '#d0e7f8',
    themeLight: '#a9d3f2',
    themeTertiary: '#5ca9e6',
    themeSecondary: '#1a86d9',
    themeDarkAlt: '#006cbe',
    themeDark: '#005ba1',
    themeDarker: '#004377',
    neutralLighterAlt: '#f8f8f8',
    neutralLighter: '#f4f4f4',
    neutralLight: '#eaeaea',
    neutralQuaternaryAlt: '#dadada',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c8c8',
    neutralTertiary: '#c2c2c2',
    neutralSecondary: '#858585',
    neutralPrimaryAlt: '#4b4b4b',
    neutralPrimary: '#333333',
    neutralDark: '#272727',
    black: '#1d1d1d',
    white: '#ffffff',
  },
});

const buttonContainerStyles = mergeStyles({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px', // Add gap between buttons
  alignItems: 'center', // Center align the buttons horizontally
  padding: '16px', // Add padding
});

const buttonStyles = mergeStyles({
  width: '100%', // Ensure all buttons have the same width
});

const sectionStyles = mergeStyles({
  boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)', // Add box shadow to both sections
  padding: '16px', // Add padding to both sections
  display: 'flex', // Use Flexbox to center align items vertically
  flexDirection: 'column', // Align items vertically
  justifyContent: 'center',
});

const Home: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const handleEndExamClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate('/Questions');
  };

  const handleSurvay= (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate('/Survays');
  };

  // const handleTimer= (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   navigate('/Timer');
  // };

  const handleResults = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate('/Results');
  };

  return (
    <Container className="ms-Grid" dir="ltr">
      <Row>
        <Col lg={8} className={sectionStyles}>
          <img src={examImage} alt="Exam" style={{ maxWidth: '100%', height: 'auto' }} />
        </Col>
        <Col lg={4} className={sectionStyles}>
          <div className={buttonContainerStyles}>
            <DefaultButton onClick={handleEndExamClick} className={buttonStyles}> Start Exam </DefaultButton>
            <DefaultButton onClick={handleSurvay} text="Survey" theme={theme} className={buttonStyles} />
            <DefaultButton onClick={handleResults} className={buttonStyles}> View Results </DefaultButton>
            <DefaultButton className={buttonStyles}> Add Questions </DefaultButton>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
