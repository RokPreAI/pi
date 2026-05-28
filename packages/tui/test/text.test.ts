import assert from "node:assert";
import { describe, it } from "node:test";
import { Markdown } from "../src/components/markdown.ts";
import { Text } from "../src/components/text.ts";
import { visibleWidth } from "../src/utils.ts";
import { defaultMarkdownTheme } from "./test-themes.ts";

describe("Plain text rendering", () => {
	it("does not right-pad Text lines without a background", () => {
		const text = new Text("alpha beta gamma delta", 1, 0);
		const lines = text.render(20);

		assert.deepStrictEqual(lines, [" alpha beta gamma", " delta"]);
		assert.deepStrictEqual(lines.map(visibleWidth), [17, 6]);
	});

	it("still pads Text lines to full width when a background is present", () => {
		const text = new Text("alpha beta gamma delta", 1, 0, (line) => line);
		const lines = text.render(20);

		assert.deepStrictEqual(lines.map(visibleWidth), [20, 20]);
	});

	it("does not right-pad Markdown lines without a background", () => {
		const markdown = new Markdown("alpha beta gamma delta", 1, 0, defaultMarkdownTheme);
		const lines = markdown.render(20);

		assert.deepStrictEqual(lines, [" alpha beta gamma", " delta"]);
		assert.deepStrictEqual(lines.map(visibleWidth), [17, 6]);
	});
});
