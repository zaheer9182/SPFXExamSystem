
import * as React from 'react';
import type { IQuestionsSolutionProps } from '../IQuestionsSolutionProps';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import 'bootstrap/dist/css/bootstrap.min.css';
import { sp } from "@pnp/sp/presets/all";
import InputGroup from 'react-bootstrap/esm/InputGroup';

// export interface listItems { 
//     Id: number,
//     Title: string,
//     Answer: string,
//     QuestionType: string,
//     CorrectAnswer: string
// } 

export interface ListItem {
  Id: number,
  Title: string,
  Answer: string,
  QuestionType: string,
  CorrectAnswer: string
}

export interface ListItems {
  items: ListItem[]
}

export interface response{
  id: number,
  answer: string
}

export interface Responses {
  submittedAnswers: response[]; // Assuming the answers have the same structure as items
}

interface MyState {
  itemsList: ListItems;
  answersList: Responses;
}


  
//var spObj = null;

export default class QuestionsSolution extends React.Component<IQuestionsSolutionProps, MyState> {

  // constructor to intialize state and pnp sp object.  
  constructor(props: IQuestionsSolutionProps, state: MyState) {
    super(props);
    //this.state = {Id: 0, Title: "", Answer: "", QuestionType: "", CorrectAnswer:""}; 
    this.state = { 
      itemsList: { items: [] },
      answersList: { submittedAnswers: [] },
     }
    sp.setup({
      spfxContext: this.props.context as any
    });
    //spObj = sp;  
  }

  public render(): React.ReactElement<IQuestionsSolutionProps> {


    const allQuestions = this.state.itemsList.items.map((value: any, index: React.Key | null | undefined) => {
      debugger;
      return (
        <CreateForm key={index} itemObj={value} />
      )

    })

    const handleSubmit = (e: { preventDefault: () => void; }) => {
      debugger;
      e.preventDefault();
      alert(this.state.answersList);
      //const newValidations = { ...formValidations };
    };


    return (
      <>
        <h1>Questions & Answers Component</h1>
        <Form onSubmit={handleSubmit}>
          {allQuestions}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        {/* <div>{this.state.Id}</div>
            <div>{this.state.Title}</div>
            <div>{this.state.CorrectAnswer}</div> */}
        {/* <CreateForm /> */}
      </>

    )
  }
  async componentDidMount() {
    debugger;
    const listitems: any = await sp.web.lists.getByTitle("QuestionsAnswers").items.select("Id", "Title","Answer","QuestionType","CorrectAnswer").orderBy("Modified", true)(); //await sp.web.lists.getByTitle("QuestionsAnswers").items().select("Title", "Description");

    this.setState({ itemsList: { items: listitems } });

    //this.setState({Id:item.ID, Title: item.Title, Answer: item.Answer, QuestionType: item.QuestionType,CorrectAnswer: item.CorrectAnswer});
  }


}

function CreateForm(itemObj: any) {

  const renderQuestion = () => {
    if (itemObj.itemObj.QuestionType === "Multiple Choice") {
      const options = itemObj.itemObj.Answer.split("|");
      return options.map((val: any, index: React.Key | null | undefined) => (
        <InputGroup key={index}>
          <InputGroup.Radio value={val} name={`question-${val.Id}`} aria-label={`Radio ${index}`} onChange={(e) => handleRadioChange(itemObj.itemObj.Id, e.target.value)} />
          {val}
        </InputGroup>
      ));
    } else {
      return <Form.Control type="text" placeholder="Answer" onChange={(e) => handleRadioChange(itemObj.itemObj.Id, e.target.value)} />;
    }
  };

  const handleRadioChange = (questionId: number, answer:string) => {
    // Check if the question is already answered
    const subAnswer = {id: questionId, answer: answer}
    this.setState({ itemsList: { submittedAnswers: subAnswer } });
    
  };

  return (
      <>
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Question: {itemObj.itemObj.Title}</Form.Label>
        {renderQuestion()}
        <Form.Label>Correct Answer: {itemObj.itemObj.CorrectAnswer}</Form.Label>

      </Form.Group>
      </>
  )

}