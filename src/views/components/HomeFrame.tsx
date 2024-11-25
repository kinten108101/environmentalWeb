import Headerbar from "./Headerbar";
import Footer from "./Footer";
import CommonFrame from "./CommonFrame";
//import germ from "../../assets/15bf241e0b49ea43d419db4bfefba188.jpg"

export default function HomeFrame(
    {...otherProps}: 
        {
            children?: React.ReactNode,
        }){
    return(
        <CommonFrame>
			<Headerbar
				style={{
					gridArea: "headerbar",
				}}
			/>
                
                {otherProps.children}  
                
			<Footer
				style={{
					gridArea: "footer",
				}}
			/>
		</CommonFrame>
    )
}