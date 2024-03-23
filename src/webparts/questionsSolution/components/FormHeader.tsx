import * as React from 'react';


import 'bootstrap/dist/css/bootstrap.min.css';
const jumbotronStyle = {
    backgroundImage: 'url("https://img.freepik.com/free-vector/online-testing-banner_107791-3684.jpg?w=1480&t=st=1710267785~exp=1710268385~hmac=dbd5c72f33a1fa7103ebd48db19d317334ab8a8bb92550cec44dc029a1061de3")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white', // Text color
  };

const fontStyle = {
    color: "black"
}
const ExamJumbotron = () => {
    return (
        <div className="jumbotron jumbotron-fluid" style={jumbotronStyle}>
            <div className="container">
                <h1 className="display-4" style={fontStyle}>Exam System with React</h1>
                <p className="lead" style={fontStyle}>This is a simple exam system built with React.</p>
            </div>
        </div>
    );
}

export default ExamJumbotron;
