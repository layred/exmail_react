import { Link } from "react-router-dom";

import React, { Component } from 'react'

export default class NotFound extends Component {
  render() {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-auto h-auto p-8 flex flex-col">
                <h1 className="text-center text-black">Упс! Такой страницы нет.</h1>
                <button className="w-full flex-shrink-0 bg-violet-600 hover:bg-violet-400 border-violet-600 hover:border-violet-400 text-sm border-4 text-white py-1 px-2 rounded transition-colors"><Link to="/dashboard">Перейти на главную</Link></button>
            </div>
        </div>
    )
  }
}
