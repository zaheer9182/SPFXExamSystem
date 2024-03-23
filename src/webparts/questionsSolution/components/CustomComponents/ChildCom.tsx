// import * as React from 'react';
// import { sp } from "@pnp/sp/presets/all";
// import { IQuestionsSolutionProps } from '../IQuestionsSolutionProps';
// import InputGroup from 'react-bootstrap/esm/InputGroup';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Alert } from 'react-bootstrap';

// interface CreateFormProps {
//     itemObj: any;
//     questionIndex: any;
//     existingData: any;
//     updateQuestionStatus: (questionIndex: number, isCorrect: boolean) => void;
//     alertVisibility: boolean;
//     usersSelection: any
//     setUersSelection: (setResponses: any) => void;

//     controlValue: any,
//     setControlValue: (setResponses: any) => void;

//     setAlertVisibility: (setResponses: any) => void;
// }

// const ChildCom: React.FunctionComponent<IQuestionsSolutionProps> = (props) => {
//     const { context } = props.context as any;
//     console.log(context);
//     const [listItems, setListItems] = React.useState<any[]>([]);

//     const [usersSelection, setUersSelection] = React.useState<any[]>([]);

//     const [alertVisibility, setAlertVisibility] = React.useState<boolean>(false);

//     const [controlValue, setControlValue] = React.useState<boolean>(false);
    

//     console.log(alertVisibility);

//     React.useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const listItemsResponse = await sp.web.lists.getByTitle("QuestionsAnswers").items.select("Id", "Title","Answer","QuestionType","CorrectAnswer").orderBy("Modified", true)();
//                 setListItems(listItemsResponse);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setAlertVisibility(true)
//         // listItems.forEach((item, index) => {
//         //     const isCorrect = item.answer === item.CorrectAnswer;
//         //     updateQuestionStatus(index, isCorrect);
//         // });
//     }

//     const updateQuestionStatus = (questionIndex: number, isCorrect: boolean) => {
//         const updatedItems = [...listItems];
//         updatedItems[questionIndex].isCorrect = isCorrect;
//         setListItems(updatedItems);
//     }

//     const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         //         const { value } = e.target;
//         //         const isCorrect = value === itemObj.CorrectAnswer;
//         //         updateQuestionStatus(questionIndex, isCorrect);
//         //     };

//     return (
//         <section>
//             <h1>Questions & Answers Section</h1>
//             <Form onSubmit={handleSubmit}>
//                 {listItems.map((item: any, index: number) => (
//                     <CreateForm
//                         key={index}
//                         itemObj={item}
//                         questionIndex={index}
//                         existingData={listItems}
//                         updateQuestionStatus={updateQuestionStatus}
//                         alertVisibility={alertVisibility}
//                         usersSelection = {usersSelection}
//                         setUersSelection = {setUersSelection}
//                         controlValue= {controlValue} 
//                         setControlValue ={setControlValue}
//                         setAlertVisibility = {setAlertVisibility}
//                     />
//                 ))}
//                 <Button variant="primary" type="submit">
//                     Submit
//                 </Button>
//             </Form>
//         </section>
//     );
// };

// const CreateForm: React.FC<CreateFormProps> = ({
//     itemObj,
//     questionIndex,
//     existingData,
//     updateQuestionStatus,
//     alertVisibility,
//     usersSelection,
//     setUersSelection,
//     controlValue,
//     setControlValue,
//     setAlertVisibility
// }) => {
//     const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { value } = e.target;
//         const isCorrect = value === itemObj.CorrectAnswer;
//         console.log(isCorrect);
//         setControlValue(true);
        
//         updateQuestionStatus(questionIndex, isCorrect);
//         //setAlertVisibility(true);
// };

//     return (
//         <Form.Group className="mb-3" controlId={`question-${questionIndex}`}>
//             <Form.Label>{questionIndex}: Question: {itemObj.Title}</Form.Label>
//             {itemObj.QuestionType === "Multiple Choice" ? (
//                 itemObj.Answer.split("|").map((option: string, index: number) => (
//                     <InputGroup key={index} data-value={controlValue} >
//                         <InputGroup.Radio
//                             value={option}
//                             name={`question-${questionIndex}`}
//                             aria-label={`Radio ${index}`}
//                             onChange={handleRadioChange}
//                         />
//                         {option}
//                     </InputGroup>
//                 ))
//             ) : (
//                 <Form.Control
//                     type="text"
//                     placeholder="Answer"
//                     onChange={handleRadioChange}
//                     data-value={controlValue}
//                 />
//             )}
//             <Form.Label>Correct Answer: {itemObj.CorrectAnswer}</Form.Label>
//             {existingData[questionIndex].isCorrect !== undefined && (
//                 <Alert 
//                 style={{display: alertVisibility ? 'block' : 'none' }}
//                     key={questionIndex}
//                     variant={
//                         controlValue ?
//                             existingData[questionIndex].isCorrect ? "success" : "danger"
//                             : "warning"
//                     }
//                 >
//                     {
//         controlValue ?
//             existingData[questionIndex].isCorrect ? "Correct!" : "Incorrect"
//             : "Didn't attempt"
//                     }
//                 </Alert>
//             )}
//         </Form.Group>
//     );
// };

// export default ChildCom;
