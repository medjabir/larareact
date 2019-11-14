import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import axios from 'axios';

import Header from './layouts/Header';
import Home from './pages/Home';
import Welcome from './pages/Welcome';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Verify from './pages/Auth/Verify';
import Reset from './pages/Auth/passwords/Reset';
import Email from './pages/Auth/passwords/Email';

import { ProtectedRoute, LoggedInRoute } from './pages/RoutingAuth';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            isAuthenticated: false,
            user: {}
        }

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

    }

    checkisLoggedStatus() {

        axios.get('/api/user')
            .then(response => {
                if (response.data && !this.state.isAuthenticated) {
                    this.setState({
                        isLoading: false,
                        isAuthenticated: true,
                        user: response.data
                    })
                } else if (!response.data && this.state.isAuthenticated) {
                    this.setState({
                        isLoading: false,
                        isAuthenticated: false,
                        user: {}
                    })
                }
            })
            .catch(error => { this.setState({ isLoading: false }); console.clear(); })

    }

    handleLogin(data) {

        this.setState({
            isLoading: false,
            isAuthenticated: true,
            user: data.user
        })
       
    }

    handleSuccessfulAuth(data) {
        this.handleLogin(data);
    }

    handleLogout() {
        
        axios.post('/logout');
        this.setState({
            isAuthenticated: false,
            user: {}
        })
    }

    handleLogoutClick() {
        
        this.setState({ isLoading: true })
        
        this.handleLogout();

        setTimeout(() => {
            this.setState({ isLoading: false });
        }, 1000)

        this.props.history.push('/');
    }

    componentDidMount() {
        
        this.checkisLoggedStatus();
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

            <div>            
                <Header isAuthenticated={this.state.isAuthenticated} userinfo={this.state.user} handleLogoutClick={this.handleLogoutClick} />

                <Switch>

                    <Route exact path='/' component={Welcome} />

                    <LoggedInRoute exact path='/login' component={Login} handleSuccessfulAuth={this.handleSuccessfulAuth} isAuthenticated={this.state.isAuthenticated} />

                    <LoggedInRoute exact path='/register' component={Register} handleSuccessfulAuth={this.handleSuccessfulAuth} isAuthenticated={this.state.isAuthenticated} />

                    <Route exact path='/verify'
                        render={props => (
                            <Verify {...props} userinfo={this.state.user} isAuthenticated={this.state.isAuthenticated} isVerified={this.state.user.email_verified_at} />
                        )}
                    />

                    <ProtectedRoute exact path='/home' component={Home} userinfo={this.state.user} isAuthenticated={this.state.isAuthenticated} isVerified={this.state.user.email_verified_at} />
                    
                    <Route exact path='/reset/:email' component={Reset} />

                    <Route exact path='/email' component={Email} />

                </Switch>
            </div>
        )
    }
}

export default withRouter(App);
