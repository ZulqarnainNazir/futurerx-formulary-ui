import React from "react";
import Grid from "@material-ui/core/Grid";
import FrxMiniTabs from "../../../shared/FrxMiniTabs/FrxMiniTabs";
import FrxGrid from "../../../shared/FrxGrid/FrxGrid";
import FrxLoader from "../../../shared/FrxLoader/FrxLoader";

import "./GrievancesCommunication.scss";
import SimpleSearch from "../../../communication/Search/SimpleSearch/SimpleSearch";
import DiagnosisSearchForm from "../../../shared/FrxSearchForm/FrxSearchForm";
import FrxTermRecord from "../../../shared/FrxTermRecord/FrxTermRecord";

const sampleImage = require("../../../../mocks/sample.svg");

declare type tabType = "form" | "grid";

interface CommunicationProps {
  onClose?: any;
  openPopup?: any;
  title: string;
  className?: string;
  showTabs?: boolean;
  tabs?: any;
  tabTypes?: tabType[];
  formFields?: any;
  data: any;
  columns: any;
}
interface CommunicationState {
  activeMiniTabIndex: number;
  miniTabs: any;
  filteredData: any;
  isFetchingData: boolean;
  data: any;
  openPopup: boolean;
  poupType: any;
  selectedRow: any;
}

class Communication extends React.Component<
  CommunicationProps,
  CommunicationState
  > {
  state = {
    activeMiniTabIndex: 0,
    filteredData: [],
    isFetchingData: false,
    data: [],
    openPopup: false,
    poupType: { title: "" },
    selectedRow: { index: "" },
    miniTabs: [
      {
        id: 1,
        text: "Inbound"
      },
      {
        id: 2,
        text: "OutBound"
      }
    ]
  };
  /**
   *@function onClose
   *
   * Close the member audit popup
   * will call callback function from onclose parameter.
   * @memberof MemberPopup
   */

  onClose = () => {
    // this.props.onClose();
    alert("Closed");
  };

  /**
   *@function onClickMiniTab
   *
   * onClickMiniTab the member audit popup
   *
   * @memberof MemberPopup
   */

  /**
   * Action method if any action is required for dialog popup
   *
   * @memberof MemberPopup
   */
  action = () => {
    console.log("no action to perform");
  };

  processData(num: number) {
    const data = this.props.data[num];
    this.setState({ data, filteredData: data, isFetchingData: false });
  }
  componentDidMount() {
    this.processData(0);
  }
  handleSearch = (searchObject: any) => {
    this.setState({ isFetchingData: true });
    if (searchObject) {
      setTimeout(() => {
        const newData = this.state.data.filter((item: any) =>
          Object.keys(item)
            .map((_item: any) =>
              item[_item]
                .toString()
                .toLocaleLowerCase()
                .includes(searchObject.searchText.toLocaleLowerCase())
            )
            .includes(true)
        );
        this.setState({ isFetchingData: false, filteredData: newData });
      }, 2000);
    } else {
      this.setState({ isFetchingData: false });
    }
  };
  onClickMiniTab = (num: number) => {
    this.setState({
      activeMiniTabIndex: num
    });
    this.processData(num);
  };

  // {/* <div
  //     className={`frx-grid-container ${
  //       this.props.showTabs ? "borderTop" : ""
  //     }`}
  // > */}
  render() {
    // title=""
    // onClose={this.onButtonClick}
    // openPopup={true}
    // const data={getCommunicationsGrievancesData()}
    // const  columns={getCommunicationsGrievances()}
    // showTabs={true}
    // tabs={[{ id: 1, text: 'Inbound' }, { id: 2, text: 'Outbound' }]}
    // tabTypes={["grid", "form"]}
    const { columns } = this.props;
    return (
      <>
        <div className="communication-info">
          {this.props.showTabs && (
            <div>
              <FrxMiniTabs
                tabList={this.props.tabs ? this.props.tabs : this.state.miniTabs}
                activeTabIndex={this.state.activeMiniTabIndex}
                onClickTab={this.onClickMiniTab}
              />
              <div className="comtitle">
                <label className="member-notification-root__header-text">
                  {this.props.tabs[this.state.activeMiniTabIndex]["text"]}{" "}
                Communications
              </label>
                <span className="member-notification-header__icon-container">
                  <svg
                    width="10"
                    height="12"
                    viewBox="0 0 10 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="member-notification-header--noteicon"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7 0L10 3H7V0ZM6 0H1C0.447715 0 0 0.447715 0 1V11C0 11.5523 0.447715 12 1 12H9C9.55229 12 10 11.5523 10 11V4H7H6V0Z"
                      fill="#2055B5"
                    />
                  </svg>
                </span>
              </div>
            </div>
          )}
          {this.state.activeMiniTabIndex === 0 && (
            <>
              {this.props.showTabs ? (
                <SimpleSearch onSearch={this.handleSearch} />
              ) : (
                  <div className="noSpacing">
                    <SimpleSearch onSearch={this.handleSearch} />
                  </div>
                )}
              <FrxGrid
                showSettingsMenu={true}
                isRowSelectionEnabled={true}
                isRowSelectorCheckbox
                enableColumnDrag={false}
                pagintionPosition="bottomRight"
                columns={columns}
                data={this.state.filteredData}
                gridName={this.props.title}
                fixedColumnKeys={["record_type"]}
                hideClearFilter={true}
                hideItemsPerPage={false}
                loading={{
                  spinning: this.state.isFetchingData,
                  indicator: <FrxLoader />
                }}
                hideMultiSort={false}
                hidePageJumper={true}
                hidePagination={true}
                hideResults={false}
                scroll={{ x: 860, y: 350 }}
                enableSettings={true}
                rowClassName={(record, index) => {
                  console.log(record, index);
                  return record.index === this.state.selectedRow.index
                    ? "selt"
                    : "not-selt";
                }}
                expandable={{
                  isExpandable: this.state.openPopup,
                  expandIconColumnIndex: 21,
                  expandOpenIcon: <span className="openIcon"></span>,
                  expandedRowClassName: (record, index) => {
                    console.log(record, index);
                    return record.index === this.state.selectedRow.index
                      ? "expand-selected"
                      : "not-selected";
                  },
                  expandCloseIcon: (
                    <div
                      className="closeIcon"
                      onClick={() => {
                        this.setState({ openPopup: false });
                      }}
                    >
                      X
                    </div>
                  ),
                  expandedRowRender: (props: any) => {
                    console.log(props);
                    return this.state.poupType.title === "Term Record" ? (
                      <FrxTermRecord isNotesPopup={false} />
                    ) : (
                        <FrxTermRecord isNotesPopup={true} />
                      );
                  }
                }}
                settingsTriDotMenuClick={(item: any) => {
                  if (item.title === "Term Record") {
                    this.setState({ openPopup: true, poupType: item });
                  } else if (item.title === "Add Note") {
                    this.setState({ openPopup: true, poupType: item });
                  }
                }}
                onSettingsClick="grid-menu"
              />
            </>
          )}
          {this.state.activeMiniTabIndex === 1 && (
            <>
              {this.props.showTabs ? (
                <SimpleSearch onSearch={this.handleSearch} />
              ) : (
                  <div className="noSpacing">
                    <SimpleSearch onSearch={this.handleSearch} />
                  </div>
                )}
              <FrxGrid
                showSettingsMenu={true}
                isRowSelectionEnabled={true}
                isRowSelectorCheckbox
                enableColumnDrag={false}
                pagintionPosition="bottomRight"
                columns={columns}
                data={this.state.filteredData}
                gridName={this.props.title}
                fixedColumnKeys={["record_type"]}
                hideClearFilter={true}
                hideItemsPerPage={false}
                loading={{
                  spinning: this.state.isFetchingData,
                  indicator: <FrxLoader />
                }}
                hideMultiSort={false}
                hidePageJumper={true}
                hidePagination={true}
                hideResults={false}
                scroll={{ x: 860, y: 350 }}
                enableSettings={true}
                rowClassName={(record, index) => {
                  console.log(record, index);
                  return record.index === this.state.selectedRow.index
                    ? "selt"
                    : "not-selt";
                }}
                expandable={{
                  isExpandable: this.state.openPopup,
                  expandIconColumnIndex: 21,
                  expandOpenIcon: <span className="openIcon"></span>,
                  expandedRowClassName: (record, index) => {
                    console.log(record, index);
                    return record.index === this.state.selectedRow.index
                      ? "expand-selected"
                      : "not-selected";
                  },
                  expandCloseIcon: (
                    <div
                      className="closeIcon"
                      onClick={() => {
                        this.setState({ openPopup: false });
                      }}
                    >
                      X
                    </div>
                  ),
                  expandedRowRender: (props: any) => {
                    console.log(props);
                    return this.state.poupType.title === "Term Record" ? (
                      <FrxTermRecord isNotesPopup={false} />
                    ) : (
                        <FrxTermRecord isNotesPopup={true} />
                      );
                  }
                }}
                settingsTriDotMenuClick={(item: any) => {
                  if (item.title === "Term Record") {
                    this.setState({ openPopup: true, poupType: item });
                  } else if (item.title === "Add Note") {
                    this.setState({ openPopup: true, poupType: item });
                  }
                }}
                onSettingsClick="grid-menu"
              />
            </>
          )}
        </div>
      </>
    );
  }
}
// {/* </div> */}

export default Communication;
