import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import AddCircle from 'material-ui/svg-icons/content/add-circle';
import {addTodoAction} from '../../../store/actions/desk';

const styles = {
    form: {
        position: 'relative',
        width: '100%'
    },
    input: {
        marginTop: 0,
        paddingTop: 23
    },
    iconButton: {
        position: 'absolute',
        top: 0,
        right: 0,
    }
}


class NewItemsInput extends React.Component {
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
        this.state = {
            items: this.props.items
        }
    }

    submitForm(e) {
        e.preventDefault();
        console.log(e, this.props.listIndex);
        if(this.props.listIndex!=='COLUMN') {
            // TODO dispatch add new TODO item
            const itemsArr = this.props.items;
            const newItem = {id: new Date(), name: e.currentTarget[0].value, content: e.currentTarget[0].value}
            itemsArr[this.props.listIndex].items.push(newItem);
            this.props.addTodoAction(itemsArr);
           // this.props.addTodoAction(itemsArr);


        } else {
            //this.props.addListAction(e.currentTarget[0].value)
        }
    }

    render() {
        return (
            <form onSubmit={(e) => this.submitForm(e)} style={styles.form}>
                <TextField
                    inputStyle={styles.input}
                    hintText={this.props.listIndex==='COLUMN' ? "Enter list name" : "Enter TODO name"}
                    floatingLabelText={this.props.listIndex==='COLUMN' ? "Add new list" : "Add new TODO"}
                    fullWidth={true}
                />
                <IconButton type="submit" style={styles.iconButton}>
                    <AddCircle />
                </IconButton>
            </form>
        )
    }

}

const mapDispatchToProps = dispatch => ({
    addTodoAction: (data) => {
        dispatch(addTodoAction(data));
    },
});

const mapStateToProps = state => ({
    items: state.desk.items,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewItemsInput));