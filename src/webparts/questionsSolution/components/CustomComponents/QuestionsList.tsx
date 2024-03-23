import * as React from 'react';
import { IItemAddResult, sp } from "@pnp/sp/presets/all";
import { IQuestionsSolutionProps } from '../IQuestionsSolutionProps';
import InputGroup from 'react-bootstrap/esm/InputGroup';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import UserInformation from './UserInformation';
import MarksModel from './MarksModel';
import { useNavigate } from 'react-router-dom';
import { mergeStyles } from 'office-ui-fabric-react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { PrimaryButton } from '@fluentui/react';
import Timer from '../Pages/Timer';

interface QuestionsTempProps {
    itemObj: any;
    questionIndex: number;
    existingData: any;
    existingDataUpdate: (updatedData: any) => void;
    alertClass: string;
    resultCount: number;
    setResultCount: (updateResultCount: any) => void;
    clsDisplay: boolean;
    isDisabled: boolean;
    answerValues: string[];
    setAnswerValues: (updateAnswerVal: any) => void;
    attemptedQuestions: boolean[];
    setattemptedQuestions: (updateAQ: any) => void;
}

export interface UInfoProps {
    userInfo: any;
    setUserInfo: (updateUserInfo: any) => void;
    questTemp: boolean;
    setQuestTemp: (updateQuestionTemp: any) => void;
    setExamTime: (examTime: number) => void;
    setTimerStarted: React.Dispatch<React.SetStateAction<boolean>>;
}
const sectionStyles = mergeStyles({
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
    padding: '16px',
});

const ChildCom: React.FunctionComponent<IQuestionsSolutionProps> = (props: IQuestionsSolutionProps) => {

    const [listItems, setListItems] = React.useState<any[]>([]);
    const [alertClass, setAlertClass] = React.useState<string>("warning");

    const [userInfo, setUserInfo] = React.useState({
        name: '',
        email: '',
        phone: undefined,
        country: '',
        examTime: 0
    });

    const [questTemp, setQuestTemp] = React.useState<boolean>(false);
    const [resultCount, setResultCount] = React.useState<number>(0);
    const [clsDisplay, showClsDisplay] = React.useState<boolean>(false);
    const [model, showModel] = React.useState<boolean>(false);
    const [isDisabled, setIsDisabled] = React.useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [answerValues, setAnswerValues] = React.useState<string[]>([]);
    const [attemptedQuestions, setattemptedQuestions] = React.useState<boolean[]>([]);
    const [examTime, setExamTime] = React.useState<number>(0);
    const [timerStarted, setTimerStarted] = React.useState<boolean>(false);

    console.log(examTime);
    console.log(timerStarted);
    console.log(setAlertClass);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const listItemsResponse = await sp.web.lists.getByTitle("QuestionsAnswers").items.select("Id", "Title", "Answer", "QuestionType", "CorrectAnswer").orderBy("Modified", true)();
                setListItems(listItemsResponse);

                setAnswerValues(Array(listItemsResponse.length).fill(''));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const allQuestions = listItems.map((value, index) => (
        <QuestionsTemp
            key={index}
            itemObj={value}
            questionIndex={index}
            existingData={[]}
            existingDataUpdate={updateQuestionStatus}
            alertClass={alertClass}
            resultCount={resultCount}
            setResultCount={setResultCount}
            clsDisplay={clsDisplay}
            isDisabled={isDisabled}
            answerValues={answerValues}
            setAnswerValues={setAnswerValues}
            attemptedQuestions={attemptedQuestions}
            setattemptedQuestions={setattemptedQuestions}
        />
    ));

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        showModel(true);
    };

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        showClsDisplay(true);
        setIsDisabled(true);
        const results: IItemAddResult = await sp.web.lists.getByTitle("Results").items.add({
            Title: userInfo.name,
            UserEmail: userInfo.email,
            UserCountry: userInfo.country,
            UserPhone: userInfo.phone,
            TotalMarks: listItems.length,
            MarksObtained: resultCount
        });
        console.log(results.item);
    };
    const navigate = useNavigate();
    const handleEndExamClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate('/UserSurvey/parameter-data', { state: { userInfo: userInfo } });
    };
    const goToNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex: number) => prevIndex + 1);
    };
    const goToPreviousQuestion = () => {
        setCurrentQuestionIndex((prevIndex: number) => prevIndex - 1);
    };

    return (
        <Container className="mt-3">
            <Row className="justify-content-center">
                <Col lg={12} md={6} sm={3} >
                    <h2>User Details</h2>
                    <hr />
                    <UserInformation
                        userInfo={userInfo}
                        setUserInfo={setUserInfo}
                        questTemp={questTemp}
                        setQuestTemp={setQuestTemp}
                        setExamTime={setExamTime}
                        setTimerStarted={setTimerStarted}
                    />
                    <Form>
                        <hr />
                        <div style={{ display: questTemp ? 'block' : 'none' }} className={sectionStyles}>
                            <h2>Exam Center</h2>
                            <hr />
                            {allQuestions[currentQuestionIndex]}
                            <Form.Group>
                                <DefaultButton onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0} style={{ margin: '4px' }}>Previous</DefaultButton>
                                <DefaultButton onClick={goToNextQuestion} disabled={currentQuestionIndex === listItems.length - 1}>Next</DefaultButton>
                            </Form.Group>
                            <hr />
                            <Form.Group style={{ display: currentQuestionIndex === listItems.length - 1 || clsDisplay ? 'block' : 'none', marginTop: '10px' }}>
                                <PrimaryButton type="submit" style={{ display: clsDisplay ? 'none' : 'block', margin: '4px' }} onClick={handleSubmit} >
                                    Submit
                                </PrimaryButton>
                                <DefaultButton type="submit" onClick={handleClick} style={{ margin: '4px', display: clsDisplay ? 'block' : 'none' }} >
                                    Show Result
                                </DefaultButton>

                                <DefaultButton onClick={handleEndExamClick} style={{ display: clsDisplay ? 'block' : 'none' }}>
                                    End Exam
                                </DefaultButton>
                            </Form.Group>
                            {
                                !clsDisplay ? <Timer examTime={examTime} SetDisabled={setIsDisabled} showClsDisplay={showClsDisplay} startTime={new Date().getTime()} /> : null
                            }  
                        </div>
                    </Form>

                </Col>
            </Row>
            <div style={{ display: model ? 'block' : 'none' }}>
                <MarksModel marksObtained={resultCount} totalmarks={listItems.length} model={model} showModel={showModel} />
            </div>
        </Container>
    );
};

const QuestionsTemp: React.FC<QuestionsTempProps> = ({
    itemObj,
    questionIndex,
    existingData,
    existingDataUpdate,
    alertClass,
    resultCount,
    setResultCount,
    clsDisplay,
    isDisabled,
    answerValues,
    setAnswerValues,
    attemptedQuestions,
    setattemptedQuestions
}) => {
    const [isCorrect, setIsCorrect] = React.useState<boolean>(false);
    //const [isAnswered, setIsAnswered] = React.useState<boolean[]>([]);

    const [isAnswered, setIsAnswered] = React.useState<boolean[]>(Array.from({ length: existingData }, () => false));

    console.log(isCorrect);

    const handleInputChange = (value: string, questionIndex: number) => {
        const newAnswerValues = [...answerValues];
        newAnswerValues[itemObj.Id] = value;
        setAnswerValues(newAnswerValues);
        const isCorrect = value.toLowerCase() === itemObj.CorrectAnswer.toLowerCase();
        if (isCorrect) {
            setResultCount((prevCount: number) => prevCount + 1);
        }
        setIsCorrect(isCorrect);
        const AQ = [...attemptedQuestions];
        AQ[itemObj.Id] = isCorrect;
        setattemptedQuestions(AQ);
        const IAns = [...isAnswered];
        IAns[itemObj.Id] = true;
        setIsAnswered(IAns);
    };
    return (
        <>
            <Form.Group className="mb-3">
                <Form.Label>{questionIndex + 1}: Question: {itemObj.Title}</Form.Label>
                {itemObj.QuestionType === "Multiple Choice" ? (
                    itemObj.Answer.split("|").map((option: string, index: number) => (
                        <InputGroup key={index}>
                            <InputGroup.Radio value={option} name={`question-${itemObj.Id}`} checked={answerValues[itemObj.Id] === option}
                                aria-label={`Radio ${index}`} onChange={(e) => handleInputChange(e.target.value, itemObj.Id)} disabled={isDisabled} />
                            {option}
                        </InputGroup>
                    ))
                ) : (

                    <Form.Control type="text" placeholder="Answer" value={answerValues[itemObj.Id] || ''} onChange={(e) => handleInputChange(e.target.value, itemObj.Id)} disabled={isDisabled} />
                )}
                <br />
                <Alert style={{ display: clsDisplay ? 'block' : 'none' }} variant={isAnswered ? (attemptedQuestions[itemObj.Id] ? "success" : "danger") : "warning"}>
                    {isAnswered
                        ? (attemptedQuestions[itemObj.Id] ? "Correct Answer" : "Wrong Answer")
                        : "Not Attempted"}
                </Alert>
            </Form.Group>
        </>
    );
};

export default ChildCom;

function updateQuestionStatus(updatedData: any): void {
    console.log(updatedData);
    // Implement your logic to update question status if needed
    throw new Error('Function not implemented.');
}

