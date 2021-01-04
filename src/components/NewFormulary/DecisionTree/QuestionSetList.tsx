/**
 * Component to hold the table listing question sets
 */

//core
import React from "react";
import { RouteComponentProps } from "react-router-dom";
//services
import questionService from "../../services/question.service";
import CustomLoader from "../loader-overlay/custom-loader.component";
import QuestionSetTable from "../question-set-table/question-list-table.component";
//custom styles
import "./question-set-list.styles.scss";
import Toast from "../toast/toast.component";
import CustomGrid from "../custom-grid/custom-grid.component";
import { showAlert, showSuccess } from "../../utils/alerts/notifications";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "frx-grid-control": FrxGridProps;
    }
  }
}

interface FrxGridProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  isCollapsed: (isCollapsed: boolean) => void;
  filterOptions: any[];
  defaultSortColumn: string;
  gridAddLabel: string;
  defaultSortOrder: string;
  drpTypeValue: string;
  service: any;
  isAdd: boolean;
  isSearch: boolean;
  gridKey: string;
}

export interface QuestionSetListProps extends RouteComponentProps<any> {}

export interface QuestionSetListState {}

class QuestionSetList extends React.Component<
  QuestionSetListProps,
  QuestionSetListState
> {
  state = {
    questionSetList: [],
    fetching: false,
    filterOptions: [
      { key: "Export/Share", value: "Export/Share" },
      { key: "Export Spreadsheet", value: "Export Spreadsheet" },
      { key: "Download PDF", value: "Download PDF" },
      { key: "Share by Email", value: "Share by Email" },
    ],
    isCollapsed: false,
    isCloning: false,
  };

  componentDidMount() {
    this.fetchUserPreferences();
    this.fetchQuestionSets();
  }

  /**
   * @function fetchUserPreferences
   * to fetch a user eg john's grid preferences
   */
  fetchUserPreferences = async () => {
    console.log("fetch prefernces");
    const response = await questionService.getuserPreferences();
    if (response && response.status === 200) {
      const data = response.data;
      console.log(data.data.preferences);
      if (data.meta && data.meta.success) {
        if (data.data.prefs && data.data.prefs.length > 0) {
          //store preferences in localstorage
          const storedPreferences = data.data.prefs;
          localStorage.setItem(
            "preferences",
            JSON.stringify(storedPreferences)
          );
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("username", data.data.username);
        }
      } else {
        console.log("error in preferences");
      }
    } else {
      console.log("error in preferences");
    }
  };

  /**
   * @function handleSharedButtonClick
   * handle click of create questionnaire button
   */
  handleSharedButtonClick = () => {
    console.group("clicked on shared button");
    this.props.history.push("/question-set/new");
  };

  handleSuccessfulClone = () => {
    // this.fetchQuestionSets();
  };

  onClone = (isCloning: boolean) => {
    this.setState({ isCloning: isCloning });
  };

  /**
   * @function fetchQuestionSets
   * to fetch the list of question sets created from server
   */
  fetchQuestionSets = async () => {
    this.setState({ fetching: true });
    const response = await questionService.getQuestionSets();
    console.log("qset list data ", response.data);
    if (response && response.status === 200) {
      const data = response.data;
      const questionSetList = data.data;
      if (questionSetList && questionSetList.length > 0) {
        questionSetList.forEach((set) => (set["key"] = set.id));
        this.setState({ questionSetList }, () => {
          setTimeout(() => {
            this.setState({ fetching: false });
          }, 10);
        });
      } else {
        this.setState({ questionSetList: [] }, () => {
          setTimeout(() => {
            this.setState({ fetching: false });
          }, 10);
        });
      }
    } else {
      this.setState({ fetching: false });
      showAlert("Something went wrong");
    }
  };

  gridCollapsed = (isCollapsed: boolean) => {
    this.setState({ isCollapsed: isCollapsed });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.fetching || this.state.isCloning ? (
          <div className="loader-overlay-container">
            <CustomLoader />
          </div>
        ) : (
          <div className="w-100 p-tb-20 grid-table">
            <div className="w-95 p-0 border-lined question-set-list">
              <CustomGrid
                history={this.props.history}
                onSuccessfulClone={this.handleSuccessfulClone}
                questionSetList={this.state.questionSetList}
                onClone={this.onClone}
              />
            </div>
          </div>
        )}

        <Toast />
      </React.Fragment>
    );
  }
}

export default QuestionSetList;
