import { Box, Button, Chip, Grid, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Checkbox, Input, Select, DatePicker, Tag } from "antd";

import React, { Component } from 'react';
import { connect } from "react-redux";
import { getUserPrefs, setUserPrefs } from "../../../redux/slices/users/UserPrefsActionCreator";
import CustomDatePicker from "../Frx-components/date-picker/CustomDatePicker";
import './FrxGenericSearch.scss';

declare type searchType = "TEXT" | "DROPDOWN" | "DATE" | "MULTIDROPDOWN" | "SEARCHDROPDOWN" | "CLEAR"
interface option {
    id: number,
    item: any,
    displayOption: string,
    parentValue?: string,
    onClick?: any
}

interface SearchOption {
    id: number,
    row: number,
    searchType: string,
    isRequired: boolean,
    pixelWidth: number,
    placeholder: string,
    name: string,
    options?: option[],
    filteredOptions?: option[],
    className?: string,
    preficxIcon?: any,
    value?: any,
    isError?: boolean,
    errorTxt?: string,
    getSuggestions?: any,
    suggestions?: any,
    nameSpace: string,
    parent?: number,
}

function mapDispatchToProps(dispatch) {
    return {
        setPrefs: (member_id, data) => {
            dispatch(setUserPrefs({ member_id: member_id, data: data }))
        },
        getPrefs: (member_id) => {
            dispatch(getUserPrefs(member_id))
        }
    };
}

// Get state as props
const mapStateToProps = (state) => {
    return {
        userPrefs: state.user_prefs,
    };
};

interface Props {
    searchOptions: SearchOption[];
    onSearch: any;
    setPrefs: any;
    getPrefs: any;
    userPrefs: any;
}

interface State {
    searchOptions: SearchOption[];
}

const { Option } = Select;

class GenericSearch extends Component<Props, State>{
    state = {
        searchOptions: []
    }

    componentDidMount = () => {
        setTimeout(() => {
            var temp: any = this.props.searchOptions.map((item: any) => {

                return item.searchType === 'TEXT' ?
                    { ...item, suggestions: this.props.userPrefs.prefs?.filter((_item: any) => _item.namespace === item.nameSpace)[0]?.preferences?.filter((_item: any) => _item.column === item.name)[0]?.value }
                    : item
            })
            this.setState({
                searchOptions: temp
            })
        }, 2000)
        this.setState({
            searchOptions: this.props.searchOptions
        })
        this.props.getPrefs('john')
    }

    setValue = (item: SearchOption) => {
        let temp: any = this.state.searchOptions
        temp[item.id - 1] = item
        this.setState({
            searchOptions: temp
        })
    }

    onClear = (item: SearchOption) => {
        let temp: any = this.state.searchOptions.map((_item: any) =>
            item.value
                ? (item.value.includes(_item.id)
                    ? { ..._item, value: undefined }
                    : _item)
                : { ..._item, value: undefined })
        this.setState({
            searchOptions: temp
        })
    }
    getSearchComponent = (item: SearchOption) => {
        var _temp: SearchOption = item;
        switch (item.searchType) {
            case 'TEXT': return (
                <Autocomplete
                    className="search--input"
                    openOnFocus={true}
                    autoSelect={true}
                    id="tags-filled"
                    freeSolo
                    value={item.value ? item.value : undefined}
                    placeholder={item.placeholder}
                    onChange={
                        (e: any) => {
                            let val: any = e.target.value
                            console.log(val);
                            this.setValue({ ...item, value: val })
                        }
                    }
                    renderOption={option => {
                        return (
                            <>
                                <span>{option}</span>
                            </>
                        )
                    }
                    }
                    renderTags={(value: string[], getTagProps) =>
                        value.map((option: string, index: number) => (
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                        ))
                    }
                    renderInput={(params) => (
                        <div className="search--input--box">
                            <TextField  {...params} label="" margin="normal" variant="outlined" value={item.value} placeholder={item.placeholder} />
                        </div>
                    )}
                    onSelect={(e: any) => {
                        let val: any = e.target.value
                        console.log(val);
                        this.setValue({ ...item, value: val })
                    }}
                    componentName={item.name}
                    options={item.suggestions ? item.suggestions : []}
                />
            );
            case 'SEARCHDROPDOWN': return (<Input.Group className="FrxGenericSearch-root-search--input" compact style={{ width: item.pixelWidth, marginRight: 10 }}>
                <Input
                    className="search-dropdown-prefix"
                    placeholder="Search Drug"
                    name={item.name}
                    prefix={item.preficxIcon ? item.preficxIcon : (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 7C1.5 3.96243 3.96243 1.5 7 1.5C10.0376 1.5 12.5 3.96243 12.5 7C12.5 10.0376 10.0376 12.5 7 12.5C3.96243 12.5 1.5 10.0376 1.5 7ZM7 0.5C3.41015 0.5 0.5 3.41015 0.5 7C0.5 10.5899 3.41015 13.5 7 13.5C8.61495 13.5 10.0923 12.911 11.2291 11.9362L14.6464 15.3536C14.8417 15.5488 15.1583 15.5488 15.3536 15.3536C15.5488 15.1583 15.5488 14.8417 15.3536 14.6464L11.9362 11.2291C12.911 10.0923 13.5 8.61495 13.5 7C13.5 3.41015 10.5899 0.5 7 0.5Z" fill="#999999" />
                    </svg>)}
                />
                <Select
                    showSearch
                    className="search-dropdown-select"
                    placeholder="Search Drug"
                    optionFilterProp="children"
                    value={item.value ? item.value : undefined}
                    dropdownClassName="GenericSearch-dropdown-select_dropdown"
                    onChange={(e: any) => {
                        this.setValue({ ...item, value: e })
                    }}
                    onSearch={(e: any) => {
                        var input = e
                        console.log(e);

                        if (input.trim() !== '') {
                            this.setValue({ ...item, filteredOptions: (item.options || []).filter((i: any) => i.displayOption.toLowerCase().includes(input.toLowerCase())) })
                        } else {
                            this.setValue({ ...item, filteredOptions: [] })
                        }
                    }}
                    suffixIcon={null}
                    dropdownAlign={item.options ? item.options.length > 8 ? {} : { offset: [0, 0] } : { offset: [0, 0] }}
                    filterOption={false}
                    defaultOpen={false}
                    notFoundContent={null}
                >
                    {item.filteredOptions ? item.filteredOptions.map((_item: any) => (<option value={_item.id}>{_item.displayOption}</option>)) : ''}
                </Select>
            </Input.Group>)
            case 'DATE': return <CustomDatePicker
                style={{ width: item.pixelWidth, marginRight: 10 }}
                onChange={(date: any, dateString: any) => { this.setValue({ ...item, value: date }) }}
                value={item.value}
                placeholder={item.placeholder}
                className="FrxGenericSearch-root__form__datepicker"
            />

            case 'DROPDOWN': return <Select
                placeholder={item.placeholder}
                value={item.value ? item.value : undefined}
                onChange={(e: any) => {
                    this.setValue({ ...item, value: e })
                }}
                onSelect={(_item: any) => {
                    var temp: any = (item.options || []).filter((__item: any) => __item.id === _item)[0]
                    if (temp?.onClick) {
                        temp.onClick()
                    }
                }}
                getPopupContainer={(trigger: any) => trigger.parentNode}
                style={{ width: item.pixelWidth, marginRight: 10 }}
                dropdownClassName={item.options ? item.options.length > 8 ? "GenericSearch-dropdown-select_dropdown_big" : "GenericSearch-dropdown-select_dropdown" : "GenericSearch-dropdown-select_dropdown"}
                className={item.options ? item.options.length > 8 ? "FrxGenericsearch__drop-down_big" : "FrxGenericsearch__drop-down" : "FrxGenericsearch__drop-down"}
                dropdownAlign={item.options ? item.options.length > 8 ? {} : { offset: [0, 0] } : { offset: [0, 0] }}
                suffixIcon={
                    <svg
                        className="ant-select-suffix"
                        width="6"
                        height="3"
                        viewBox="0 0 6 3"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5.79875 0H0.20125C0.0333594 0 -0.0603867 0.147179 0.0435863 0.247656L2.84234 2.94215C2.92245 3.01928 3.0767 3.01928 3.15766 2.94215L5.95641 0.247656C6.06039 0.147179 5.96664 0 5.79875 0Z"
                            fill="#999999"
                        />
                    </svg>
                }
            >
                {(item.options || []).filter((_item: any) => {
                    if (item.parent) {
                        var parentElement: any = this.state.searchOptions.filter((__item: any) => __item.id === item.parent)[0]
                        var parentValue: any = parentElement.searchType === 'DROPDOWN' ? parentElement.options.filter((_item_: any) => _item_.id === parentElement.value)[0] : parentElement.value
                        if (parentValue) {
                            return _item.parentValue === parentValue.item
                        } else {
                            return false
                        }
                    } else {
                        return true
                    }
                }).map((option: any) => (
                    <option value={option.id} onClick={option.onClick ? option.onClick : () => { }}>{option.displayOption}</option>)
                )}
            </Select>
            case 'MULTIDROPDOWN': return <Select
                mode="multiple"
                placeholder={item.placeholder}
                value={item.value ? item.value : undefined}
                onChange={(e: any) => {
                    this.setValue({ ...item, value: e })
                }}
                onSelect={(_item: any) => {
                    var temp: any = (item.options || []).filter((__item: any) => __item.id === _item)[0]
                    if (temp?.onClick) {
                        temp.onClick()
                    }
                }}
                style={{ width: item.pixelWidth, marginRight: 10 }}
                dropdownClassName="GenericSearch_multidropdown"
                className={item.options ? item.options.length > 8 ? "FrxGenericsearch__drop-down_big" : "FrxGenericsearch__drop-down" : "FrxGenericsearch__drop-down"}
                dropdownAlign={item.options ? item.options.length > 8 ? {} : { offset: [0, 0] } : { offset: [0, 0] }}
                suffixIcon={
                    <svg
                        className="ant-select-suffix"
                        width="6"
                        height="3"
                        viewBox="0 0 6 3"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5.79875 0H0.20125C0.0333594 0 -0.0603867 0.147179 0.0435863 0.247656L2.84234 2.94215C2.92245 3.01928 3.0767 3.01928 3.15766 2.94215L5.95641 0.247656C6.06039 0.147179 5.96664 0 5.79875 0Z"
                            fill="#999999"
                        />
                    </svg>
                }
            >
                {(item.options || []).map((option: any) => (<option value={option.id} onClick={option.onClick ? option.onClick : () => { }}>{option.displayOption}</option>))}
            </Select>
            case 'CLEAR': return <Button
                className="clear"
                style={{ width: item.pixelWidth }}
                onClick={() => { this.onClear(item) }}
            >
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 17C13.1944 17 17 13.1945 17 8.5C17 3.80554 13.1944 0 8.5 0C3.8056 0 0 3.80554 0 8.5C0 13.1945 3.8056 17 8.5 17ZM8.5 16C12.6422 16 16 12.6421 16 8.5C16 4.35791 12.6422 1 8.5 1C4.35785 1 1 4.35791 1 8.5C1 12.6421 4.35785 16 8.5 16Z" fill="#666666" />
                    <path d="M5.31803 5.31802C5.12277 5.51328 5.12277 5.82986 5.31803 6.02513L7.7929 8.5L5.31803 10.9749C5.12277 11.1701 5.12277 11.4867 5.31803 11.682C5.51329 11.8772 5.82987 11.8772 6.02514 11.682L8.50001 9.20711L10.9749 11.682C11.1701 11.8772 11.4867 11.8772 11.682 11.682C11.8773 11.4867 11.8773 11.1701 11.682 10.9749L9.20712 8.5L11.682 6.02513C11.8773 5.82986 11.8773 5.51328 11.682 5.31802C11.4867 5.12276 11.1701 5.12276 10.9749 5.31802L8.50001 7.79289L6.02513 5.31802C5.82987 5.12276 5.51329 5.12276 5.31803 5.31802Z" fill="#666666" />
                </svg>
                <span>Clear</span>
            </Button>
        }
    }

    updateSearch = () => {
        this.props.onSearch(this.state.searchOptions.filter((item: any) =>
            item.value !== undefined && item.searchType !== 'CLEAR')
            .map((item: any) => {
                return item.searchType === 'DROPDOWN'
                    ? { key: item.name, value: (item.filteredOptions || item.options || []).filter((_item: any) => item.value !== undefined && _item.id === item.value)[0].item }
                    : { key: item.name, value: item.value }
            }))

        var promise = new Promise((resolve, reject) => {
            var preferences: any = this.state.searchOptions.filter((item: any) => item.searchType === 'TEXT').map((item: any) => {
                if (item.value === undefined || item.value === '') {
                    return { column: item.name, value: item.suggestions ? item.suggestions : [] }
                } else if (item.suggestions?.includes(item.value)) {
                    return { column: item.name, value: item.suggestions ? item.suggestions : [] }
                } else {
                    return { column: item.name, value: item.suggestions ? [...item.suggestions.slice(-9), item.value] : [item.value] }
                }
            })
            console.log(preferences);

            if (preferences.length === this.state.searchOptions.filter((item: any) => item.searchType === 'TEXT').length) {
                resolve(preferences)
            }
        })
        promise.then((preferences: any) => {
            console.log(preferences);

            var temp: any = this.state.searchOptions[0]
            var data: any = {
                "namespace": temp.nameSpace,
                "preferences": preferences
            }

            this.props.setPrefs('john', data)
        })
    }
    clearAll = () => {

    }

    getData = () => {

    }

    render() {
        return (
            <div className="FrxGenericSearch-root" >
                <Grid container className="row">
                    {this.state.searchOptions.filter((item: any) => item.row === 1).map((item: any) => (
                        <Grid item className={item.className ? item.className : ''}>
                            {this.getSearchComponent(item)}
                        </Grid>
                    )
                    )}
                </Grid>
                <Grid container className="row">
                    {this.state.searchOptions.filter((item: any) => item.row === 2).map((item: any) => (
                        <Grid item className={item.className ? item.className : ''}>
                            {this.getSearchComponent(item)}
                        </Grid>
                    )
                    )}
                </Grid>
                <Grid container className="row">
                    {this.state.searchOptions.filter((item: any) => item.row === 3).map((item: any) => (
                        <Grid item className={item.className ? item.className : ''}>
                            {this.getSearchComponent(item)}
                        </Grid>
                    )
                    )}
                </Grid>
                <Box component="div" display="inline" className="searchButton">
                    <Button
                        variant="contained"
                        color="inherit"
                        onClick={this.updateSearch}
                    >
                        Search
                            </Button>
                </Box>
            </div>
        )
    }
}

const FrxGenericSearch = connect(
    mapStateToProps,
    mapDispatchToProps
)(GenericSearch);

export default FrxGenericSearch;