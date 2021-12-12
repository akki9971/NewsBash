import React, { Component } from 'react'
import './Spinner.css'

export class Spinner extends Component {
    render() {
        return (
            <div className="spinning">
                <div className="spin spin1"></div>
                <div className="spin spin2"></div>
                <div className="spin spin3"></div>
                <div className="spin spin4"></div>
                <div className="spin spin5"></div>
            </div>
        )
    }
}

export default Spinner
