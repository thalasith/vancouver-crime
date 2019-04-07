from flask import Flask
from flask import render_template
import pandas as pd
import json

app = Flask(__name__)


@app.route("/")
def index():
    df = pd.read_csv('./data/vancouverCrime2018.csv')
    chart_data = df.to_dict(orient='records')
    chart_data = json.dumps(chart_data, indent=2)
    data = {'chart_data': chart_data}

    return render_template("index.html", data=data)


@app.route('/api/<variable>', methods=['GET'])
def data(variable):
    link = './data/vancouverCrime' + variable + '.csv'
    print(link)
    df = pd.read_csv(link)
    chart_data = df.to_dict(orient='records')
    chart_data = json.dumps(chart_data, indent=2)
    data = {'chart_data': chart_data}

    return data


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
