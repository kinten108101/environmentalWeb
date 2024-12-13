import "./style.css";
import backkhoa from "../../../assets/backkhoa.png";
import { useContext, useState } from "react";
import AuthContext from "../../../controllers/contexts/AuthContext";
import Popover from "@mui/material/Popover";
import useAuthenticate from "../../../controllers/hooks/useAuthenticate";

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
	const account = useContext(AuthContext);
	const { logout } = useAuthenticate();
	const [accountMenuPopover, setAccountMenuPopover] = useState(null as null | HTMLElement);

	return (
		<nav
			style={{
				gridArea: "headerbar",
				display: "grid",
				gridTemplateRows: "minmax(0,1fr)",
				gridTemplateColumns: "48px minmax(0,1fr) max-content max-content",
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
				id="logo-title"
				style={{
					gridColumnStart: "2"
				}}
			>
				<a href="/">
					BK Environmental Web
				</a>
			</div>
			<div
				className="shortcuts"
				style={{
					gridColumnStart: "3",
				}}
			>
				<Item href="/">Home</Item>
				{/* <Item href="/services">Services</Item> */}
				<Item href="/about">About us</Item>
			</div>
			<div
				className="avatar"
				style={{
					gridColumnStart: 4,
				}}
			>
			{(() => {
			switch (account) {
			case null: return (
				<a href="/sign-in"><button>Log in</button></a>
			)
			case undefined: return null;
			default: return (
				<>
					<button id="account" onClick={e => setAccountMenuPopover(e.currentTarget)}></button>
					<Popover
						anchorEl={accountMenuPopover}
						open={accountMenuPopover !== null}
						onClose={() => setAccountMenuPopover(null)}
					>
						<button onClick={() => {setAccountMenuPopover(null); logout();}}>Log out</button>
					</Popover>
				</>
			)
			}
			})()}
			</div>
		</nav>
	);
};

export default Headerbar;
