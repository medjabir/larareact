import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import axios from 'axios';

class Verify extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            // token: localStorage.getItem('userToken'),
            alert: false
        }
        
    }

    handleResendEmailVerification() {

        this.setState({ isLoading: true })
        axios.get('/api/email/resend')
        .then(response => {
            if(response.data.resent) {
                this.setState({
                    isLoading: false,
                    alert: true
                })
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {

        const { isAuthenticated, isVerified } = this.props;

        if(!isAuthenticated || isVerified) {
            this.props.history.push('/');
        }
        
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

                            { this.state.alert ? 
                            <div className="alert alert-success" role="alert">
                            A fresh verification link has been sent to your email address.</div> 
                            : ''}

                            <div className="card">
                                <div className="card-header">Verify Your Email Address : </div>

                                <div className="card-body">

                                    Before proceeding, please check your email for a verification link.
                                    If you did not receive the email,
                                    <button className="btn btn-link p-0 m-0 align-baseline" onClick={() => this.handleResendEmailVerification()}>click here to request another</button>.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
                       
        )
    }
}

export default Verify;
