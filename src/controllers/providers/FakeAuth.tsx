import AuthContext from "../contexts/AuthContext";

const FakeAuth = function (
{	...otherProps
}:
{	children?: React.ReactNode;
}) {
	return (
		<AuthContext.Provider value={{}}>
			{otherProps.children}
		</AuthContext.Provider>
	);
};

export default FakeAuth;
