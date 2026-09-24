import cv2
import numpy as np
import os

video_path = "public/Character.mp4"
output_dir = "public/frames"
os.makedirs(output_dir, exist_ok=True)

cap = cv2.VideoCapture(video_path)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
fps = cap.get(cv2.CAP_PROP_FPS)
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

print(f"Video Info: {total_frames} frames, {fps} fps, {width}x{height}")

all_frames = []
for i in range(total_frames):
    ret, frame = cap.read()
    if not ret:
        break
    all_frames.append(frame)
cap.release()

print(f"Loaded {len(all_frames)} frames.")

# Clean frame: clean the sparkle watermark in bottom right
def clean_frame(frame):
    f = frame.copy()
    # Sparkle watermark in right margin (y: 560..640, x: 1130..1210)
    f[560:640, 1130:1210] = [0, 0, 0]
    return f

# 128 Keyframes trajectory for ultra-smooth 360° circular rotation (~2.81° per frame)
# Frame 61: Straight UP (chin lifted, looking directly upward)
keyframes = [
    (0, 61),     # UP (0°)
    (16, 78),    # UP-RIGHT (45°)
    (32, 96),    # RIGHT (90°)
    (48, 118),   # DOWN-RIGHT (135°)
    (64, 144),   # DOWN (180°)
    (80, 174),   # DOWN-LEFT (225°)
    (96, 204),   # LEFT (270°)
    (112, 216),  # UP-LEFT (315°)
]

selected = {}
for i in range(7):
    s_idx, s_f = keyframes[i]
    e_idx, e_f = keyframes[i+1]
    for step in range(s_idx, e_idx):
        t = (step - s_idx) / (e_idx - s_idx)
        selected[step] = int(round(s_f + t * (e_f - s_f)))

# Seamless natural trajectory closure from 112 (F216, UP-LEFT) back to 128 (F61, UP)
closure = [216, 219, 222, 225, 228, 232, 236, 239, 10, 16, 22, 28, 32, 56, 59, 61]
for offset, f in enumerate(closure):
    selected[112 + offset] = f

# Quality 92 WebP
webp_params = [cv2.IMWRITE_WEBP_QUALITY, 92]

for step in range(128):
    vf = selected[step]
    cleaned = clean_frame(all_frames[vf])
    cv2.imwrite(os.path.join(output_dir, f"frame_{step}.webp"), cleaned, webp_params)
    cv2.imwrite(os.path.join(output_dir, f"{step}.webp"), cleaned, webp_params)

# Center frame: F236 (smiling directly into camera)
center_cleaned = clean_frame(all_frames[236])
cv2.imwrite(os.path.join(output_dir, "center.webp"), center_cleaned, webp_params)
cv2.imwrite("public/center.webp", center_cleaned, webp_params)

print("Extraction complete! 128 WebP frames + center.webp generated successfully.")
