---
name: remove-bg
description: This skill should be used when a user requests to remove the background from images, extract the main subject, or make an image transparent. It handles both single image files and entire directories of images.
---

# Remove Background Skill

Automatically remove backgrounds from images and save the results as transparent PNG files.

## When to Use

Invoke this skill when the user requests any of the following:

- Remove background from an image
- Remove a specific color background (e.g., white, black)
- Extract the main subject from an image
- Make an image background transparent
- Cut out the subject from a photo
- Process multiple images to remove their backgrounds

## Usage

### Processing a Single Image

To remove the background from a single image:

```bash
python scripts/remove_bg.py <path/to/image.jpg>
```

The output will be saved as `<filename>_no_bg.png` in an `output/` subdirectory next to the input image.

### Processing a Directory

To process all images in a directory:

```bash
python scripts/remove_bg.py <path/to/directory/>
```

All images (supported formats: .jpg, .jpeg, .png, .webp, .bmp, .tiff, .tif) will be processed and saved with `_no_bg` suffix in the `output/` subdirectory.

### Custom Output Location

Specify a custom output directory:

```bash
python scripts/remove_bg.py <input> --output <custom/output/path/>
```

### Model Selection

Choose a different background removal model:

```bash
python scripts/remove_bg.py <input> --model u2net_human_seg
```

Available models:
- `u2net` (default) - General purpose
- `u2netp` - Lightweight/faster
- `u2net_human_seg` - Human segmentation
- `u2net_cloth_seg` - Clothing segmentation
- `silueta` - Silhouette focus

### Controlling Background Removal Aggressiveness

The skill supports several parameters to fine-tune background removal behavior, especially useful when experiencing over-removal or under-removal.

#### Alpha Matting (for smoother edges)

Enable alpha matting to get smoother, more natural edges:

```bash
python scripts/remove_bg.py <input> --alpha-matting
```

#### Adjusting Thresholds

If you notice over-removal (parts of the subject being removed), increase the thresholds:

```bash
# Higher thresholds = more conservative (less background removed)
python scripts/remove_bg.py <input> --alpha-matting --fg-threshold 300 --bg-threshold 30
```

If you notice under-removal (background not fully removed), decrease the thresholds:

```bash
# Lower thresholds = more aggressive (more background removed)
python scripts/remove_bg.py <input> --alpha-matting --fg-threshold 200 --bg-threshold 10
```

**Threshold parameters:**
- `--fg-threshold` (default: 270) - Foreground threshold. Higher values make the model more conservative about what it considers foreground.
- `--bg-threshold` (default: 20) - Background threshold. Higher values make the model less aggressive about background removal.

#### Other Quality Options

```bash
# Post-process mask for better results
python scripts/remove_bg.py <input> --post-process-mask
```

```bash
# Output only the mask (useful for debugging)
python scripts/remove_bg.py <input> --only-mask
```

### Handling Specific Background Types

#### Color-Based Background Removal (Recommended for Solid Colors)

For solid color backgrounds like white, black, or any specific color, use the color-based removal method. This is faster and more precise than AI-based removal:

```bash
# Remove white background (default)
python scripts/remove_bg.py <input> --color-bg

# Remove only edge-connected background (keep interior color)
python scripts/remove_bg.py <input> --color-bg --edge-aware

# Remove black background
python scripts/remove_bg.py <input> --color-bg --bg-color 0,0,0

# Remove a custom color (e.g., light gray)
python scripts/remove_bg.py <input> --color-bg --bg-color 200,200,200

# Adjust tolerance (higher = more colors removed, lower = more precise)
python scripts/remove_bg.py <input> --color-bg --bg-color 255,255,255 --color-tolerance 20
```

**Color-based parameters:**
- `--color-bg`: Enable color-based background removal (faster, no AI)
- `--bg-color`: RGB color to remove (default: 255,255,255 for white)
- `--color-tolerance`: Color tolerance 0-255 (default: 30). Lower = more precise, Higher = more colors removed
- `--edge-aware`: Only remove pixels connected to image edges that match the background color. Automatically switches to color-based removal (default white) if you didn’t already set `--color-bg`, and still respects any `--bg-color`.

**When to use color-based removal:**
- User says "remove white background" or "remove black background"
- Images have solid, uniform backgrounds
- Want faster processing without AI
- Need to preserve all foreground details exactly

#### AI-Based Background Removal (for Complex Scenes)

When the user has specific requirements about which backgrounds to remove and the background is complex, use the AI model with threshold adjustments:

- For complex backgrounds: Use default settings or `--post-process-mask`
- For white backgrounds with AI: Try `--fg-threshold 280 --bg-threshold 25` with `--alpha-matting`

The AI should interpret user requirements and adjust parameters accordingly. For example:
- "Remove only white background" → Use `--color-bg` (recommended) or AI with higher thresholds
- "Remove background but keep hair details" → Use `--alpha-matting --erode-size 5` (smaller erode size)
- "Remove background more aggressively" → Lower thresholds

## Requirements

The script requires the following Python packages:

```bash
pip install "rembg[cpu]" pillow
```

**Important:** Use `"rembg[cpu]"` with brackets to ensure CPU support is installed. Without `[cpu]`, rembg will fail with "No onnxruntime backend found" error.

## Virtual Environment Management

**Important:** When executing the Python scripts in this skill, you must:

1. **Create a fresh virtual environment** before each execution
2. **Delete the virtual environment** after the task is complete

This ensures a clean, isolated environment for each run and prevents dependency conflicts.

Example workflow:

```bash
# Create venv
python3 -m venv .venv

# Activate venv (macOS/Linux)
source .venv/bin/activate

# Install dependencies with CPU support
pip3 install "rembg[cpu]" pillow

# Run the script
python3 scripts/remove_bg.py <input>

# Deactivate and clean up
deactivate
rm -rf .venv
```

For Windows:

```bash
# Create venv
python3 -m venv .venv

# Activate venv
.venv\Scripts\activate

# Install dependencies with CPU support
pip3 install "rembg[cpu]" pillow

# Run the script
python3 scripts/remove_bg.py <input>

# Deactivate and clean up
deactivate
rmdir /s /q .venv
```

## Output Format

- All outputs are saved as PNG files with transparent backgrounds
- Output filenames follow the pattern: `<original_name>_no_bg.png`
- For directory processing, all outputs are placed in a single `output/` subdirectory

