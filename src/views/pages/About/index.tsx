import CommonFrame from "../../components/CommonFrame";
import Headerbar from "../../components/Headerbar";
import Footer from "../../components/Footer";
import bulb from "../../../assets/bulb.png";
import "./index.css";

const About = function () {
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
					justifyContent: "center",
					alignItems: "center",
					background: `url(${bulb}) no-repeat`,
					WebkitBackgroundSize: "cover",
					MozBackgroundSize: "cover",
					OBackgroundSize: "cover",
					backgroundSize: "cover"
				}}
			>
				<div className="manifest">
					<h1>About us</h1>
					<p>
					We are a group of 3 students from HCMUT - VNU. Climate
					change has always been a concern since a long time ago
					. In the modern industrial society, there are many
					factors that lead to unpredictable changes in climate
					such as burning fossil fuels, deforestation, and
					industrial agriculture. Therefore, our application will
					provide users with highly precise information about
					climate change in the world and their locals.
					</p>
				</div>
			</div>
			<Footer
				style={{
					gridArea: "footer",
				}}
			/>
		</CommonFrame>
	);
};

export default About;
