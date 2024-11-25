import { SocialIcon } from "react-social-icons/component";
import "react-social-icons/facebook";
import "react-social-icons/x";
import "react-social-icons/linkedin";
import "react-social-icons/youtube";
import "react-social-icons/instagram";
import "react-social-icons/google";
import "react-social-icons/pinterest";
import "react-social-icons/rss";

import backkhoa from "../../../assets/backkhoa.png";
import "./index.css";

const MSocialIcon = function (
{	url
}:
{	url: string;
}) {
	return (
		<SocialIcon
			url={url}
			bgColor="rgba(0,0,0,0)"
			fgColor="#fff"
		/>
	);
}

const Footer = function (
{	...otherProps
}:
{	style?: React.CSSProperties;
}) {
	return (
		<div
			className="mfooter"
			style={{
				display: "grid",
				grid: `
				  ".    .           .     " minmax(0,1fr)
					"logo schoolLong  social" 1em
					"logo schoolShort social" 1em
					"logo .           social"	minmax(0,1fr)
					"logo address     social" 1em
				  ".    .           .     "	minmax(0,1fr)
				/ 100px max-content minmax(0,1fr)
				`,
				...otherProps.style
			}}
		>
			<div
				style={{
					gridArea: "logo",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<img
					style={{
						width: "72px",
					}}
					src={backkhoa}
				/>
			</div>
			<div
				className="schoolLong"
				style={{
					gridArea: "schoolLong"
				}}
			>
				VIETNAM NATIONAL UNIVERSITY HO CHI MINH CITY	
			</div>
			<div
				className="schoolShort"
				style={{
					gridArea: "schoolShort"
				}}
			>
				UNIVERSITY OF TECHNOLOGY
			</div>
			<div
				className="address"
				style={{ gridArea: "address" }}
			>
				268 Ly Thuong Kiet, Ward 14, District 10, Ho Chi Minh City
			</div>
			<div
				className="social"
				style={{
					gridArea: "social",
					display: "flex",
					alignItems: "center",
					justifyContent: "end",
				}}
			>
				<MSocialIcon url="www.facebook.com" />
				<MSocialIcon url="www.x.com" />
				<MSocialIcon url="www.linkedin.com" />
				<MSocialIcon url="www.youtube.com" />
				<MSocialIcon url="www.instagram.com" />
				<MSocialIcon url="www.google.com" />
				<MSocialIcon url="www.pinterest.com" />
				<MSocialIcon url="www.rss.com" />
			</div>
		</div>
	);
};

export default Footer;
