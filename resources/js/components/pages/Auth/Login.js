import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import axios from 'axios';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            email: '',
            password: '',
            remember: false,
            error: ''
        }

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.hasError = this.hasError.bind(this);
        this.renderError = this.renderError.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleForgotPasswordClick() {

        this.props.history.push('/email');
    }

    handleFieldChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    hasError() {
        return this.state.error;
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

        const { email, password } = this.state;

        axios.post('/api/login', {
            email: email,
            password: password
        })
        .then(response => {
            if(response.data.isLogged) {
                // this.setState({ isLoading: false })
                //Successful login
                this.props.handleSuccessfulAuth(response.data);
            } else {
                this.setState({
                    isLoading: false,
                    error: response.data.errors
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
                                <div className="card-header">Login</div>

                                <div className="card-body">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group row">
                                            <label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                                            <div className="col-md-6">
                                                <input id="email" type="email" className={`form-control ${this.hasError() ? 'is-invalid' : ''}`} name="email" onChange={this.handleFieldChange} value={this.state.email} required autoComplete="email" autoFocus />
                                                {this.renderError()}
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>

                                            <div className="col-md-6">
                                                <input id="password" type="password" className={`form-control ${this.hasError() ? 'is-invalid' : ''}`} name="password" onChange={this.handleFieldChange} value={this.state.password} required autoComplete="current-password" />
                                            </div>
                                        </div>

                                        {/* <div className="form-group row">
                                            <div className="col-md-6 offset-md-4">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" name="remember" id="remember" />
                                                    <label className="form-check-label" htmlFor="remember">Remember Me</label>
                                                </div>
                                            </div>
                                        </div> */}

                                        <div className="form-group row mb-0">
                                            <div className="col-md-8 offset-md-4">
                                                <button type="submit" className="btn btn-primary">Login</button>
                                                <a className="btn btn-link text-bleu" onClick={() => this.handleForgotPasswordClick()}>Forgot Your Password?</a>
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

export default Login; 