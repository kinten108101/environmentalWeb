import Button from "../../components/Button";
import CommonFrame from "../../components/CommonFrame"
import Headerbar from "../../components/Headerbar"
import Footer from "../../components/Footer"
import { useState } from "react";
import bulb from "../../../assets/bulb.png"

const SignIn = function () {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [errorMessage, setErrorMessage] = useState(false);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		// Mock credentials
		const validCredentials = {
			email: "user@example.com",
			password: "password123",
		};
	  
		// Validate user input
		if (email === validCredentials.email && password === validCredentials.password) {
			alert("Login successful!");
			setErrorMessage(false); // Hide error message
		} else {
			setErrorMessage(true); // Show error message
		}
	};

	return (
		<CommonFrame>
			<Headerbar
				style={{
					gridArea: "headerbar",
				}}
			/>
			<div style ={{
				display: "flex",
				alignItems: "center",
				paddingLeft: "48px",
				background: `url(${bulb}) no-repeat`,
				WebkitBackgroundSize: "cover",
				MozBackgroundSize: "cover",
				OBackgroundSize: "cover",
				backgroundSize: "cover"
			}}>

			
			<div className="LoginContainer"
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
				}}>
			<div
				style ={{
					marginBottom: "10px",
					fontSize: "30px"
				}}>
				<h1>Log in to Continue</h1>
			</div>			
			
			<form onSubmit={handleSubmit}>
				<div style={{ 
					marginBottom: "10px",
					display: "flex"
				}}>
				<label
					htmlFor="email"
					style={{
						display: "block",
						minWidth: "100px",
						marginRight: "10px",
						marginTop: "8px",
						textAlign: "left",
					}}
				>
					Email
				</label>
				<input
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Enter your email"
					required
					style={{
						flex: 1,
						padding: "8px",
						border: "1px solid #ccc",
						borderRadius: "4px",
					}}
				/> 
				</div>
				<div
					style={{ 
						marginBottom: "10px",
						display: "flex"
					}}
				>
				<label
					htmlFor="password"
					style={{
						display: "block",
						minWidth: "100px",
						marginRight: "10px",
						marginTop: "8px",
						textAlign: "left",
					}}
				>
					Password
				</label>
				<input
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Enter your password"
					required
					style={{
						flex: 1,
						padding: "8px",
						border: "1px solid #ccc",
						borderRadius: "4px",
					}}
				/>
				</div>
				<Button
					className="Login"
				>
					<a href="/database"> Log in</a> 
				</Button>
			</form>
			{errorMessage ? (
				<p style={{ color: "red", marginTop: "10px" }}>
					Invalid email or password!
				</p>
			) : null}
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

export default SignIn;
