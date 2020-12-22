import React, { Component } from "react";
import { Tree } from "antd";

import "./DrugCategory.scss";

interface Props {
  onCkick: () => any;
}
interface State {}

class DrugCategory extends Component<Props, State> {
  state = {
    drugCategory: [
      {
        title: "category 1",
        // (
        //   <span>
        //     <input type="radio" />
        //     category 1
        //   </span>
        // )
        key: "0-0",

        children: [
          {
            title: (
              <span>
                <input
                  type="radio"
                  name="radiobutton"
                  value="class A"
                  onChange={(e) => this.setCategoryClass(e, '')}
                  style={{ marginRight: "5px" }}
                />
                <label htmlFor=""> class A</label>
              </span>
            ),
            key: "0-0-0",
            children: [
              {
                title: "Drug 1",
                key: "0-0-0-1",
              },
              {
                title: "Drug 2",
                key: "0-0-0-2",
              },
            ],
          },
          {
            title: (
              <span>
                <input
                  type="radio"
                  name="radiobutton"
                  value="class B"
                  style={{ marginRight: "5px" }}
                />
                <label htmlFor="">Class B</label>
              </span>
            ),
            key: "0-0-1",
            children: [
              {
                title: "Drug 1",
                key: "0-0-1-1",
              },
              {
                title: "Drug 2",
                key: "0-0-1-2",
              },
            ],
          },
        ],
      },
      {
        title: "category 2",
        key: "0-1",
        children: [],
      },
    ],
  };

  setCategoryClass = (e,category) => {
    console.log('Set category class called');
  }

  render() {
    const { drugCategory } = this.state;
    return (
      <div className="__root-drug-category">
        <Tree
          //   checkable
          //   onExpand={this.onExpand}
          // expandedKeys={expandedKeys}
          //   autoExpandParent={autoExpandParent}
          //   onCheck={this.onCheck}
          //   checkedKeys={checkedKeys}
          //   onSelect={this.onSelect}
          //   selectedKeys={selectedKeys}
          selectable={false}
          treeData={drugCategory}
        />
        <span className="__expand-all" onClick={this.props.onCkick}>
          <p>Expand All</p>
        </span>
      </div>
    );
  }
}

export default DrugCategory;
