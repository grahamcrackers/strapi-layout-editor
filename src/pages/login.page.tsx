import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { login } from '../services/login.service';
import { fakeAuth } from '../common/fake-auth';
import { RouteComponentProps } from 'react-router';

interface LoginPageState {
    username: string;
    password: string;
    redirectToReferrer: boolean;
}

export class LoginPage extends Component<RouteComponentProps, any> {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            redirectToReferrer: false,
        };
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };

    handleSubmit = async event => {
        event.preventDefault();
        fakeAuth.authenticate(async () => {
            await login(this.state.username, this.state.password);
            this.setState({ redirectToReferrer: true });
        });
    };

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) return <Redirect to={from} />;

        return (
            <main className="pa4 black-80">
                <form className="measure center" onSubmit={this.handleSubmit}>
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="username">
                                Email
                            </label>
                            <input
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="text"
                                name="username"
                                id="username"
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="password"
                                name="password"
                                id="password"
                                onChange={this.handleInputChange}
                            />
                        </div>
                    </fieldset>
                    <div className="">
                        <input
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Sign in"
                        />
                    </div>
                </form>
            </main>
        );
    }
}
