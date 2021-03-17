import React, { Component } from 'react';
import {
    Icon,
} from 'react-materialize';

class instructions extends Component {
    render() {
        return (
            <div className="bg-nano-orange bg-logo-dark-2" style={{color: "white", padding: 16}}>
                <h6 className="color-gray">
                    This generator operates entirely on client side for increased security
                </h6>
                <h5>
                    <b>Follow these steps to generate your cold wallet:</b>
                </h5>
                <div className="color-gray">
                    <ol>
                        <li>*Add instructions here*</li>
                    </ol>
               </div>
                <br/>                
            </div>
        );
    }
}

export default instructions;
