import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from '@storybook/test';

import Component from "./index";

const meta = {
	title: "Components/World Cartogram",
	component: Component,
	parameters: {
		layout: "centered"
	},
	tags: ["autodocs"]
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

const data = {
	"Viet_Nam": { progress: 90 },
	"Cambodia": { progress: 87 },
	"Lao": { progress: 80 },
	"Philippines": { progress: 60 },
	"Switzerland": { progress: 100 },
	"Italy": { progress: 90 },
	"Monaco": { progress: 80 },
	"Serbia": { progress: 75 },
	"France": { progress: 90 },
	"Slovenia": { progress: 80 },
	"Belgium": { progress: 82 },
	"Luxembourg": { progress: 84 },
	"Austria": { progress: 70 },
	"Denmark": { progress: 40 },
	"Germany": { progress: 100 },
}

export const Default: Story = {
	args: {
		data,
	},
	async play({ canvasElement }) {
	}
};
