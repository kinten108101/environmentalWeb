import Button from "../../components/Button";
import Headerbar from "../../components/Headerbar";
import Footer from "../../components/Footer";
import CommonFrame from "../../components/CommonFrame";
import bulb from "../../../assets/bulb.png";

const Home = function () {
	return (
		<CommonFrame>
			<Headerbar
				style={{
					gridArea: "headerbar",
				}}
			/>
			<div 
				style={{
					display: "flex",
					alignItems: "center",
					paddingLeft: "48px",
					background: `url(${bulb}) no-repeat`,
					WebkitBackgroundSize: "cover",
					MozBackgroundSize: "cover",
					OBackgroundSize: "cover",
					backgroundSize: "cover"
				}}
			>
				<Button className="pill"><a href="./database">Start now</a></Button>
			</div>
			<Footer
				style={{
					gridArea: "footer",
				}}
			/>
		</CommonFrame>
	);
};

export default Home;
