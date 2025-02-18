import React, { useState } from "react";
import { navigate } from "gatsby";
import "../scss/cumsom-login.scss";
import Seo from "../components/seo"

export const AuthPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const storedUsername = process.env.BASIC_AUTH_ID || 'user'; // ダミーのユーザー名
        const storedPassword = process.env.BASIC_AUTH_PASS || 'pass'; // ダミーのパスワード
        if (username === storedUsername && password === storedPassword) {
            localStorage.setItem("authenticated", "true");
            navigate('/');
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="p-custom-login-page">
            <section>

                <h2>Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <p>

                        <label>
                            Username:
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </label>
                    </p>
                    <p>
                        <label>
                            Password:
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                    </p>
                    <p><button type="submit">Login</button></p>
                </form>
            </section>
        </div>
    );
};

export default AuthPage

export const Head = ({ data, location }) => {
    const list = [
        {
            name: '',
            path: '/404/',
            type: `WebPage`
        }
    ]
    return <Seo
        location={location.pathname}
        data={{
            title: 'ログインページ',
            description: 'ログイン',
            is404: true
        }}
    />
}
