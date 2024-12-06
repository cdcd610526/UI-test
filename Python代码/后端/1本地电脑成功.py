from flask import Flask, request, jsonify
from flask_cors import CORS  # 引入 CORS
import json
import os

app = Flask(__name__)
CORS(app)  # 启用 CORS

def get_unique_filename(base_filename):
    filename = base_filename
    counter = 1
    while os.path.exists(filename):
        filename = base_filename.replace('.json', f'_{counter}.json')
        counter += 1
    return filename
@app.route('/save_data', methods=['POST'])
def save_data():
    try:
        data = request.get_json()
        image_name = data['imageName']
        task_data = data['taskData']
        task_start_data = data['taskStartData']

        # 存储数据到文件
        task_data_filename = f"data/{image_name}_task_data.json"
        task_start_data_filename = f"data/{image_name}_task_start_data.json"
        # 获取唯一的文件名（如果文件已存在，则生成新的文件名）
        task_data_filename = get_unique_filename(task_data_filename)
        task_start_data_filename = get_unique_filename(task_start_data_filename)


        with open(task_data_filename, 'w') as f:
            json.dump(task_data, f, indent=4)
        with open(task_start_data_filename, 'w') as f:
            json.dump(task_start_data, f, indent=4)

        return jsonify({"message": "数据已成功保存！"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
   app.run(debug=True)


