from PIL import Image
import os
import tkinter as tk
from tkinter import filedialog, messagebox

def resize_image(input_path, output_size, output_format='PNG'):
    # 이미지 열기
    with Image.open(input_path) as img:
        # 알파 채널이 있으면 유지
        if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
            # RGBA 모드로 변환 (투명도 유지)
            img = img.convert('RGBA')
        else:
            # RGB 모드로 변환
            img = img.convert('RGB')
        
        # 비율 유지하며 크기 조절
        img.thumbnail((output_size, output_size))
        
        # 정사각형으로 만들기 (선택사항)
        if img.size[0] != img.size[1]:
            size = max(img.size)
            new_img = Image.new('RGBA', (size, size), (255, 255, 255, 0))
            new_img.paste(img, ((size - img.size[0]) // 2, (size - img.size[1]) // 2))
            img = new_img

        return img

class ImageResizerApp:
    def __init__(self, root):
        self.root = root
        self.root.title("이미지 리사이저")
        
        # 파비콘 버튼
        self.favicon_button = tk.Button(root, text="파비콘 만들기 (32x32)", command=self.create_favicon)
        self.favicon_button.pack(pady=10)
        
        # OG 이미지 버튼
        self.og_button = tk.Button(root, text="OG 이미지 만들기 (1200x630)", command=self.create_og_image)
        self.og_button.pack(pady=10)

    def create_favicon(self):
        input_path = filedialog.askopenfilename(title="변환할 이미지 선택",
                                              filetypes=[("이미지 파일", "*.png *.jpg *.jpeg *.gif *.bmp")])
        if input_path:
            try:
                # 파비콘 생성 (32x32)
                img = resize_image(input_path, 32)
                
                # 저장할 위치 선택
                output_path = filedialog.asksaveasfilename(
                    defaultextension=".png",
                    initialfile="favicon.png",
                    filetypes=[("PNG files", "*.png")]
                )
                
                if output_path:
                    img.save(output_path, "PNG", optimize=True)
                    messagebox.showinfo("성공", "파비콘이 생성되었습니다!")
            except Exception as e:
                messagebox.showerror("오류", f"이미지 처리 중 오류가 발생했습니다: {str(e)}")

    def create_og_image(self):
        input_path = filedialog.askopenfilename(title="변환할 이미지 선택",
                                              filetypes=[("이미지 파일", "*.png *.jpg *.jpeg *.gif *.bmp")])
        if input_path:
            try:
                # OG 이미지 생성 (1200x630)
                with Image.open(input_path) as img:
                    # 비율 유지하며 크기 조절
                    img.thumbnail((1200, 630))
                    
                    # 배경 생성
                    background = Image.new('RGB', (1200, 630), 'white')
                    
                    # 이미지를 중앙에 배치
                    offset = ((1200 - img.size[0]) // 2, (630 - img.size[1]) // 2)
                    background.paste(img, offset)
                    
                    # 저장할 위치 선택
                    output_path = filedialog.asksaveasfilename(
                        defaultextension=".jpg",
                        initialfile="og-image.jpg",
                        filetypes=[("JPEG files", "*.jpg")]
                    )
                    
                    if output_path:
                        background.save(output_path, "JPEG", quality=95, optimize=True)
                        messagebox.showinfo("성공", "OG 이미지가 생성되었습니다!")
            except Exception as e:
                messagebox.showerror("오류", f"이미지 처리 중 오류가 발생했습니다: {str(e)}")

if __name__ == "__main__":
    # Pillow 설치 확인
    try:
        import PIL
    except ImportError:
        print("Pillow 라이브러리가 설치되어 있지 않습니다.")
        print("설치를 위해 다음 명령어를 실행하세요:")
        print("pip install Pillow")
        exit(1)

    root = tk.Tk()
    app = ImageResizerApp(root)
    root.mainloop()