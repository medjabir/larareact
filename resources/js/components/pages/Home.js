import React, { Component } from 'react'

class Home extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <main className="py-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">Home (Only verified users will see this)</div>

                                <div className="card-body">
                                    Welcome back {this.props.userinfo.name}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}


export default Home;