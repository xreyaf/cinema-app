/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import {
	Dashboard,
	SignIn,
	SignUp,
	CssBaseline,
	useMediaQuery,
	Movie,
	BookingPage,
	MyTickets,
} from "./components";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export default function App() {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

	const theme = React.useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: prefersDarkMode ? "dark" : "light",
					primary: {
						main: "#5f5da9",
						light: "#7f7dba",
						dark: "#424176",
					},
					secondary: {
						main: "#e0f7fa",
						light: "#e6f8fb",
						dark: "#9cacaf",
					},
					error: {
						main: "#f44336",
						light: "#e57373",
						dark: "#d32f2f",
					},
					warning: {
						main: "#ff9800",
						light: "#ffb74d",
						dark: "#f57c00",
					},
					info: {
						main: "#2196f3",
						light: "#64b5f6",
						dark: "#1976d2",
					},
					success: {
						main: "#4caf50",
						light: "#81c784",
						dark: "#388e3c",
					},
				},
			}),
		[prefersDarkMode]
	);

	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const setAuth = (boolean) => {
		setIsAuthenticated(boolean);
	};

	async function isAuth() {
		try {
			const response = await fetch("/auth/is-verify", {
				method: "GET",
				headers: { token: localStorage.token },
			});

			const parseRes = await response.json();

			if (
				parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false)
			);
		} catch (err) {
			console.log(err.message);
		}
	}

	useEffect(() => {
		isAuth();
	});

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<BrowserRouter>
				<div className="container" />
				<Switch>
					<Route exact path="/">
						<Redirect to="/dashboard" />
					</Route>

					<Route
						exact
						path="/login"
						render={(props) =>
							!isAuthenticated ? (
								<SignIn {...props} setAuth={setAuth} />
							) : (
								<Redirect to="/dashboard" />
							)
						}
					/>
					<Route
						exact
						path="/register"
						render={(props) =>
							!isAuthenticated ? (
								<SignUp {...props} setAuth={setAuth} />
							) : (
								<Redirect to="/login" />
							)
						}
					/>
					<Route
						exact
						path="/dashboard"
						render={(props) =>
							isAuthenticated ? (
								<Dashboard {...props} setAuth={setAuth} />
							) : (
								<Redirect to="/login" />
							)
						}
					/>
					<Route path="/movies/:id" component={Movie} />
					<Route path="/booking/:id" component={BookingPage} />
					<Route path="/dashboard/myTickets" component={MyTickets} />
					<Route path="*" component={() => "ERROR 404 NOT FOUND"} />
				</Switch>
			</BrowserRouter>
		</ThemeProvider>
	);
}
