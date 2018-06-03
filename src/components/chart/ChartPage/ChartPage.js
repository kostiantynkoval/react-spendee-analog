import React from 'react';
import * as moment from 'moment';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
    container: {
        boxSizing: 'border-box',
        margin: '0 10vw',
        width: '80vw',
        height: '80vh',
        backgroundColor: '#fff',
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'flex-start'
    },
    button: {
        margin: '2em 0 1em',
    }

}

class ChartPage extends React.Component {

    constructor(props) {
        super(props);
        // if no state redirect page to '/'
        if ( !props || !props.items || props.items.length === 0 ) {
            props.history.push('/');
            return;
        }
        const items = props.items.find(item => item.id === props.match.params.id).items;
        this.state = {
            items
        };
        this.sortByDate = this.sortByDate.bind(this);
    }

    componentDidMount() {

        if (this.state && this.state.items) {
            console.log('ChartPage constr', this.state.items, this.props);
            this.sortByDate();
        }

    }

    sortByDate() {
        const sorted = this.state.items;
        sorted.sort((a,b) => {
            if (moment(a.date).isBefore(b.date)) {
                return -1;
            }
            else if (moment(b.date).isBefore(a.date)) {
                return 1;
            }
            else {
                return 0;
            }
        });
        this.setState({items: sorted});
    }

    render() {
        if (this.state && this.state.items) {
            const { isRequesting, history } = this.props;
            return (
                <div style={styles.container}>
                    { isRequesting ? <div className="fader"></div> : null }
                    <RaisedButton style={styles.button} primary={true} label={'Back'} onClick={() => history.goBack()}/>
                    <ResponsiveContainer>
                        <AreaChart data={this.state.items}
                                   margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                            <defs>
                                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Area type='monotone' dataKey='amount' stroke="#82ca9d" fillOpacity={1} fill="url(#colorAmount)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            )
        }
        else {
            return null;
        }
    }
}

const mapStateToProps = state => ({
    isRequesting: state.desk.isRequesting,
    items: state.desk.items,
});

export default withRouter(connect(mapStateToProps)(ChartPage));