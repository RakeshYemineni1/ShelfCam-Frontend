from ultralytics import YOLO
import cv2
import json

# Load YOLOv8 model
model = YOLO("best.pt")  # Replace with your trained model path

# Input image and shelf ID
image_path = "carrot.jpg"
shelf_number = "A1"
results = model(image_path)[0]

# Load image
image = cv2.imread(image_path)
if image is None:
    raise Exception("Image not found.")

# Image dimensions
height, width = image.shape[:2]
total_area = width * height

# Initialize trackers
empty_area = 0
item_classes = set()

# Process detections
for box in results.boxes:
    x1, y1, x2, y2 = map(int, box.xyxy[0])
    conf = float(box.conf[0])
    cls_id = int(box.cls[0])
    class_name = model.names[cls_id]

    if class_name.lower() == "empty":
        # Add to empty area, but don't draw
        area = (x2 - x1) * (y2 - y1)
        empty_area += area
    else:
        # Add item class and draw box
        item_classes.add(class_name)
        label = f"{class_name} ({conf*100:.1f}%)"
        cv2.rectangle(image, (x1, y1), (x2, y2), (0, 255, 0), 2)
        cv2.putText(image, label, (x1, y1 - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)

# Calculate empty shelf percentage
empty_percentage = (empty_area / total_area) * 100

# Draw empty percentage on image
cv2.putText(image, f"Empty: {empty_percentage:.2f}%", (30, 50),
            cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

# Prepare JSON output
output_data = {
    "shelf_number": shelf_number,
    "empty_percentage": round(empty_percentage, 2),
    "items_detected": sorted(list(item_classes)) if item_classes else None
}

# Save JSON and image
with open("output.json", "w") as f:
    json.dump(output_data, f, indent=4)

cv2.imwrite("output.jpg", image)

# Optional: Display image
cv2.imshow("Detections", image)
cv2.waitKey(0)
cv2.destroyAllWindows()
