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

const AppRoutes = function () {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/about" element={<About />} />
			<Route path="/sign-in" element={<SignIn />} />
			<Route path="/login" element={<ConfirmSignIn />}/>
			<Route path="/process/:sessionId" element={<ProcessRoute />} />
			<Route path="/database" element={<DatabaseLocation />}/>
			<Route path="/loading" element={<Loading/>}/>
		</Routes>
	);
};

const App = () => layerElements([
	x => <HealthChecker>{x}</HealthChecker>,
	x => <FakeAuth>{x}</FakeAuth>,
	x => <BrowserRouter>{x}</BrowserRouter>,
	() => <AppRoutes />
]);

export default App
