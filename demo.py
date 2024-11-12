import cv2

# Load the original icon file
original_icon_path = './logo/logo.png'

# Define sizes for the icons
sizes = [16, 48, 128]
output_paths = []

# Generate and save icons in different sizes
for size in sizes:
    output_path = f'./logo/icon{size}.png'
    img = cv2.imread(original_icon_path)
    img = cv2.resize(img, (size, size))
    cv2.imwrite(output_path, img)
