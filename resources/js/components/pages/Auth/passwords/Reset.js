import React, { Component } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';

class Reset extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            email: '',
            reset_token: '',
            password: '',
            password_confirmation: '',
            alert: '',
            errors: []
        }

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

        this.setState({ email: this.props.match.params.email })
    }

    handleFieldChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    hasErrorFor(field) {
        return this.state.errors[field];
    }

    renderErrorFor(field) {
        if(this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback' role='alert'>
                    <strong>{ this.state.errors[field][0] }</strong>
                </span>
            )
        }
    }

    handleSubmit(e) {

        e.preventDefault();

        this.setState({ isLoading: true });

        const { email, password, password_confirmation } = this.state;

        axios.post('/api/password/reset', {
            email: email,
            token: this.state.reset_token,
            password: password,
            password_confirmation: password_confirmation
        }, 
        { withCredentials: true })
        .then(response => {
            if(response.data.status) {
                this.setState({ isLoading: false, alert: 'success'})
                setTimeout(() => {
                    this.props.history.push(`/home`);
                }, 3000);
            } else {
                this.setState({ 
                    errors: response.data.errors,
                    isLoading: false, 
                    alert: 'error'
                })

            }

        })
        .catch(error => {
            console.log(error)
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
                                Password has been reset successfully
                            </div> 
                                : (this.state.alert == 'error') ?
                                <div className="alert alert-danger" role="alert">
                                    Unable to reset the password
                                </div> 
                                : ''
                            }

                            <div className="card">
                                <div className="card-header">Reset Password</div>
    
                                <div className="card-body">
                                    {this.state.alert == 'success' ?
                                    <div>Redirecting ...</div>
                                    :
                                    <form onSubmit={this.handleSubmit}>
        
                                        <div className="form-group row">
                                            <label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>
    
                                            <div className="col-md-6">
                                                <input id="email" type="email" className="form-control" name="email" value={this.state.email} disabled required autoComplete="email" autoFocus />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="reset_token" className="col-md-4 col-form-label text-md-right">Code</label>

                                            <div className="col-md-6">
                                                <input type="text" id="reset_token" name="reset_token" className={`form-control ${this.hasErrorFor('token') ? 'is-invalid' : ''}`} onChange={this.handleFieldChange} value={this.state.email_code} placeholder="Type in the code you received via email" required autoFocus />
                                                {this.renderErrorFor('token')}
                                            </div>
                                        </div>
    
                                        <div className="form-group row">
                                            <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>
    
                                            <div className="col-md-6">
                                                <input id="password" type="password" className={`form-control ${this.hasErrorFor('password') ? 'is-invalid' : ''}`} name="password" onChange={this.handleFieldChange} value={this.state.password} required autoComplete="new-password" />
                                                {this.renderErrorFor('password')}
                                            </div>
                                        </div>
    
                                        <div className="form-group row">
                                            <label htmlFor="password-confirm" className="col-md-4 col-form-label text-md-right">Confirm Password</label>
    
                                            <div className="col-md-6">
                                                <input id="password-confirm" type="password" className={`form-control ${this.hasErrorFor('password_confirmation') ? 'is-invalid' : ''}`} name="password_confirmation" onChange={this.handleFieldChange} value={this.state.password_confirmation} required autoComplete="new-password" />
                                                {this.renderErrorFor('password_confirmation')}
                                            </div>
                                        </div>
    
                                        <div className="form-group row mb-0">
                                            <div className="col-md-6 offset-md-4">
                                                <button type="submit" className="btn btn-primary">Reset Password</button>
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

export default Reset;
