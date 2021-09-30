import React , { Component } from 'react'
import Header from './Header'
import ListTags from '../components/ListTags'
import ListCards from '../components/ListCards'


import '../css/reset.scss';


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
                <ListTags selected={this.state.selected} onChange={this.onChange.bind(this)} parameter={{'FirstLetter': true}} />
                <h1>Nos photographes</h1>
            </Header>

            <main>
                <ListCards selected={this.state.selected} onChange={this.onChange.bind(this)}></ListCards>
            </main>
        </>
    }
}