import React, { useState } from 'react';
import { login } from '../../services/login.service';
import { useAuthentication } from '../../common/hooks/useAuthentication';

interface FormValues {
    username?: string;
    password?: string;
}

export const LoginForm = () => {
    const [values, setValues] = useState<FormValues>({});
    const [errors, setErrors] = useState<FormValues>({});
    const { onLogin } = useAuthentication();

    const handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = async event => {
        event.preventDefault();
        const { username, password } = values;
        if (!username) {
            setErrors({ ...errors, username: 'Please enter a username' });
        }

        if (!password) {
            setErrors({ ...errors, password: 'Please enter a password' });
        }

        try {
            if (username && password) {
                const response = await login(username, password);
                onLogin(response.data.jwt);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={e => handleSubmit(e)}>
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
                    onChange={e => handleInputChange(e)}
                />
                {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Password"
                    onChange={e => handleInputChange(e)}
                />
                {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
            </div>
            <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Sign In
                </button>
            </div>
        </form>
    );
};
