from flask import Flask
import gpt_predictor
import os
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO, emit, send

def create_app(test_config = None):
    app = Flask(__name__, instance_relative_config=True)
    app.config['TIMEOUT'] = 300
    cors = CORS(app)
    if test_config is None:
        pass
    else:
        app.config.from_mapping(test_config)
        
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass
    
    app.register_blueprint(gpt_predictor.bp)
    # app.register_blueprint(poster.bp)
    
    @app.route("/")
    def hello():
        return "Hello World"
    
    return app

app = create_app()
socketio = SocketIO(app, cors_allowed_origins="*")
# @cross_origin()
# @socketio.on('connect')
# def test_connect(auth):
#     print("Connected")
#     emit('my response', {'data': 'Connected'})

# @cross_origin()
# @socketio.on('my-event')
# def handle_my_custom_event(json):
#     emit('my response', json)
    
if __name__ == "__main__":
    app = create_app()
    socketio = SocketIO(app, cors_allowed_origins="*")
    socketio.run(app)
    
@cross_origin()
@socketio.on('connect')
def test_connect(auth):
    print("Connected")
    emit('my response', {'data': 'Connected'})

@cross_origin()
@socketio.on('my event')
def handle_my_custom_event(json):
    emit('my response', json)