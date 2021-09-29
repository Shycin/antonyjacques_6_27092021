import React , { Component } from 'react'
import Header from './Header'
import ListTags from '../components/ListTags'


export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: "default",
        };
    }

    onChange(field, value) {
        // parent class change handler is always called with field name and value
        this.setState({[field]: value});
    }

    render() {
        return <>
            <Header>
                <ListTags selected={this.state.selected} onChange={this.onChange.bind(this)} parameter={{'FirstLetter': true, 'test' : false}} />
            </Header>
            
            <ListTags selected={this.state.selected} onChange={this.onChange.bind(this)} tags={['test1','test2','test3','sports']} />
            <h2>Home</h2> 
            {this.state.selected}
        </>
    }
}