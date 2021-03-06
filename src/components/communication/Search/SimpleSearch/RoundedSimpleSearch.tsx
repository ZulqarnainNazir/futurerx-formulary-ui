import React, { Component } from "react";
import { Input, Select } from "antd";
import "./RoundedSimpleSearch.scss";

interface RoundedSimpleSearchState {
  searchText: string;
}

interface RoundedSimpleSearchProps {
  onSearch: (searchObject: RoundedSimpleSearchState) => void;
  placeholder?: string;
}

class RoundedSimpleSearch extends Component<
  RoundedSimpleSearchProps,
  RoundedSimpleSearchState
> {
  state = {
    searchText: "",
  };

  handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (
      (e && e.target && e.target.value) ||
      (e && e.target && e.target.value === "")
    ) {
      const key = e.currentTarget.name;
      let value = e.target.value;

      if (Object.keys(this.state).includes(key)) {
        this.setState({ ...this.state, [key]: value } as Pick<
          RoundedSimpleSearchState,
          keyof RoundedSimpleSearchState
        >);
      }
      this.onSearch(value);
    }
  };
  onSearch = (text: string) => {
    this.props.onSearch({ searchText: text });
  };

  render() {
    const { placeholder } = this.props;
    return (
      <div className="rounded-simple-search">
        <Input
          className="simple-search__input simple-search__input--text"
          onChange={this.handleInputChange}
          value={this.state.searchText}
          placeholder={
            placeholder
              ? placeholder
              : "Search (note, user, date, category, user)"
          }
          name="searchText"
          suffix={
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.5 7C1.5 3.96243 3.96243 1.5 7 1.5C10.0376 1.5 12.5 3.96243 12.5 7C12.5 10.0376 10.0376 12.5 7 12.5C3.96243 12.5 1.5 10.0376 1.5 7ZM7 0.5C3.41015 0.5 0.5 3.41015 0.5 7C0.5 10.5899 3.41015 13.5 7 13.5C8.61495 13.5 10.0923 12.911 11.2291 11.9362L14.6464 15.3536C14.8417 15.5488 15.1583 15.5488 15.3536 15.3536C15.5488 15.1583 15.5488 14.8417 15.3536 14.6464L11.9362 11.2291C12.911 10.0923 13.5 8.61495 13.5 7C13.5 3.41015 10.5899 0.5 7 0.5Z"
                fill="#999999"
              />
            </svg>
          }
        />
      </div>
    );
  }
}

export default RoundedSimpleSearch;
