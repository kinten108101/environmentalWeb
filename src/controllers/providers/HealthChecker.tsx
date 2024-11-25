import Consts from "../contexts/Consts";

const HealthChecker = function (
{	...otherProps
}:
{	children?: React.ReactNode;
}) {
	if (
		!("VITE_SERVER_BE_ADDRESS" in import.meta.env)
		|| typeof import.meta.env["VITE_SERVER_BE_ADDRESS"] !== "string"
	)
		throw new Error;

	const { VITE_SERVER_BE_ADDRESS } = import.meta.env;

	return (
		<Consts.Provider value={{
			VITE_SERVER_BE_ADDRESS
		}}>
			{otherProps.children}
		</Consts.Provider>
	);
};

export default HealthChecker;
