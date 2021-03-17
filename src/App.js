import React, {Component} from 'react';
import WalletGen from "./components/WalletGen";
import './styles/app.css';
import instructions from "./components/Instructions";
import AppShell from "./components/AppShell";

class App extends Component {
    render() {
        return (
            <AppShell>
                <instructions/>
                <WalletGen/>
                <br/>
            </AppShell>
        );
    }
}

export default App;
