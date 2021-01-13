import React from "react";
import './QA.scss';
import {Grid} from "@material-ui/core";
import DropDown from "../../../../../shared/Frx-components/dropdown/DropDownMap";
import Question from './Question';
import {Input, InputAdornment} from "@material-ui/core";

const questions = [
  {
      id: 1,
      question: "How do I create a Formulary?",
      answer: "You can start creating a formulary by creating new, importing a template, or buying a formulary from the Bazaar ABC DEF",
      votes: 5
  },
  {
      id: 2,
      question: "Who can sell on the Bazaar?",
      answer: "All FutureRx users can sell on the Bazaar.",
      votes: 4
  },
  {
      id: 3,
      question: "How do I create a Formulary?",
      answer: "You can start creating a formulary by creating new, importing a template, or buying a formulary from the Bazaar... ",
      votes: 3
  },
  {
      id: 4,
      question: "How do I create a Formulary?",
      answer: "You can start creating a formulary by creating new, importing a template, or buying a formulary from the Bazaar... ",
      votes: 3
  },
  {
      id: 5,
      question: "How do I create a Formulary?",
      answer: "You can start creating a formulary by creating new, importing a template, or buying a formulary from the Bazaar... ",
      votes: 2
  },
]
export default class WorkFlow extends React.Component<any, any> {  
  state = {
    allQuestions: [
              {
                  id: 1,
                  question: "How do I create a Formulary?",
                  answer: "You can start creating a formulary by creating new, importing a template, or buying a formulary from the Bazaar ABC DEF",
                  votes: 5
              }
            ],
    questions: [
              {
                  id: 1,
                  question: "How do I create a Formulary?",
                  answer: "You can start creating a formulary by creating new, importing a template, or buying a formulary from the Bazaar ABC DEF",
                  votes: 5
              }
            ]
  }
  componentDidMount() {
    this.setState({
     questions: questions,
     allQuestions: questions,
    })
  }
  handleChange = (e) => {
    var questi = this.state.allQuestions.filter(function (el) { return el!.question.toLocaleLowerCase().indexOf(e.target.value) !== -1 });
    this.setState({
     questions: questi
    })
  }
  render() {
    const { questions } = this.state;
    return (
        <div>
            <Grid container className="containerQA">
                <Grid item xs={12}>
                    <div className="headerTitle">Find answers in Formulary</div>
                </Grid>
                <Grid item xs={8} className="paddingTop0">
                    <Input
                      className="member-search__input"
                      placeholder="Search"
                      type="text"
                      onChange={(e) => {this.handleChange(e)}}
                      disableUnderline={true}
                      startAdornment={
                        // <InputAdornment position="start">
                        <svg
                          className="member-search__icon"
                          width="11"
                          height="11"
                          viewBox="0 0 11 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                            fill="#999999"
                          />
                        </svg>

                        // {/* </InputAdornment> */}
                      }
                    />
                </Grid>
                <Grid item xs={1} className="paddingTop0">
                </Grid>
                <Grid item xs={3} className="paddingTop0 marginLeft">
                  <div className="workFlowControl workFlowControl-dot">
                    <DropDown
                        options={["most helpful", "less helpful"]}
                        defaultValue="most helpful"
                        className="dropdown-input"
                      />
                  </div>
                </Grid>
                {questions.map((question, index) => (
                  <Question question={question}/>
                ))}
            </Grid>
        </div>
    );
  }
} 