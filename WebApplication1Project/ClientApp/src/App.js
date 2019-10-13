import React, { Component } from 'react';
import { FetchTollFeeData } from './components/FetchTollFeeData';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <FetchTollFeeData />
        );
    }
}
