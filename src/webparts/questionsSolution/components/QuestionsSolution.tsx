import * as React from 'react';

import type { IQuestionsSolutionProps } from './IQuestionsSolutionProps';
import { sp } from "@pnp/sp/presets/all";
import QuestionsList from './CustomComponents/QuestionsList';
//import ExamJumbotron from './FormHeader';
//import { Route, HashRouter } from 'react-router-dom';
import UserSurvey from './Pages/UserSurvey';

import { /*createBrowserRouter, RouterProvider, */HashRouter, Route, Routes } from "react-router-dom";
import { INavLinkGroup } from '@fluentui/react/lib/components/Nav/Nav.types';
import Home from './Pages/Home';
import Survays from './Pages/Survays';
import Results from './Pages/Results';

//import UI from './Pages/UI';
// import { SPComponentLoader } from '@microsoft/sp-loader';
//import { IStackTokens, Nav, Stack } from '@fluentui/react';

// const Router = createBrowserRouter([
//   {
//     path: "/UserSurvey",
//     element: (
//       <UserSurvey userName={''} email={''} phone={0} country={''} totalMarks={0} obtainedMarks={0} />
//     ),
//   }
// ]);


const navLinkGroups: INavLinkGroup[] = [
  {
    name: 'React Components',
    links: [
      {
        key: 'Home',
        name: 'Home',
        url: '#/',
      },
      {
        key: 'QuestionsList',
        name: 'Questions List',
        url: '#/QuestionsList',
      },
      {
        key: 'UserSurvey',
        name: 'User Survey',
        url: '#/UserSurvey',
      },
      {
        key: 'Survays',
        name: 'Survays',
        url: '#/UserSurvey',
      },
      {
        key: 'Timer',
        name: 'Timer',
        url: '#/Timer',
      }
    ],
  }
];



export default class QuestionsSolution extends React.Component<IQuestionsSolutionProps, {}> {

  constructor(props: IQuestionsSolutionProps) {
    super(props); 
    sp.setup({
      spfxContext: this.props.context as any
    });
    console.log(navLinkGroups);
  }



  public render(): React.ReactElement<IQuestionsSolutionProps> {

    return (
      <>
        {/* <HashRouter>
        <Route path="/user-survey" element={<UserSurvey userName={''} email={''} phone={0} country={''} totalMarks={0} obtainedMarks={0} />} />
        </HashRouter> */}
          {/* <ExamJumbotron /> */}
          <HashRouter>
            <Routes>
            {/* <Route path="/" Component={QuestionsList}></Route>
            <Route path="/UserSurvey/:type" Component={UserSurvey}></Route> */}
            <Route path="/" Component={Home}></Route>
            <Route path="/Questions" Component={QuestionsList}></Route>
            <Route path="/UserSurvey/:type" Component={UserSurvey}></Route>
            <Route path="/Survays" Component={Survays}></Route>
            <Route path="/Results" Component={Results}></Route>
            </Routes>
            
          </HashRouter>

        {/* <RouterProvider router={Router} /> */}
        {/* <ExamJumbotron /> */}
        {/* <QuestionsList context={this.props.context} /> */}
      </>
    );
  }
}
