# AO3 Quoted Comment Tool

AO3 Quoted Comment Tool is a Chrome extension that makes it easy to quote snippets from your favorite works on [Archive of Our Own (AO3)](https://archiveofourown.org/) directly into your comments.

## Features

- Adds a quote icon next to each paragraph in AO3 works.
- Click the icon to add a comment about that paragraph.
- Save multiple quoted comments as you read.
- Insert all saved quoted comments into the AO3 comment box with a single click.
- Automatically clears saved quotes after insertion.

## Installation

1. Download or clone this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select the folder containing this extension.

## Usage

1. Visit any AO3 work page (URL matching `https://archiveofourown.org/works/*`).
2. You'll see a quote icon next to each paragraph.
3. Click the icon to add a comment about that paragraph.
4. When ready, scroll to the comment section and click **Insert and clear saved comments**.
5. All your quoted comments will be inserted into the comment box, formatted with blockquotes.

## File Structure

- `content-script.js`: Main logic for injecting icons and handling quoted comments.
- `manifest.json`: Chrome extension manifest.
- `images/`: Extension icons.
- `screenshots/`: (Optional) Screenshots for documentation.

## Permissions

This extension only runs on AO3 work pages and does **not** collect or transmit any data.

## License

MIT License

---

Made with ❤️ for AO3 readers and writers.