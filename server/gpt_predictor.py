import os
import sys
sys.path.insert(0, os.path.abspath(
    os.path.join(os.path.dirname(__file__), '..')))
from flask_cors import cross_origin, CORS
from flask import request
from flask import Blueprint

bp = Blueprint("gpt_predictor", __name__, url_prefix="/gpt-predictor")

CORS(bp)


@bp.route("/", methods=["GET"])
@cross_origin()
def upload():
    # file = None
    # try:
    #     file = request.files["file"]
    #     file.save("../data/upload.pdf")
    # except:
    #     return "Error in file", 400
    # print(file)
    return {"status": "success"}
