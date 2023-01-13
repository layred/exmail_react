import React, { Component } from 'react'

export class Shipments extends Component {
    constructor(props) {
        super(props);
        this.title = 'Отправления';
    }

    componentDidMount() {
        document.title = this.title;
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <></>
        )
    }
}

export default Shipments