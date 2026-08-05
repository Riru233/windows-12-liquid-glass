import os
import argparse
from PIL import Image
from pathlib import Path

def ico_to_png(ico_path, output_dir=None):
    """
    将单个ICO文件转换为PNG格式
    :param ico_path: ICO文件路径
    :param output_dir: 输出目录，None则使用原文件目录
    :return: 转换成功返回True，失败返回False
    """
    try:
        # 打开ICO文件
        with Image.open(ico_path) as img:
            # 获取输出目录（默认使用原文件目录）
            if output_dir is None:
                output_dir = os.path.dirname(ico_path)
            
            # 创建输出目录（如果不存在）
            os.makedirs(output_dir, exist_ok=True)
            
            # 生成输出文件名（保持原名，替换后缀）
            file_name = os.path.splitext(os.path.basename(ico_path))[0]
            png_path = os.path.join(output_dir, f"{file_name}.png")
            
            # 处理ICO可能包含的多个尺寸，取最大尺寸
            max_size = max(img.size)
            img = img.resize((max_size, max_size), Image.Resampling.LANCZOS)
            
            # 保存为PNG
            img.save(png_path, "PNG")
            print(f"转换成功: {ico_path} -> {png_path}")
            return True
    except Exception as e:
        print(f"转换失败 {ico_path}: {str(e)}")
        return False

def batch_convert_ico_to_png(root_dir, output_root=None):
    """
    批量转换目录下所有ICO文件（包括子目录）
    :param root_dir: 根目录
    :param output_root: 输出根目录，None则保持原目录结构
    """
    # 遍历所有文件
    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            # 筛选ICO文件
            if filename.lower().endswith(".ico"):
                ico_path = os.path.join(dirpath, filename)
                
                # 计算输出目录（保持原目录结构）
                if output_root is not None:
                    relative_path = os.path.relpath(dirpath, root_dir)
                    output_dir = os.path.join(output_root, relative_path)
                else:
                    output_dir = None
                
                # 转换文件
                ico_to_png(ico_path, output_dir)

if __name__ == "__main__":
    # 解析命令行参数
    parser = argparse.ArgumentParser(description="批量将ICO文件转换为PNG格式")
    parser.add_argument("input_dir", help="包含ICO文件的目录")
    parser.add_argument("-o", "--output_dir", help="输出PNG文件的目录（默认保持原目录结构）", default=None)
    
    args = parser.parse_args()
    
    # 验证输入目录
    if not os.path.isdir(args.input_dir):
        print(f"错误：输入目录不存在 - {args.input_dir}")
        exit(1)
    
    # 执行批量转换
    print(f"开始转换 {args.input_dir} 下的所有ICO文件...")
    batch_convert_ico_to_png(args.input_dir, args.output_dir)
    print("转换完成！")