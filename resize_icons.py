from PIL import Image
import os

def resize_icon(input_path, output_dir):
    sizes = {
        'mipmap-mdpi': 48,
        'mipmap-hdpi': 72,
        'mipmap-xhdpi': 96,
        'mipmap-xxhdpi': 144,
        'mipmap-xxxhdpi': 192
    }
    
    img = Image.open(input_path)
    
    for folder, size in sizes.items():
        target_dir = os.path.join(output_dir, folder)
        os.makedirs(target_dir, exist_ok=True)
        
        # Resize and save as ic_launcher.png
        resized_img = img.resize((size, size), Image.Resampling.LANCZOS)
        resized_img.save(os.path.join(target_dir, 'ic_launcher.png'))
        resized_img.save(os.path.join(target_dir, 'ic_launcher_round.png'))

if __name__ == "__main__":
    input_icon = "/home/ubuntu/whm-pv/public/whoamisec_pro_icon.png"
    output_base = "/home/ubuntu/whm-pv/android/app/src/main/res"
    resize_icon(input_icon, output_base)
