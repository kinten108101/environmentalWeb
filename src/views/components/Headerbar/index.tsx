import "./style.css";
import backkhoa from "../../../assets/backkhoa.png";

const Item = function (
{	href,
	...otherProps
}:
{	href: string;
	children?: React.ReactNode;
}) {
	return (
			<a
				href={href}
			>
				{otherProps.children}
			</a>
	);
};

const Headerbar = function (
{	...otherProps
}:
{	style?: React.CSSProperties;
}) {
	return (
		<nav
			style={{
				gridArea: "headerbar",
				display: "grid",
				gridTemplateRows: "minmax(0,1fr)",
				gridTemplateColumns: "48px minmax(0,1fr) max-content",
				...otherProps.style
			}}
		>
			<div
				style={{
					gridColumnStart: "1",
				}}
			>
				<a href="/">
					<img src={backkhoa}
						style={{
							position: "relative",
							top: "2px",
						}}
					/>
				</a>
			</div>
			<div
				className="shortcuts"
				style={{
					gridColumnStart: "3",
				}}
			>
				<Item href="/">Home</Item>
				<Item href="/about">About us</Item>
				<Item href="/services">Services</Item>
				<Item href="/feedback">Feedback</Item>
			</div>
		</nav>
	);
};

export default Headerbar;
