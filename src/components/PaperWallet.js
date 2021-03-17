import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { QRCode } from 'react-qr-svg';
import '../styles/paper_wallet.css';
import TemplatePrint from 'react-print';
import { connect } from 'react-redux';

class PaperWallet extends Component {
    renderPaperWallet() {
        return (
            <div className="paper-wallet">
                <img src={ this.props.art.art }
                     width={ this.props.art.size.width }
                     height={ this.props.art.size.height }
                />

                <div className="public-key-code" style={{
                    width: this.props.art.public_key.width,
                    height: this.props.art.public_key.height,
                    left: this.props.art.public_key.left,
                    bottom: this.props.art.public_key.bottom,
                    color: this.props.art.public_key.color,
                    fontSize: this.props.art.public_key.fontSize,
                    lineHeight: this.props.art.public_key.lineHeight,
                }}> 
                    Public Key:<br/>
                    {this.props.publicAddress}                
                </div>
                <div className="public-key-qr-code" style={{
                    width: this.props.art.public_key_qr.width,
                    height: this.props.art.public_key_qr.height,
                    left: this.props.art.public_key_qr.left,
                    bottom: this.props.art.public_key_qr.bottom,
                }}>
                    <QRCode
                        bgColor="#FFFFFF"
                        fgColor="#000000"
                        level="Q"
                        value={ this.props.publicAddress }
                    />
                </div>
                <div className="private-qr-code" style={{
                    width: this.props.art.private_key_qr.width,
                    height: this.props.art.private_key_qr.height,
                    left: this.props.art.private_key_qr.left,
                    bottom: this.props.art.private_key_qr.bottom,
                }}>
                    <QRCode
                        bgColor="#FFFFFF"
                        fgColor="#000000"
                        level="Q"
                        value={ this.props.secretKey }
                    />
                </div>
                <div className="private-code" style={{
                    width: this.props.art.private_key.width,
                    height: this.props.art.private_key.height,
                    left: this.props.art.private_key.left,
                    bottom: this.props.art.private_key.bottom,
                    color: this.props.art.private_key.color,
                    fontSize: this.props.art.private_key.fontSize,
                    lineHeight: this.props.art.private_key.lineHeight,
                }}>
                    Private Key:<br/>
                    { this.props.secretKey }
                     <br/>
                     <br/>
                     <br/>
                        <div className="responsive-text">
                            Seed:<br/>
                            { this.props.seed }
                        </div>
                </div>
                <div className="infos" style={{
                    width: this.props.art.infos.width,
                    height: this.props.art.infos.height,
                    left: this.props.art.infos.left,
                    bottom: this.props.art.infos.bottom,
                }}>
                    <div>
                        <b>Paper Wallet Instructions:</b>
                    </div>
                    <div className="left-align" style={{fontSize: 11}}>
                        <div>- Fold the Left flap and fold the right flap over it and glue along the line</div>
                        <div>- Keep your private key and seed secret</div>
                        <div>- Sync the paper wallet with the desktop wallet application</div>
                        <br/>
                        <br/>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        ReactDOM.render(
            <TemplatePrint>
                { this.renderPaperWallet() }
            </TemplatePrint>,
            document.getElementById('print-mount')
        );
        return this.renderPaperWallet();
    }
}

export default PaperWallet;
