import os
import sys
sys.path.insert(0, os.path.abspath(
    os.path.join(os.path.dirname(__file__), '..')))
from flask_cors import cross_origin, CORS
from flask import request
from flask import Blueprint
import openai
from openai import OpenAI

client = OpenAI(api_key = "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")
bp = Blueprint("gpt_predictor", __name__, url_prefix="/gpt-predictor")

CORS(bp)


@bp.route("/", methods=["GET"])
@cross_origin()
def predict():
    stream = client.chat.completions.create(
        model="gpt-3.5-turbo-0613",
        messages=[
            {
            "role": "system",
            "content": "You will be provided with a piece of code, and your task is to explain it in a concise way."
            },
            {
            "role": "user",
            "content": "class Log:\n        def __init__(self, path):\n            dirname = os.path.dirname(path)\n            os.makedirs(dirname, exist_ok=True)\n            f = open(path, \"a+\")\n    \n            # Check that the file is newline-terminated\n            size = os.path.getsize(path)\n            if size > 0:\n                f.seek(size - 1)\n                end = f.read(1)\n                if end != \"\\n\":\n                    f.write(\"\\n\")\n            self.f = f\n            self.path = path\n    \n        def log(self, event):\n            event[\"_event_id\"] = str(uuid.uuid4())\n            json.dump(event, self.f)\n            self.f.write(\"\\n\")\n    \n        def state(self):\n            state = {\"complete\": set(), \"last\": None}\n            for line in open(self.path):\n                event = json.loads(line)\n                if event[\"type\"] == \"submit\" and event[\"success\"]:\n                    state[\"complete\"].add(event[\"id\"])\n                    state[\"last\"] = event\n            return state"
            }
        ],
        temperature=0.7,
        max_tokens=1024,
        top_p=1,
        stream=True,
    )
    for chunk in stream:
        if chunk.choices[0].delta.content is not None:
            print(chunk.choices[0].delta.content, end="")
            
    print("DONE")
    return {"status": "success"}
