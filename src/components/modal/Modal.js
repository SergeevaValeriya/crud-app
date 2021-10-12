import React from "react";
import "./Modal.css";

export default class Modal extends React.Component {
    state = {
        isOpen: false,
    }
    render() {
        return (
            <React.Fragment>
                <button onClick={() => this.setState({ isOpen: true })} className="modal-btn">
                    Open Modal
                </button>
                {this.state.isOpen && (<div className='modal'>
                        <div className='modal-body'>
                            <h2>Modal Title</h2>
                            <p>Modal text</p>
                            <button onClick={() => this.setState({isOpen: false})}>
                                Close
                            </button>
                        </div>
                    </div>)}

            </React.Fragment>
        )
    }
}
