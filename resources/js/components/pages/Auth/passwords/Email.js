import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import axios from 'axios';

class Email extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            email: '',
            error: '',
            alert: ''
        }

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.hasError = this.hasError.bind(this);
        this.renderError = this.renderError.bind(this);
    }

    handleFieldChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    hasError() {
        return this.state.error
    }

    renderError() {
        if(this.hasError()) {
            return (
                <span className='invalid-feedback' role='alert'>
                    <strong>{ this.state.error }</strong>
                </span>
            )
        }
    }

    handleSubmit(e) {

        e.preventDefault();
        
        this.setState({ isLoading: true });

        axios.post('/api/password/email', { 
            email: this.state.email
         })
         .then(response => {
             if(response.data.status) {
                this.setState({ isLoading: false, alert: 'success' })
                setTimeout(() => {
                    this.props.history.push(`/reset/${this.state.email}`);
                }, 3000);
             } else {
                this.setState({ isLoading: false, alert: 'error' })
             }
         })
         .catch(error => {
            this.setState({ isLoading: false, alert: 'error' })
         })
         
    }


    render() {

        if (this.state.isLoading) {
            return (
                <div style={{ top:'50%', left:'50%', marginTop:'-50px', marginLeft:'-50px' }} className="position-absolute">
                    <Loader
                        type="TailSpin"
                        color="#000000"
                        height={100}
                        width={100}
                    />
                </div> 
            )
        }

        return (

            <main className="py-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">

                            { this.state.alert == 'success' ? 
                            <div className="alert alert-success" role="alert">
                            Reset details sent to your email.</div> 
                                : (this.state.alert == 'error') ?
                                <div className="alert alert-danger" role="alert">
                                Unable to send reset link.</div> 
                                : ''
                            }

                            <div className="card">
                                <div className="card-header">Reset Password</div>
    
                                <div className="card-body">
                                    { this.state.alert == 'success' ?
                                    <div>Redirecting ...</div>
                                    :
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group row">
                                            <label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>
    
                                            <div className="col-md-6">
                                                <input id="email" type="email" className={`form-control ${this.hasError() ? 'is-invalid' : ''}`} name="email" onChange={this.handleFieldChange} required autoComplete="email" autoFocus />
                                                {this.renderError()}
                                            </div>
                                        </div>
    
                                        <div className="form-group row mb-0">
                                            <div className="col-md-6 offset-md-4">
                                                <button type="submit" className="btn btn-primary">Send Password Reset Link</button>
                                            </div>
                                        </div>
                                    </form>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )

    }
}

export default Email;
