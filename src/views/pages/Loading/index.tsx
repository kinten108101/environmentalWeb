//import CommonFrame from "../../components/CommonFrame";
import leaf from "../../../assets/leaf.png";

const Loading = function(){
    return (
			<div 
				style={{
					display: "flex",
                    flexDirection: 'column',
                    //justifyContent: 'center',
                    objectFit: 'cover',
                    width:'100%',
                    height: '100vh',
                    
                    objectPosition:'center',
					background: `url(${leaf}) no-repeat`,
					WebkitBackgroundSize: "cover",
					MozBackgroundSize: "cover",
					OBackgroundSize: "cover",
					backgroundSize: "cover",
                    
				}}
			>
				<div style={{
                    display: "flex",
                    flexDirection: 'column',
                    justifyContent: 'center',
                    height: '100vh',

                    textAlign:'center',
                    fontFamily: 'Inknut Antiqua',
                    fontSize: '50px',
                    fontWeight: '900px',
                    color: '#fff'
                }}>
                    Loading...
                </div> 
			</div>
	);
};

export default Loading;