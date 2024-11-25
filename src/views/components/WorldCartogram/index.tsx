import { useEffect, useRef, createContext, useContext } from "react";

import CountriesSvg from "./countries.svg?react";
// I know it's not great
const size = 2.6458333;
const Countries = Object.assign(CountriesSvg, { size });

export interface CountryGraphData {
	progress: number;
}

export type OnClick = (element: SVGElement, countryName: string, data?: CountryGraphData) => void;
export interface StyleConfig {
		setStrokeColor(str: string): void;
		setFillColor(str: string): void;
		setSize(size: number): void;
}
export type OnDataChange = (progress: number, config: StyleConfig) => void;

const OnClickContext = createContext(null as null | OnClick);
const OnDataChangeContext = createContext(null as null | OnDataChange);

const onDataChangeDefault: OnDataChange = function (progress, config) {
	const c = 27 + (100 - progress) * 0.8;
	const d = (300 + (100 - progress) * 1.0) % 360;
	const e = 100 - (100 - progress) * 0.5;
	const f = - progress * 0.6 + 87;
	config.setStrokeColor(`hsl(${d},${e}%,${f}%)`);
	config.setFillColor(`hsl(${d},${e}%,${c}%)`);
	config.setSize(progress);
};

const WorldCartogram = Object.assign(function (
{ data = {},
	onDataChange = onDataChangeDefault,
	...otherProps
}:
{	data?: { [countryName: string]: CountryGraphData | undefined };
	onClick?: OnClick;
	onFinishedLoading?: () => void;
	onDataChange?: OnDataChange;
}) {
	const onClickOverride = useContext(OnClickContext);
	const onDataChangeOverride = useContext(OnDataChangeContext);
	const container = useRef<HTMLDivElement>(null);

	useEffect(function() {
		const { current: element } = container;
		if (element === null) throw new Error("lol");
		const rects = Array.from(element.querySelectorAll("rect"));
		for (const x of rects) {
			const countryName = x.id;
			const resultOfCountry = data[countryName];
			x.onclick = function () {
				const fn = onClickOverride || otherProps.onClick;
				fn?.(x, countryName, resultOfCountry);
			};
			const progress = (function() {
				if (resultOfCountry === undefined) {
					return 30;
				} else {
					const { progress: a } = resultOfCountry;
					return a;
				}
			})();
			x.style.rx = "0.5px";
			const fnData = onDataChangeOverride || onDataChange;
			fnData?.(progress, {
				setStrokeColor(str: string) {
					x.style.stroke = str;
				},
				setFillColor(str: string) {
					x.style.fill = str;
				},
				setSize(size: number) {
					const a = Countries.size * (size / 100);
					const b = Countries.size * (1 - (size / 100)) * 0.5;
					// 0 * A + B = 87
					// - 100 * A + B = 27
					// - 100 * A + 60 = 0
					x.style.transform = `translate(${b}px,${b}px)`;
					x.style.width = `${a}px`;
					x.style.height = `${a}px`;
				}
			});
			x.style.opacity = "100";
			x.style.strokeWidth = "0.2px";
			x.setAttribute("role", "button");
			x.setAttribute("aria-label", countryName);
		}
		otherProps.onFinishedLoading?.();
	}, [
		data,
		otherProps.onClick,
		otherProps.onFinishedLoading,
		onClickOverride,
		onDataChange,
		onDataChangeOverride,
	]);

	return (
		<div 
			ref={container}
		>
			<Countries />
		</div>
	);
}, {
	OnClickContext,
	OnDataChangeContext,
});

export default WorldCartogram;
