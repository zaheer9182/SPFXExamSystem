import * as React from 'react';

interface CountdownTimerProps {
  examTime: number;
  SetDisabled: (setDisable: any) => void;
  showClsDisplay: (setClsDis: any) => void;
  startTime: any
}

const timerStyle: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center',
  padding: '10px',
  backgroundColor: '#333',
  color: 'white',
  borderRadius: '5px',
  margin: '10px auto'
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ examTime, SetDisabled, showClsDisplay, startTime }) => {
  const targetDate = new Date();
  targetDate.setMinutes(targetDate.getMinutes() + 10); // Add 15 minutes to the current time
  const countDownDate = targetDate.getTime();

  const [countDown, setCountDown] = React.useState(countDownDate - startTime);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCountDown((prevCountDown: number) => prevCountDown - 1000); // Subtract 1000 milliseconds (1 second) from the previous countDown

      if (countDown <= 0) {
        clearInterval(interval);
        SetDisabled(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  if (countDown <= 0) {
    {
      //clearInterval(interval);
      SetDisabled(true);
      showClsDisplay(true);
    }
    return <div style={timerStyle}>Time's up!</div>;
  } else {
    return (
      <div style={timerStyle}>
      <div>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>
    </div>
    );
  }
};

export default CountdownTimer;
