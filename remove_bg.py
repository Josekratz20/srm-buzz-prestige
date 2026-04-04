from PIL import Image
import os

img_path = r'c:\Users\Erick Masaba\srm-buzz\images\kababa-full.png'
if os.path.exists(img_path):
    img = Image.open(img_path)
    img = img.convert("RGBA")
    datas = img.getdata()
    newData = []
    
    # Tolerances for near-white
    for item in datas:
        if item[0] > 220 and item[1] > 220 and item[2] > 220:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(img_path, "PNG")
    print("Background removed successfully.")
else:
    print("Image not found.")
