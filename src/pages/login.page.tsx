import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { login } from '../services/login.service';
import { fakeAuth } from '../common/fake-auth';
import { RouteComponentProps } from 'react-router';
import { Page } from '../ui/page';

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
        console.log(this.state);
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
        const { from } = this.props.location.state || { from: { pathname: '/dashboard' } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) return <Redirect to={from} />;

        return (
            <Page className="flex bg-indigo-200 h-full justify-center items-center">
                {/* <div className="text-gray-700 text-center bg-indigo-400 px-4 py-2 m-2">1</div>
                <div className="text-gray-700 text-center bg-indigo-400 px-4 py-2 m-2">2</div>
                <div className="text-gray-700 text-center bg-indigo-400 px-4 py-2 m-2">3</div> */}

                <div className="w-full max-w-xs">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={this.handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="username"
                                id="username"
                                type="text"
                                placeholder="Username"
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                name="password"
                                id="password"
                                type="password"
                                placeholder="******************"
                                onChange={this.handleInputChange}
                            />
                            <p className="text-red-500 text-xs italic">Please choose a password.</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Sign In
                            </button>
                            {/* <a
                                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                                href="#"
                            >
                                Forgot Password?
                            </a> */}
                        </div>
                    </form>
                </div>
            </Page>
        );
    }
}
