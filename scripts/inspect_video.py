import cv2
import numpy as np
import os

video_path = "public/character.mp4"
cap = cv2.VideoCapture(video_path)

total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
fps = cap.get(cv2.CAP_PROP_FPS)
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

print(f"Total frames: {total_frames}, FPS: {fps}, Dimensions: {width}x{height}")

# Sample background color from corners (e.g. top-left corner, 10x10 area)
corner_colors = []
os.makedirs("scratch/frame_samples", exist_ok=True)

# Save every 5th frame to scratch/frame_samples to inspect movement timeline
frame_idx = 0
while True:
    ret, frame = cap.read()
    if not ret:
        break
    if frame_idx % 5 == 0 or frame_idx >= total_frames - 10:
        cv2.imwrite(f"scratch/frame_samples/frame_{frame_idx:03d}.jpg", frame)
    
    # corner sample for background
    corner = frame[10:30, 10:30]
    avg_bgr = corner.mean(axis=(0,1))
    corner_colors.append(avg_bgr)
    frame_idx += 1

cap.release()

avg_bgr = np.mean(corner_colors, axis=0)
b, g, r = int(avg_bgr[0]), int(avg_bgr[1]), int(avg_bgr[2])
hex_color = f"#{r:02x}{g:02x}{b:02x}"
print(f"Detected Background BGR: ({b}, {g}, {r}) -> RGB: ({r}, {g}, {b}) -> Hex: {hex_color.upper()}")
