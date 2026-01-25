#!/usr/bin/env python3
"""
Remove background from images using rembg library.
Supports single image or directory processing.
"""

import argparse
import os
from pathlib import Path
from typing import List, Union

try:
    from rembg import remove, new_session
    from PIL import Image
except ImportError:
    print("Error: Required libraries not found.")
    print("Please install: pip install rembg pillow")
    exit(1)


def process_image(
    input_path: Union[str, Path],
    output_path: Union[str, Path],
    session=None,
    alpha_matting=False,
    alpha_matting_foreground_threshold=270,
    alpha_matting_background_threshold=20,
    alpha_matting_erode_size=11,
    post_process_mask=False,
    only_mask=False
) -> bool:
    """
    Remove background from a single image.

    Args:
        input_path: Path to input image file
        output_path: Path to save output PNG with transparent background
        session: Optional rembg session for reuse
        alpha_matting: Enable alpha matting for smoother edges (default: False)
        alpha_matting_foreground_threshold: Alpha matting foreground threshold (default: 270)
        alpha_matting_background_threshold: Alpha matting background threshold (default: 20)
        alpha_matting_erode_size: Alpha matting erosion size (default: 11)
        post_process_mask: Post-process the mask for better results (default: False)
        only_mask: Return only the mask instead of the processed image (default: False)

    Returns:
        True if successful, False otherwise
    """
    try:
        input_path = Path(input_path)
        output_path = Path(output_path)

        # Ensure output directory exists
        output_path.parent.mkdir(parents=True, exist_ok=True)

        # Read input image
        with Image.open(input_path) as img:
            # Remove background with parameters
            result = remove(
                img,
                session=session,
                alpha_matting=alpha_matting,
                alpha_matting_foreground_threshold=alpha_matting_foreground_threshold,
                alpha_matting_background_threshold=alpha_matting_background_threshold,
                alpha_matting_erode_size=alpha_matting_erode_size,
                post_process_mask=post_process_mask,
                only_mask=only_mask
            )

            # Save as PNG with transparency
            result.save(output_path, "PNG")

        print(f"✓ Processed: {input_path.name} -> {output_path}")
        return True

    except Exception as e:
        print(f"✗ Error processing {input_path}: {e}")
        return False


def process_directory(
    input_dir: Union[str, Path],
    output_dir: Union[str, Path],
    extensions: List[str] = None,
    session=None,
    alpha_matting=False,
    alpha_matting_foreground_threshold=270,
    alpha_matting_background_threshold=20,
    alpha_matting_erode_size=11,
    post_process_mask=False,
    only_mask=False
) -> int:
    """
    Remove background from all images in a directory.

    Args:
        input_dir: Path to input directory
        output_dir: Path to output directory (output subdirectory)
        extensions: List of file extensions to process (default: common image formats)
        session: Optional rembg session for reuse
        alpha_matting: Enable alpha matting for smoother edges (default: False)
        alpha_matting_foreground_threshold: Alpha matting foreground threshold (default: 270)
        alpha_matting_background_threshold: Alpha matting background threshold (default: 20)
        alpha_matting_erode_size: Alpha matting erosion size (default: 11)
        post_process_mask: Post-process the mask for better results (default: False)
        only_mask: Return only the mask instead of the processed image (default: False)

    Returns:
        Number of successfully processed images
    """
    if extensions is None:
        extensions = ['.jpg', '.jpeg', '.png', '.webp', '.bmp', '.tiff', '.tif']

    input_dir = Path(input_dir)
    output_dir = Path(output_dir)

    # Create output directory
    output_dir.mkdir(parents=True, exist_ok=True)

    # Find all image files
    image_files = []
    for ext in extensions:
        image_files.extend(input_dir.glob(f"*{ext}"))
        image_files.extend(input_dir.glob(f"*{ext.upper()}"))

    if not image_files:
        print(f"No image files found in {input_dir}")
        return 0

    print(f"Found {len(image_files)} image(s) to process...")

    success_count = 0
    for img_file in image_files:
        # Generate output filename with _no_bg suffix
        output_file = output_dir / f"{img_file.stem}_no_bg.png"
        if process_image(
            img_file,
            output_file,
            session,
            alpha_matting,
            alpha_matting_foreground_threshold,
            alpha_matting_background_threshold,
            alpha_matting_erode_size,
            post_process_mask,
            only_mask
        ):
            success_count += 1

    print(f"\nCompleted: {success_count}/{len(image_files)} images processed")
    return success_count


def main():
    parser = argparse.ArgumentParser(
        description="Remove background from images using rembg",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Process single image
  python remove_bg.py input.jpg

  # Process images from directory
  python remove_bg.py path/to/images/

  # Specify custom output directory
  python remove_bg.py input.jpg --output path/to/output/

  # Use specific model (default: u2net)
  python remove_bg.py input.jpg --model u2net_human_seg

  # Enable alpha matting for smoother edges
  python remove_bg.py input.jpg --alpha-matting

  # Adjust alpha matting thresholds to reduce over-removal
  python remove_bg.py input.jpg --alpha-matting --fg-threshold 300 --bg-threshold 30

  # Enable post-processing for better mask quality
  python remove_bg.py input.jpg --post-process-mask

  # Output only the mask (for debugging)
  python remove_bg.py input.jpg --only-mask
        """
    )

    parser.add_argument(
        "input",
        help="Input image file or directory path"
    )

    parser.add_argument(
        "-o", "--output",
        help="Output directory or file path (default: input_dir/output/)"
    )

    parser.add_argument(
        "-m", "--model",
        default="u2net",
        choices=["u2net", "u2netp", "u2net_human_seg", "u2net_cloth_seg", "silueta"],
        help="Background removal model (default: u2net)"
    )

    # Alpha matting parameters
    alpha_group = parser.add_argument_group("Alpha Matting Options")
    alpha_group.add_argument(
        "-a", "--alpha-matting",
        action="store_true",
        help="Enable alpha matting for smoother edges"
    )
    alpha_group.add_argument(
        "--fg-threshold",
        type=int,
        default=270,
        metavar="N",
        help="Alpha matting foreground threshold (default: 270, higher = more conservative)"
    )
    alpha_group.add_argument(
        "--bg-threshold",
        type=int,
        default=20,
        metavar="N",
        help="Alpha matting background threshold (default: 20, higher = less aggressive removal)"
    )
    alpha_group.add_argument(
        "--erode-size",
        type=int,
        default=11,
        metavar="N",
        help="Alpha matting erosion size (default: 11)"
    )

    # Other options
    parser.add_argument(
        "--post-process-mask",
        action="store_true",
        help="Post-process the mask for better results"
    )
    parser.add_argument(
        "--only-mask",
        action="store_true",
        help="Return only the mask instead of the processed image"
    )

    args = parser.parse_args()

    input_path = Path(args.input)

    if not input_path.exists():
        print(f"Error: Input path does not exist: {input_path}")
        exit(1)

    # Create session for reuse
    session = new_session(args.model)

    if input_path.is_file():
        # Single image processing
        if args.output:
            output_path = Path(args.output)
            if output_path.is_dir():
                # If output is a directory, put file there
                output_path = output_path / f"{input_path.stem}_no_bg.png"
        else:
            # Default: create output directory next to input file
            output_path = input_path.parent / "output" / f"{input_path.stem}_no_bg.png"

        success = process_image(
            input_path,
            output_path,
            session,
            args.alpha_matting,
            args.fg_threshold,
            args.bg_threshold,
            args.erode_size,
            args.post_process_mask,
            args.only_mask
        )
        exit(0 if success else 1)

    elif input_path.is_dir():
        # Directory processing
        if args.output:
            output_dir = Path(args.output)
        else:
            # Default: output subdirectory in input directory
            output_dir = input_path / "output"

        success_count = process_directory(
            input_path,
            output_dir,
            session=session,
            alpha_matting=args.alpha_matting,
            alpha_matting_foreground_threshold=args.fg_threshold,
            alpha_matting_background_threshold=args.bg_threshold,
            alpha_matting_erode_size=args.erode_size,
            post_process_mask=args.post_process_mask,
            only_mask=args.only_mask
        )
        exit(0 if success_count > 0 else 1)


if __name__ == "__main__":
    main()
