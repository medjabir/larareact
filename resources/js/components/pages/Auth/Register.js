import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import axios from 'axios';

class Register extends Component {

    constructor() {
        super();
    
        this.state = {
            isLoading: false,
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors: []
        }

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this .renderErrorFor.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleFieldChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
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
        };
    }

    handleSubmit(e) {
        
        e.preventDefault();

        this.setState({ isLoading: true })

        const { name, email, password, password_confirmation } = this.state;

        axios.post('/api/register', {
            name: name,
            email: email,
            password: password,
            password_confirmation : password_confirmation

        }, {
            withCredentials: true
        })
        .then(response => {
            if(response.data.isRegistered) {
                //Successful login
                this.props.handleSuccessfulAuth(response.data);
            } else {
                this.setState({
                    isLoading: false,
                    errors: response.data.errors
                })
            }
        })
        .catch(error => console.log(error))

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
                            <div className="card">
                                <div className="card-header">Register</div>

                                <div className="card-body">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group row">
                                            <label htmlFor="name" className="col-md-4 col-form-label text-md-right">Name</label>

                                            <div className="col-md-6">
                                                <input id="name" type="text" className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`} name="name" value={this.state.name} onChange={this.handleFieldChange} autoComplete="name" autoFocus />
                                                {this.renderErrorFor('name')}
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                                            <div className="col-md-6">
                                                <input id="email" type="email" className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`} name="email" value={this.state.email} onChange={this.handleFieldChange} required autoComplete="email" />
                                                {this.renderErrorFor('email')}
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>

                                            <div className="col-md-6">
                                                <input id="password" type="password" className={`form-control ${this.hasErrorFor('password') ? 'is-invalid' : ''}`} name="password" value={this.state.password} onChange={this.handleFieldChange} required autoComplete="new-password" />
                                                {this.renderErrorFor('password')}
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="password-confirm" className="col-md-4 col-form-label text-md-right">Confirm Password</label>

                                            <div className="col-md-6">
                                                <input id="password-confirm" type="password" className={`form-control ${this.hasErrorFor('password_confirmation') ? 'is-invalid' : ''}`} name="password_confirmation" value={this.state.password_confirmation} onChange={this.handleFieldChange} required autoComplete="new-password" />
                                                {this.renderErrorFor('password_confirmation')}
                                            </div>
                                        </div>

                                        <div className="form-group row mb-0">
                                            <div className="col-md-6 offset-md-4">
                                                <button type="submit" className="btn btn-primary">Register</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </main>
        )
    }
}

export default Register;
