import React from "react";
import './WorkFlow-Dialog.scss';
import DropDown from "../../../../../shared/Frx-components/dropdown/DropDownMap";
import FrxTimeProgressBar from "../../../../../shared/FrxTimeProgressBar/FrxTimeProgressBar";
import { ReactComponent as OrangeDot } from "../../../../../../assets/icons/orange-dot.svg";


const EyeIcon = (props) => (
  <span {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="none"
    >
      <path
        d="M15.6548 5.60078C14.172 2.70754 11.2364 0.75 7.87498 0.75C4.51362 0.75 1.57717 2.70891 0.0951413 5.60105C0.0325903 5.72479 0 5.86149 0 6.00014C0 6.13878 0.0325903 6.27549 0.0951413 6.39922C1.57799 9.29246 4.51362 11.25 7.87498 11.25C11.2364 11.25 14.1728 9.29109 15.6548 6.39895C15.7174 6.27521 15.75 6.13851 15.75 5.99986C15.75 5.86122 15.7174 5.72451 15.6548 5.60078ZM7.87498 9.9375C7.09622 9.9375 6.33495 9.70657 5.68743 9.27391C5.03991 8.84125 4.53523 8.2263 4.23721 7.50682C3.93919 6.78733 3.86121 5.99563 4.01314 5.23183C4.16507 4.46803 4.54008 3.76644 5.09075 3.21577C5.64142 2.6651 6.34302 2.29009 7.10682 2.13816C7.87062 1.98623 8.66232 2.0642 9.3818 2.36222C10.1013 2.66024 10.7162 3.16492 11.1489 3.81244C11.5816 4.45996 11.8125 5.22124 11.8125 6C11.8127 6.51715 11.7111 7.02928 11.5133 7.50711C11.3155 7.98495 11.0255 8.41911 10.6598 8.78479C10.2941 9.15047 9.85993 9.4405 9.3821 9.63829C8.90427 9.83608 8.39213 9.93775 7.87498 9.9375ZM7.87498 3.375C7.64068 3.37827 7.4079 3.41313 7.18291 3.47863C7.36836 3.73065 7.45736 4.04079 7.43376 4.3528C7.41015 4.66481 7.27551 4.95802 7.05426 5.17928C6.83301 5.40053 6.53979 5.53517 6.22778 5.55877C5.91577 5.58237 5.60564 5.49338 5.35362 5.30793C5.21011 5.83665 5.23601 6.39705 5.42769 6.91027C5.61936 7.42349 5.96715 7.86369 6.4221 8.16889C6.87706 8.4741 7.41627 8.62895 7.96384 8.61166C8.51141 8.59436 9.03978 8.40578 9.47456 8.07247C9.90934 7.73915 10.2287 7.27789 10.3876 6.75359C10.5465 6.22929 10.5369 5.66837 10.3603 5.14977C10.1837 4.63116 9.84897 4.18099 9.40313 3.86262C8.95728 3.54425 8.42283 3.37371 7.87498 3.375Z"
        fill="#707683"
      />
    </svg>
  </span>
);

export default class WorkFlowDialog extends React.Component<any, any> {
  state = {
    expandCloseIconInd: true,
  }

  handleExpandedDetailClick = () => {
    this.setState({ expandCloseIconInd: !this.state.expandCloseIconInd });
  }

  getFormularyType() {

  }
  render() {
    return (
      <div className="worflowDialogContainer">
        <div className="workFlowlabel">
          In Review
        </div>
        <div className="workFlowControl workFlowControl-dot">
          <DropDown
            options={["Complete", "Work InProgress"]}
            defaultValue="Complete"
            className="dropdown-input"
          />
          <span className="drop-down-icon">
            <OrangeDot />
          </span>
        </div>
        <div className="workFlowControl">
          <DropDown
            options={["Select Reason"]}
            defaultValue="Select Reason"
            className="dropdown-input"
          />
        </div>
        <div className="workFlowControl">
          <DropDown
            options={["Select Explanation"]}
            defaultValue="Select Explanation"
            Disabled={true}
            className="dropdown-input"
          />
        </div>
        <div className="workFlowBarControl">
          <FrxTimeProgressBar text="09/04/2020  @ 9:00 AM" progress={25} />
        </div>

        <div className="workFlowIcon">
          {this.state.expandCloseIconInd ?
            <div onClick={this.handleExpandedDetailClick}>
              <svg
                width="5"
                height="9"
                viewBox="0 0 5 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.245493 7.96947C-0.0693603 7.6615 -0.0940685 7.23274 0.245493 6.85625L2.89068 4.09578L0.245492 1.33532C-0.0940688 0.958827 -0.0693606 0.529358 0.245492 0.223503C0.559639 -0.0844708 1.09051 -0.0646925 1.3856 0.223503C1.68069 0.510286 4.56378 3.53987 4.56378 3.53987C4.63851 3.61202 4.69794 3.69849 4.73853 3.79412C4.77913 3.88975 4.80005 3.99259 4.80005 4.09649C4.80005 4.20039 4.77913 4.30322 4.73853 4.39886C4.69794 4.49449 4.63851 4.58096 4.56378 4.6531C4.56378 4.6531 1.68069 7.68128 1.3856 7.96947C1.09051 8.25838 0.55964 8.27745 0.245493 7.96947Z"
                  fill="#323C47"
                />
              </svg>
            </div>
            :
            <div onClick={this.handleExpandedDetailClick}>
              <svg
                width="9"
                height="5"
                viewBox="0 0 9 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.223752 0.24549C0.531543 -0.0693596 0.960049 -0.0940675 1.33632 0.24549L4.09513 2.89065L6.85395 0.24549C7.23022 -0.0940675 7.65943 -0.0693596 7.9651 0.24549C8.27289 0.559634 8.25313 1.0905 7.9651 1.38559C7.67849 1.68067 4.65071 4.56373 4.65071 4.56373C4.57861 4.63846 4.49219 4.69789 4.39662 4.73849C4.30104 4.77908 4.19827 4.8 4.09443 4.8C3.99059 4.8 3.88782 4.77908 3.79224 4.73849C3.69666 4.69789 3.61025 4.63846 3.53815 4.56373C3.53815 4.56373 0.511776 1.68067 0.223752 1.38559C-0.0649778 1.0905 -0.0840382 0.559634 0.223752 0.24549Z"
                  fill="#999999"
                />
              </svg>
            </div>
          }
        </div>

        {
          !this.state.expandCloseIconInd &&
          <div className="expandedDetailWrapper">
            <div className="expandedLeftSection">             
            <div className="row">
                <span className="statusIcon"></span>
                <label>Parent task name</label>
                <div className="taskPicWrapper">
                  <span>

                  </span>
                </div>
                <span className="eyeIcon">
                  <EyeIcon />
                </span>
              </div>

              <div className="row">
                <span className="statusIcon"></span>
                <p style={{color:"#707683"}}>SUBTASKS</p>                
              </div>

              <div className="row">
                <span className="statusIcon"><OrangeDot /></span>
                <p style={{color:"#333333"}}>Subtask number 1</p>
                <div className="taskPicWrapper">
                  <span>

                  </span>
                </div>
                <span className="eyeIcon">
                  <EyeIcon />
                </span>
              </div>

            </div>
            <div className="expandedMiddleSection">

            </div>
            <div className="expandedRightSection">
              <div className="expandedRightSectionWrapper">
                <div className="workFlowNotes">
                  NOTES
                </div>
                <div className="workFlowNoteDetail">
                  <div className="workFlowNoteDetailPic">
                      <span>

                      </span>
                  </div>
                  <div className="workFlowNoteDetailText">
                    <label>Kristine Watson</label>
                    <span>2 hours ago</span>
                    <p>We need to figure out what's going on with the last three items</p>
                    <div>Version: 2</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}