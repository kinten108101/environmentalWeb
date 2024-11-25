import "./index.css";

const Button = function (
{	...otherProps
}:
{	children?: React.ReactNode;
	className?: string;
}) {
	return (
		<button className={`mbutton ${otherProps.className}`}>
			{otherProps.children}
		</button>
	);
};

export default Button;
