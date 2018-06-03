import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as moment from 'moment';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import AddCircle from 'material-ui/svg-icons/content/add-circle';
import {addTodoAction, addListAction} from '../../../store/actions/desk';
import {green500} from 'material-ui/styles/colors';

const styles = {
    form: {
        position: 'relative',
        width: '100%'
    },
    input: {
        marginTop: 0,
        paddingTop: 23,
        minWidth: 200
    },
    iconButton: {
        position: 'absolute',
        top: 0,
        right: -7,
    }
}


class NewItemsInput extends React.Component {
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
        this.state = {
            errorText: ''
        }
    }

    submitForm(e) {
        e.preventDefault();

        const now = moment().format('YYYY-MM-DD[T]HH:mm');
        const rndID = moment().valueOf().toString();

        // Return error if empty
        if(e.currentTarget[0].value === '') {this.setState({errorText: 'This field is required'}); return false}
        if(this.props.listIndex!=='COLUMN') {
            const itemsArr = this.props.items;
            const newItem = {id: rndID, name: e.currentTarget[0].value, content: '', date: now, amount: 0}
            itemsArr[this.props.listIndex].items.push(newItem);
            this.props.addTodoAction(itemsArr);
            e.currentTarget.reset();
        } else {
            const newList = this.props.items.concat({name: e.currentTarget[0].value, id: rndID, items: []})
            this.props.addListAction(newList);
            e.currentTarget.reset();
        }
    }

    render() {
        return (
            <form onSubmit={(e) => this.submitForm(e)} style={styles.form}>
                <TextField
                    inputStyle={styles.input}
                    hintText={this.props.listIndex==='COLUMN' ? "Enter category name" : "Enter item name"}
                    floatingLabelText={this.props.listIndex==='COLUMN' ? "Add new category" : "Add new item"}
                    errorText={this.state.errorText}
                    errorStyle={{bottom: 5}}
                    fullWidth={true}
                    onChange={() => this.setState({errorText: ''})}
                />
                <IconButton type="submit" style={styles.iconButton}>
                    <AddCircle color={green500} />
                </IconButton>
            </form>
        )
    }

}

const mapDispatchToProps = dispatch => ({
    addTodoAction: (data) => {
        dispatch(addTodoAction(data));
    },
    addListAction: (data) => {
        dispatch(addListAction(data));
    },
});

const mapStateToProps = state => ({
    items: state.desk.items,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewItemsInput));