import Button from "../../components/Button";
import CommonFrame from "../../components/CommonFrame"
import Headerbar from "../../components/Headerbar"
import Footer from "../../components/Footer"
import { useState } from "react";
import bulb from "../../../assets/bulb.png"

const DatabaseLocation = function(){
    const [address, setAddress] = useState("")
    const [errorMessage, setErrorMessage] = useState(false)

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const validCredentials = {
            address: "localhost:9999"
        }

        if(address == validCredentials.address){
            alert('Connect to the database.');
            setErrorMessage(false);
        }
        else setErrorMessage(true);
    }
    
    return(
        <CommonFrame>
            <Headerbar
				style={{
					gridArea: "headerbar",
				}}
			/>

            <div style={{
                display: "flex",
				alignItems: "center",
				paddingLeft: "48px",
				background: `url(${bulb}) no-repeat`,
				WebkitBackgroundSize: "cover",
				MozBackgroundSize: "cover",
				OBackgroundSize: "cover",
				backgroundSize: "cover"
            }}>
                <div style={{
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
                    <div style ={{
                            marginBottom: "20px",
                            fontSize: "30px"
                        }}>
                        <h1>DATABASE</h1>
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                    <div style={{ 
                        marginBottom: "30px",
                        display: "flex"
                    }}>
                    <label
                        style={{
                            display: "block",
                            minWidth: "100px",
                            marginRight: "10px",
                            marginTop: "8px",
                            textAlign: "left",
                        }}
                    >
                        Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your address"
                        required
                        style={{
                            flex: 1,
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    /> 
                    </div>
                    <Button>
                        <a href="/process/9999-1a7">Connect</a>
                    </Button>
                    </form>
                    {errorMessage ? (
                        <div style={{ 
                            color: "red", 
                            marginTop: "10px",
                            textAlign: 'left'
                        }}>
                            <p>Cannot connect to the database.</p>
                            <p>Please try again.</p>
                        </div>
                    ) : null}
                </div>
            </div>
            
            
            <Footer
				style={{
					gridArea: "footer",
				}}
			/>
        </CommonFrame>
    )
};

export default DatabaseLocation;
