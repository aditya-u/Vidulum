import React, {Component} from 'react';
import Footer from "./Footer";
import Logo from '../assets/images/Logo.png';
import '../styles/app_shell.css';

class AppShell extends Component {
    render() {
        return (
            <div className="center">
                
                <div className="app-shell-header bg-nano-orange bg-logo-dark" style={{paddingTop: 32}}>
                    <a href="./">
                        <img src={Logo} width={150} />
                    </a>
                </div>
                <div className="app-shell-content bg-form col s6">
                    { this.props.children }
                </div>
                <Footer/>
            </div>
        );
    }
}

export default AppShell;
