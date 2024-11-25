import Button from "../../components/Button";
import CommonFrame from "../../components/CommonFrame";
import Headerbar from "../../components/Headerbar";
import Footer from "../../components/Footer";
import bulb from "../../../assets/bulb.png"

const ConfirmSignIn = function(){
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
			}}>

			<div
				className="LoginConfirm"
				style={{
					width: "500px",
					margin: "150px auto",
					padding: "20px",
					border: "1px solid #ccc",
					borderRadius: "8px",
					boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
					fontFamily: "Roboto, sans-serif",
					fontSize: "20px",
					fontWeight: "800",
					textAlign: "center",
					backgroundColor: 'white'
				}}
			>
				<div
					style={{
						marginBottom: "10px",
						fontSize: "30px"
					}}
				>
					<h1>Log in to Continue</h1>
				</div>
				<Button>
					<a href="./sign-in">Login</a>
				</Button>
				<div>Log in with your BKNet ID account</div>
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

export default ConfirmSignIn;
