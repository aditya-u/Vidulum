import React, {Component} from 'react';
import {
    Button,
    Icon,
    Row,
    Col,
} from 'react-materialize';
import {
    Field,
    reduxForm,
    change,
    getFormValues,
} from 'redux-form';
import {connect} from 'react-redux';
import PaperWallet from "./PaperWallet";
import BlocksGen from '../Utils/BlocksGen';
import InputField from '../Utils/Field';
import * as nanocurrency from 'nanocurrency';

class WalletGen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seed: null,
            index: null,
            secret_key: null,
            public_key: null,
            address: null,
            art: 'nanoDarkBlue',
        };
    }

    componentWillMount () {
        this.props.initialize({
            index: 0
        });
    }


    renderPaperWallet() {
        return (
            <div className="center-align">
                <PaperWallet
                    seed={this.state.seed}
                    secretKey={this.state.secret_key}
                    publicAddress={this.state.address}
                    index={this.state.index}
                    art={this.props.arts[this.state.art]}
                />
                <br/>
                <div>
                    <img
                        src={this.props.arts["nanoDarkBlue"].art} width={100}
                        onClick={() => this.setState({art: "nanoDarkBlue"})}
                        className={this.state.art === "nanoDarkBlue" ? "artSelected" : "artNotSelected"}
                    />
                </div>
                <br/>
                <div>
                    <Button waves='dark' className="lime" onClick={() => window.print()}>
                        Print your paper wallet
                    </Button>
                </div>
            </div>
        );
    }

    onSubmit(values) {
        let blocksGen = new BlocksGen();
        if (!blocksGen._isValidSeed(values.seed)) {
            alert("Invalid Seed");
            return null;
        }
        this.setState({
            seed: values.seed.toUpperCase(),
            index: values.index,
            secret_key: values.secret_key,
            public_key: null,
            address: values.address,
        });
    }

    generateWallet = (seed, index) => {
        let blocksGen = new BlocksGen();
        if (nanocurrency.checkSeed(seed) && blocksGen._isValidIndexAccount(index)) {
            const secret_key = nanocurrency.deriveSecretKey(seed, index);
            const public_key = nanocurrency.derivePublicKey(secret_key);
            const address = nanocurrency.deriveAddress(public_key);
            return {
                seed: seed,
                index: index,
                secret_key: secret_key,
                public_key: public_key,
                address: address,
            };
        }
        return null;
    };

    updateForm = (wallet) => {
        if (wallet) {
            this.props.changeFieldValue('seed', wallet.seed);
            this.props.changeFieldValue('index', wallet.index);
            this.props.changeFieldValue('secret_key', wallet.secret_key);
            this.props.changeFieldValue('address', wallet.address);
        }
    };

    isAccountAddressFromSeed(seed, index, address) {
        const wallet = this.generateWallet(seed, index);
        if (wallet) {
            return wallet.address === address;
        }
        return false;
    }

    isSecretKeyFromSeed(seed, index, secret_key) {
        const wallet = this.generateWallet(seed, index);
        if (wallet) {
            return wallet.secret_key === secret_key;
        }
        return false;
    }

    maxIndexAccount = 15;
    required = value => (value ? undefined : 'Required');
    length64 = value => (value && value.length === 64 ? undefined : 'Seed must have exactly 64 characters');
    hexadecimal = value => (new BlocksGen()._isHexadecimal(value) ? undefined : 'Only hexadecimal characters');
    validAccountAddressFromSeed = (value, allValues) => this.isAccountAddressFromSeed(allValues.seed, parseInt(allValues.index), value) ? undefined : 'Not compatible with seed';
    validPrivateKeyFromSeed = (value, allValues) => this.isSecretKeyFromSeed(allValues.seed, parseInt(allValues.index), value) ? undefined : 'Not compatible with seed';
    isValidIndexAccountRange = value => (value >= 0 && value <= this.maxIndexAccount ? undefined : 0 + ' - ' + this.maxIndexAccount);
    isNumeric = value => (/^[0-9]{1,}$/i.test(value)) ? undefined : 'This is not a number';
    isValidKey = value => nanocurrency.checkKey(value) ? undefined : 'This is not a valid key';
    isValidAddress = value => nanocurrency.checkAddress(value) ? undefined : 'This is not a valid account address';

    renderInputForm() {
        const placeholder_seed = "0000000000000000000000000000000000000000000000000000000000000000";
        const placeholder_wallet = this.generateWallet(placeholder_seed, 0);

        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
                    <label>
                        Public and Private key are generated based on 64 character seed which can be entered manually or randomly generated
                    </label>
                    <br/>
                    <br/>
                    <Row>
                        <Field
                            name="seed"
                            type="text"
                            s={12}
                            m ={10}
                            label="Seed"
                            placeholder={placeholder_wallet.seed}
                            validate={[this.required, this.hexadecimal, this.length64]}
                            component={InputField}
                            onChange={(event) => {
                                const seed = event.target.value;
                                const index = this.props.formStates ? parseInt(this.props.formStates.index) : undefined;
                                const wallet = this.generateWallet(seed, index);
                                this.updateForm(wallet);
                            }}
                            style={{textTransform: "uppercase"}}                        
                        />
                        <div>
                        <Button waves='dark' className="cyan" onClick={(event) => {
                            const seed = new BlocksGen().generateSeed();
                            const index = this.props.formStates ? parseInt(this.props.formStates.index) : undefined;
                            const wallet = this.generateWallet(seed, index);
                            this.updateForm(wallet);
                            event.preventDefault();
                        }}>
                           Generate a <b>random seed</b>
                        </Button>
                    </div>
                      <br/>
                      <br/>
                      <br/>
                    </Row>
                    <Row>
                        <Field
                            name="secret_key"
                            type="text"
                            s={12}
                            label="Private Key"
                            placeholder={placeholder_wallet.secret_key}
                            validate={[this.required, this.isValidKey, this.validPrivateKeyFromSeed]}
                            component={InputField}
                        />
                      <br/>
                      <br/>
                      <br/>
                      <br/>
                      <br/>
                    </Row>
                    <Row>
                        <Field
                            name="address"
                            type="text"
                            s={12}
                            label="Public Key"
                            placeholder={placeholder_wallet.address}
                            validate={[this.required, this.isValidAddress, this.validAccountAddressFromSeed]}
                            component={InputField}
                        />
                      <br/>
                      <br/>
                      <br/>
                      <br/>
                    </Row>
                    <br/>
                    <div>
                        <Button waves='dark' className="purple">
                            Generate your <b>paper wallet</b>
                        </Button>
                    </div>
                </form>
            </div>
        );
    }

    renderWalletGen() {
        if (this.state.seed && this.state.index!==null && this.state.secret_key && this.state.address) {
            return this.renderPaperWallet();
        } else {
            return this.renderInputForm();
        }
    }

    render() {
        return (
            <div style={{padding: 16}}>
                {this.renderWalletGen()}
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        arts: state.arts,
        formStates: getFormValues('WalletGen')(state),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeFieldValue: function (field, value) {
            dispatch(change('WalletGen', field, value));
        },
    }
}

export default reduxForm({
    form: 'WalletGen'
})(
    connect(mapStateToProps, mapDispatchToProps)(WalletGen)
);
