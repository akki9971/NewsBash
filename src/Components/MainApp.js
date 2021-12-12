import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import NavBar from './NavBar';
import NewsComponent from './NewsComponent';
import { MenuList } from '../Constants'

export class MainApp extends Component {
    render() {
        return (
            <Router>
                <NavBar />
                <Routes>
                    {
                     MenuList.map((Menu)=>{
                         return <Route path={`/${Menu==='general'?'':Menu}`} element={<NewsComponent key={Menu} category={Menu}/>} />

                        })  

                    }
                </Routes>
            </Router>
        )
    }
}

export default MainApp;
