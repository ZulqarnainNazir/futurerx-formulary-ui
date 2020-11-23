/**
 * Sample component to test and demonstrate re use of FrxGridContainer
 */

import * as React from "react";
import "./MemberInfo.scss";
import { Button, Table, Tag, Space } from "antd";

// antd
import {Tooltip} from "antd";

//components
import {
  memberInfo1,
  memberInfo2,
  memberInfo3,
  rejectedCountData
} from "../../../mocks/ClaimGridModelMock";

export interface MemberInfoProps{
  claimData: any;
}

const rejectedCountColumn = [
  {
    title: 'Reject Code',
    dataIndex: 'rejectCode',
    key: 'rejectCode',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Submitted Value',
    dataIndex: 'submittedValue',
    key: 'submittedValue',
    render: submittedValue => (
      <>
        {submittedValue.map(submittedValueag => {
          return (
            <div className="submitted-value">
            <span>
              {submittedValueag}
            </span>
            </div>
          );
        })}
      </>
    ),
  },
  {
    title: 'Expected Value (if available)',
    dataIndex: 'expectedValue',
    key: 'expectedValue',
    render: expectedValue => (
      <>
        {expectedValue.map(expectedValuetag => {
          return (
            <div className="expected-value">
              <span>{expectedValuetag}</span>
            </div>
          );
        })}
      </>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
]

class MemberInfo extends React.Component<MemberInfoProps> {
  state = {};

  render() {

    return (
      <>
      <div className="member-info-root">
        <div className="member-info-root__content">
        {this.props.claimData.status === "Rejected" ? (
          <div className="member-info-root__content--status__rejected">
            <h1>{this.props.claimData.status}</h1>
            <h1>{this.props.claimData.serviceDate}</h1>
          </div>
          ) : this.props.claimData.status === "Paid" ? (
            <div className="member-info-root__content--status__paid">
            <h1>{this.props.claimData.status}</h1>
            <h1>{this.props.claimData.serviceDate}</h1>
            </div>
          ) : this.props.claimData.status === "Reversed" ? (
            <div className="member-info-root__content--status__reversed">
            <h1>{this.props.claimData.status}</h1>
            <h1>{this.props.claimData.serviceDate}</h1>
            </div>
          ) : null}
          <div className="member-info-root__content--details">
            {memberInfo1.map((label, i) => (
              <div key={i + ""} className="fields">
                <label>{label.label}</label>
                {this.props.claimData.status === "Paid" ? (
                  <span
                  className={
                    label.label === "Member ID" ? "higlighted-value" : ""
                  }
                >
                  {label.labelValue}
                </span>
                ) : this.props.claimData.status === "Rejected" ? (
                  <>
                  {label.label === "BIN#" || label.label === "First Name" ? (
                  <Tooltip
                  placement="top"
                  arrowPointAtCenter={true} 
                  overlayClassName="member-info-root__tooltip"
                  title={
                  <>
                    {label.label === "BIN#" ? (
                      <>
                        <span>M/I Bin Number</span>
                      </>
                    ): label.label === "First Name" ? (
                      <>
                      <span>M/I cardholder first name</span>
                      </>
                    ):null}
                    </>
                  }
                  >
                    <span
                    // className={
                    //   label.label === "Member ID" ? "higlighted-value" : ""
                    // }
                    style={{color: label.label === "BIN#" || label.label === "First Name" ? "#E76262" : "#666666"}}
                  >
                    {label.labelValue}
                  </span>
                </Tooltip>
                ) : (
                  <span
                  className={
                    label.label === "Member ID" ? "higlighted-value" : ""
                  }
                  style={{color: label.label === "BIN#" || label.label === "First Name" ? "#E76262" : "#666666"}}
                >
                  {label.labelValue}
                </span>
                )}
                </>
                ):(
                  <span
                  className={
                    label.label === "Member ID" ? "higlighted-value" : ""
                  }
                >
                  {label.labelValue}
                </span>
                )}
              </div>
            ))}
          </div>
          <div className="member-info-root__content--details">
            {memberInfo2.map((label, i) => (
              <div key={i + ""} className="fields">
                <label>{label.label}</label>
                {this.props.claimData.status === "Paid" ? (
                  <span>
                  {label.labelValue}
                </span>
                ) : this.props.claimData.status === "Rejected" ? (
                  <>
                  {label.label === "DOB" || label.label === "RX#" ? (
                  <Tooltip
                  placement="top"
                  arrowPointAtCenter={true} 
                  overlayClassName="member-info-root__tooltip"
                  title={
                  <>
                    {label.label === "DOB" ? (
                      <span>M/ I Date Of Birth</span>
                    ): label.label === "RX#" ? (
                      <span>DAW code Value Not Supported</span>
                    ):null}
                    </>
                  }
                  >
                    <span
                    style={{color: label.label === "DOB" || label.label === "RX#" ? "#E76262" : "#666666"}}
                  >
                    {label.labelValue}
                  </span>
                </Tooltip>
                  ): (
                    <span
                    style={{color: label.label === "DOB" || label.label === "RX#" ? "#E76262" : "#666666"}}
                  >
                    {label.labelValue}
                  </span>
                  )}
                  </>
                ) : (
                  <span>
                  {label.labelValue}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="member-info-root__content--details">
            {memberInfo3.map((label, i) => (
              <div key={i + ""} className="fields">
                <label>{label.label}</label>
                <span
                  className={
                    label.label === "Drug Name" ||
                    label.label === "NDC" ||
                    label.label === "Pharmacy NPI" ||
                    label.label === "Pharmacy NCPDP#"
                      ? "higlighted-value"
                      : ""
                  }
                >
                  {label.labelValue}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {this.props.claimData.status === "Rejected" ? (
      <div className="member-info-root__rejected--count">
        <span className="member-info-root__rejected--count__header">Reject Messages (Count)</span>
        <Table className="member-info-root__rejected--count__table" pagination={false} columns={rejectedCountColumn} dataSource={rejectedCountData} />
      </div>
      ) : null}
      </>
    );
  }
}

export default MemberInfo;
