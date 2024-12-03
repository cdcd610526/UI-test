import requests
import json

# GitHub API URL（获取指定路径的文件夹内容）
api_url = 'https://api.github.com/repos/cdcd610526/UI-test/contents/%E6%B3%A8%E5%86%8C%E6%88%96%E7%99%BB%E5%BD%95'

# GitHub基础 URL
base_url = 'https://raw.githubusercontent.com/cdcd610526/UI-test/main/'

# 发送请求获取文件夹内容
response = requests.get(api_url)

# 如果请求成功，返回的内容是一个 JSON 格式的列表
if response.status_code == 200:
    files = response.json()  # 获取文件夹内容

    # 过滤出图片文件（根据文件的扩展名，可以自定义更多类型）
    image_files = [f['name'] for f in files if f['name'].lower().endswith(('.jpg', '.jpeg', '.png', '.gif'))]

    # 构建图片的完整 URL 列表
    image_urls = [f"{base_url}%E6%B3%A8%E5%86%8C%E6%88%96%E7%99%BB%E5%BD%95/{image_file}" for image_file in image_files]

    # 将生成的 URL 列表保存为 JSON 文件
    with open('image_urls.json', 'w') as json_file:
        json.dump({"imageURLs": image_urls}, json_file, indent=4)

    print("图片 URLs 已成功生成并存储在 image_urls.json 文件中！")
else:
    print("无法获取文件夹内容，HTTP 错误代码:", response.status_code)
