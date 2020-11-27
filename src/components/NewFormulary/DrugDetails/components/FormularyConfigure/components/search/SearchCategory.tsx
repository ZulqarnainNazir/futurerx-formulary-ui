
import React from 'react'
import Grid from "@material-ui/core/Grid";
import { List, ListItem, ListItemText } from "@material-ui/core";

export default class SearchCategory extends React.Component<any,any>{
    render(){
        return (
            
                <List>
                    {this.props.categoriesData.map((item: any, i: number) => {
                        return (
                            <ListItem
                                key={item.id}
                                className='member-notes-popup-root__category-list__item'
                                onClick={(e) => this.props.handleListItemClick(e, item)}>
                                <ListItemText
                                    key={item.id}
                                    className='member-notes-popup-root__category-list__item__text'
                                >
                                    {item.category}
                                </ListItemText>
                            </ListItem>
                        );
                    })}
                </List>
        )
    }
}