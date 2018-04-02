import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TextField from 'material-ui/TextField';
import NewItemsInput from '../NewItemsInput/NewItemsInput';
import {reorderTodoAction, reorderListAction} from '../../../store/actions/desk';

const grid = 8;

const styles = {
    column: {
        userSelect: 'none',
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        minWidth: 160,
        overflow: 'auto',
        boxSizing: 'border-box'
    },
    item: {
        userSelect: 'none',
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        minWidth: 160,
        overflow: 'auto',
    },
    list: {
        boxSizing: 'border-box',
        padding: grid*2,
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        position: 'relative'
    },
    listItems: {
        display: 'flex',
        flexFlow: 'column nowrap',
        padding: grid,
        overflow: 'auto',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    listTitle : {
        width: '100%',
        padding: `${grid * 2}px 0`,
        color: '#999',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        cursor: 'grab',
        backgroundColor: 'darkgreen'
    },
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
    ...styles.list,
});

const getListItemsStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    ...styles.listItems,
});

class DeskArea extends Component {
    constructor(props) {
        super(props);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.state = {
            items: [
                {
                    name: 'List1',
                    id: 'list1',
                    items: [
                        {id: 'item-0', content: 'item 0'}, {id: 'item-1', content: 'item 1'}, {id: 'item-2', content: 'item 2'}, {id: 'item-3', content: 'item 3'},{id: 'item-4', content: 'item 4'}, {id: 'item-5', content: 'item 5'}, {id: 'item-6', content: 'item 6'}, {id: 'item-7', content: 'item 7'},{id: 'item-8', content: 'item 8'}, {id: 'item-9', content: 'item 9'}, {id: 'item-10', content: 'item 10'}, {id: 'item-11', content: 'item 11'}
                    ]
                },
                    {
                        name: 'List2',
                        id: 'list2',
                        items: [
                            {id: 'item-15', content: 'item 15'}, {id: 'item-16', content: 'item 16'}, {id: 'item-12', content: 'item 12'}, {id: 'item-13', content: 'item 13'},{id: 'item-14', content: 'item 14'}
                        ]
                    },
                    {
                        name: 'List3',
                        id: 'list3',
                        items: [
                            {id: 'item-20', content: 'item 20'}, {id: 'item-21', content: 'item 21'}, {id: 'item-22', content: 'item 22'}, {id: 'item-23', content: 'item 23'},{id: 'item-24', content: 'item 24'}, {id: 'item-25', content: 'item 25'}, {id: 'item-26', content: 'item 26'}
                        ]
                    }
                ]
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps', nextProps);
    }

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
                    items: this.state.items,
                    source: result.source,
                    destination: result.destination
                };
                const [removed] = listData.items.splice(listData.source.index, 1);
                listData.items.splice(listData.destination.index, 0, removed);
                this.props.reorderListAction(listData.items);
                //this.setState({items: listData.items});
                break;
            case 'ITEM':
                const todoData = {
                    items: this.state.items,
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
                //this.setState({items: todoData.items});
                break;

        }

    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        console.log('state', this.state);
        console.log('props', this.props);
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable" direction="horizontal" type="COLUMN">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            {...provided.droppableProps}
                        >
                            {this.state.items.map((list, index) => (
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
                                                <span style={styles.listTitle}>{list.name}</span>


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
                                                                            >
                                                                                <TextField
                                                                                    hintText="MultiLine with rows: 2 and rowsMax: 4"
                                                                                    multiLine={true}
                                                                                    rows={2}
                                                                                    rowsMax={4}
                                                                                    value={item.content}
                                                                                />
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
                            <div style={styles.list}>
                                <NewItemsInput listIndex="COLUMN" />
                            </div>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    reorderTodoAction: (data) => {
        dispatch(reorderTodoAction(data));
    },
    reorderListAction: (data) => {
        dispatch(reorderListAction(data));
    }
});

const mapStateToProps = state => ({
    isRequesting: state.auth.isRequesting,
    isLoggedIn: state.auth.isLoggedIn,
    items: state.desk.items,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeskArea));
