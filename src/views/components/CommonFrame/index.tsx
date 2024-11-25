import { createElement } from "react";

const CommonFrame = function (
{	...otherProps
}:
{	children?: React.ReactNode;
	className?: string;
	component?: string;
}) {
	return createElement(
		otherProps.component ? otherProps.component : "div",
		{	className: `${otherProps.className}`,
			style: {
				minHeight: "100vh",
				height: "100%",
				display: "grid",
				grid: `
					"headerbar" 48px
					"main" minmax(0,1fr)
					"footer" 100px
				`,
			}
		},
		otherProps.children
	);
};

export default CommonFrame;
