import { Routes, Route, BrowserRouter } from "react-router-dom";
import layerElements from "react-nice-patterns/src/layerElements";

import FakeAuth from "./controllers/providers/FakeAuth";
import About from "./views/pages/About";
import SignIn from "./views/pages/SignIn";
import Home from "./views/pages/Home";
import ConfirmSignIn from "./views/pages/ConfirmSignIn";
import ProcessRoute from "./routes/ProcessRoute";
import DatabaseLocation from "./views/pages/DatabaseLocation";
import HealthChecker from "./controllers/providers/HealthChecker";
import Loading from "./views/pages/Loading";
import RequireAuth from "./controllers/providers/RequireAuth";
import DatabaseInfoCache from "./controllers/providers/DatabaseInfoCache";

const AppRoutes = function () {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/about" element={<About />} />
			<Route path="/sign-in" element={<SignIn />} />
			<Route path="/login" element={<ConfirmSignIn />}/>
			<Route path="/process/:sessionId" element={
				<RequireAuth fallbackPath="/login">
					<ProcessRoute />
				</RequireAuth>
			} />
			<Route path="/database" element={
				<RequireAuth fallbackPath="/login">
					<DatabaseLocation />
				</RequireAuth>
			}/>
			<Route path="/loading" element={<Loading/>}/>
		</Routes>
	);
};

const App = () => layerElements([
	x => <HealthChecker>{x}</HealthChecker>,
	x => <FakeAuth>{x}</FakeAuth>,
	x => <DatabaseInfoCache>{x}</DatabaseInfoCache>,
	x => <BrowserRouter>{x}</BrowserRouter>,
	_ => <AppRoutes />
]);

export default App
