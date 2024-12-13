import type { Meta, StoryObj } from '@storybook/react';

import Index from './index';

const meta = {
	title: "Pages/Database Location",
  component: Index,
} satisfies Meta<typeof Index>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	async play({ canvasElement }) {

	}
};
