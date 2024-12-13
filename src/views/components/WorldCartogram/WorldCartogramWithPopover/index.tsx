import Popover from "@mui/material/Popover";
import { useCallback, useState } from "react";

import useRecordState from "react-nice-patterns/src/useRecordState";
import WorldCartogram from "../index";

const WorldCartogramWithPopover = function (
{	...otherProps
}:
Parameters<typeof WorldCartogram>[0]) {
	const [anchor, setAnchor] = useState(null as HTMLElement | null);
	const [selectedCountry, setSelectedCountry] = useRecordState(undefined as { name: string; data: WorldCartogram.CountryGraphData } | undefined);

	const onPopover = useCallback(function (el: HTMLElement) {
		setAnchor(el);
	}, []);

	const onClick = useCallback(function (el, countryName, data) {
		setSelectedCountry({ name: countryName, data });
		onPopover(el);
		otherProps.onClick?.(el, countryName, data);
	}, [onPopover, otherProps.onClick]);

	const open = Boolean(anchor);

	return (
		<>
			<Popover
				open={open}
				anchorEl={anchor}
				onClose={() => setAnchor(null)}
			>
				{selectedCountry ? (
					<div>
						<div>
							{selectedCountry.name}
						</div>
						<div>
							{selectedCountry.data.progress}
						</div>
					</div>
				) : null}
			</Popover>
			<WorldCartogram
				{...otherProps}
				onClick={onClick}
			/>
		</>
	);
};

export default WorldCartogramWithPopover;
