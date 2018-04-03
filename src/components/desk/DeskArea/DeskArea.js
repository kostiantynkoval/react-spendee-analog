import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import NewItemsInput from '../NewItemsInput/NewItemsInput';
import IconButton from 'material-ui/IconButton';
import RemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {red900} from 'material-ui/styles/colors';
import {reorderTodoAction, reorderListAction, getItemsAction, removeListAction} from '../../../store/actions/desk';
import {showItemWindowAction,showListWindowAction,hideListWindowAction} from '../../../store/actions/itemChange';

const grid = 8;

const styles = {
    root: {
        boxSizing: 'border-box',
        padding: grid*2,
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        position: 'relative',
        overflow: 'auto'
    },
    column: {
        userSelect: 'none',
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        overflow: 'auto',
        boxSizing: 'border-box'
    },
    item: {
        userSelect: 'none',
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: 170,
        overflow: 'auto',
    },
    newList: {
        boxSizing: 'border-box',
        padding: grid*2,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        position: 'relative',
        backgroundColor: 'rgba(0, 128, 0, 0.8)'
    },
    listItems: {
        display: 'flex',
        flexFlow: 'column nowrap',
        padding: grid,
        overflow: 'auto',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    listTitle: {
        width: '100%',
        padding: `${grid * 2}px 0`,
        color: '#999',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        cursor: 'grab',
        backgroundColor: 'darkgreen',
        position: 'relative'
    },
    removeButton: {
        position: 'absolute',
        top: 2,
        right: 0
    }
}

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    ...styles.item,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
});

const getColumnStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    ...styles.column,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'green',

    // styles we need to apply on draggables
    ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'blue',
    ...styles.root,
});

const getListItemsStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    ...styles.listItems,
});

class DeskArea extends Component {
    constructor(props) {
        super(props);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.changeContent = this.changeContent.bind(this);
        this.removeList = this.removeList.bind(this);
        this.renameList = this.renameList.bind(this);
        this.state = {
            errorText: '',
            value: this.props.value
        }
    }

    componentDidMount() {
        this.props.getItemsAction();
    }

    changeContent(e, item, index) {
        this.props.showItemWindowAction({item, listIndex: index});
    }

    // All logic with items and lists handling contained here in order to not affect desk animations

    onDragEnd(result) {
        // dropped nowhere
        if (!result.destination) {
            return;
        }

        // did not move anywhere - can bail early
        if (result.source.droppableId === result.destination.droppableId &&
            result.source.index === result.destination.index) {
            return;
        }

        // reordering COLUMNS or ITEMS (Dispatching according action)
        switch (result.type) {
            case 'COLUMN':
                const listData = {
                    items: this.props.items,
                    source: result.source,
                    destination: result.destination
                };
                const [removed] = listData.items.splice(listData.source.index, 1);
                listData.items.splice(listData.destination.index, 0, removed);
                this.props.reorderListAction(listData.items);
                this.setState({items: listData.items});
                break;
            case 'ITEM':
                const todoData = {
                    items: this.props.items,
                    source: result.source,
                    destination: result.destination
                };
                const [sourceItems] = todoData.items.filter(item => item.id === todoData.source.droppableId);
                const [destinationItems] = todoData.items.filter(item => item.id === todoData.destination.droppableId);
                const [removedItem] = sourceItems.items.splice(todoData.source.index, 1);
                destinationItems.items.splice(todoData.destination.index, 0, removedItem);
                const sourceIndex = todoData.items.findIndex(item => item.id === todoData.source.droppableId);
                const destinationIndex = todoData.items.findIndex(item => item.id === todoData.destination.droppableId);
                todoData.items.splice(sourceIndex, 1, sourceItems);
                todoData.items.splice(destinationIndex, 1, destinationItems);
                this.props.reorderTodoAction(todoData.items);
                this.setState({items: todoData.items});
                break;

        }

    }

    removeList(id) {
        const newItems = this.props.items;
        const listIndex = newItems.findIndex(list => list.id === id);
        console.log('listIndex', listIndex);
        newItems.splice(listIndex, 1);
        this.props.removeListAction(newItems);
    }

    changeValue(event) {
        this.setState({[event.target.name]: event.target.value});
        if(this.state.errorText !== '' && event.target.name === 'name') {
            this.setState({errorText: ''})
        }
    }

    renameList(list) {
        this.props.showListWindowAction();
        const newItems = this.props.items;
        const listIndex = newItems.findIndex(item => item.id === list.id);
        console.log('listIndex', listIndex);

        newItems[listIndex].name = '';
        //newItems.splice(listIndex, 1);
        //this.props.removeListAction(newItems);
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                disabled={true}
                onClick={this.handleClose}
            />,
        ];
        return (
            <div>
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable" direction="horizontal" type="COLUMN">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            {...provided.droppableProps}
                        >
                            {this.props.items.map((list, index) => (
                                <Draggable key={list.id} draggableId={list.id} index={index} type="COLUMN">
                                    {(provided, snapshot) => (
                                        <div>
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getColumnStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}
                                            >
                                                <span onClick={() => this.renameList(list)} style={styles.listTitle}>{list.name}
                                                <IconButton style={styles.removeButton} onClick={() => this.removeList(list.id)}>
                                                    <RemoveCircle color={red900}/>
                                                </IconButton>
                                                    </span>


                                                <Droppable droppableId={list.id} type="ITEM">
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            style={getListItemsStyle(snapshot.isDraggingOver)}
                                                        >
                                                            {list.items.map((item, index) => (
                                                                <Draggable key={item.id} draggableId={item.id} index={index} type="ITEM">
                                                                    {(provided, snapshot) => (
                                                                        <div>
                                                                            <div
                                                                                ref={provided.innerRef}
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                                style={getItemStyle(
                                                                                    snapshot.isDragging,
                                                                                    provided.draggableProps.style
                                                                                )}
                                                                                onClick={(e)=>this.changeContent(e, item)}
                                                                            >
                                                                                <h4 style={{marginTop:0}}>{item.name}</h4>
                                                                                <p style={{margin:0}}>{item.content}</p>
                                                                            </div>
                                                                            {provided.placeholder}
                                                                        </div>
                                                                    )}
                                                                </Draggable>
                                                            ))}
                                                            <NewItemsInput listIndex={index} />
                                                            {provided.placeholder}
                                                        </div>
                                                    )}
                                                </Droppable>
                                            </div>
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            <div style={styles.newList}>
                                <NewItemsInput listIndex="COLUMN" />
                            </div>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
                <Dialog
                    title="List Title"
                    actions={actions}
                    modal={true}
                    open={this.props.isListWindowVisible}
                >
                    <TextField
                        value={this.state.value}
                        onChange={this.changeValue}
                        floatingLabelText="List Title"
                        errorText={this.state.errorText}
                    />
                </Dialog>
            </div>

        );
    }
}

const mapDispatchToProps = dispatch => ({
    getItemsAction: () => {
        dispatch(getItemsAction());
    },
    reorderTodoAction: (data) => {
        dispatch(reorderTodoAction(data));
    },
    reorderListAction: (data) => {
        dispatch(reorderListAction(data));
    },
    showItemWindowAction: (item) => {
        dispatch(showItemWindowAction(item));
    },
    removeListAction: (items) => {
        dispatch(removeListAction(items));
    },
    showListWindowAction: () => {
        dispatch(showListWindowAction());
    },
});

const mapStateToProps = state => ({
    isRequesting: state.auth.isRequesting,
    isLoggedIn: state.auth.isLoggedIn,
    items: state.desk.items,
    isListWindowVisible: state.itemChange.isListWindowVisible
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeskArea));
