from flask import Flask, request
from flask_cors import CORS
from contextlib import redirect_stdout
from io import StringIO
import os
from threading import Thread

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    return "Flask inside Docker!!"


@app.route("/api-example")
def api_route_example():
    return { "message": "This is an example"}

@app.route("/run", methods=['POST'])
def run_code():
    f = StringIO()
    text_code = request.get_json()
    text_code = text_code['text_code']
    output = ""
    with redirect_stdout(f):
        try:
            eval(text_code)
            output = f.getvalue()
        except SyntaxError as err:
            output = '[Line %s]: %s' % (err.lineno, err.msg)
        except Exception as err:
            output = err

    thread =  Thread(target=stress)
    thread.start()
    return { "output": output }

@app.route("/stress")
def stress():
    var = 1
    max_range = os.environ['MAX_LOOP']
    for i in range(int(max_range)):
        var = var*i
    return 0


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(debug=True,host='0.0.0.0',port=port)
