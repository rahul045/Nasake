from flask import Flask,request,session,jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import requests
import json
from werkzeug.utils import secure_filename
from flask_cors import CORS,cross_origin
db = SQLAlchemy()
# create the app
app = Flask(__name__)
with open('config.json','r') as c:
    params = json.load(c)["params"]
# mail = Mail(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:@localhost/nasake"
app.secret_key=''
CORS(app, supports_credentials=True)
db.init_app(app)



class  Users(db.Model):
    email= db.Column(db.String(320),  nullable=False)
    name = db.Column(db.String(100), nullable=False)
    password= db.Column(db.String(60), nullable=False)
    createdOn= db.Column(db.String(50), nullable=True)
    id = db.Column(db.Integer,unique=True, primary_key=True)

class Journals(db.Model):
    emotion = db.Column(db.JSON, nullable=False)
    sentiment= db.Column(db.JSON, nullable=False)
    content= db.Column(db.String(600), nullable=False)
    createdOn = db.Column(db.String(50), nullable=True)
    user= db.Column(db.String(100), nullable=False)
    id = db.Column(db.Integer, unique=True, primary_key=True)



@app.route("/login",methods=['GET','POST'])
def login():
    if request.method=='POST':
        username=request.json["email"]
        password=request.json["password"]
        user=Users.query.filter_by(email=username,password=password).first()
        if(user):
            #set the session variable
           session['user']=username
           return  jsonify({"email":user.email, "id":user.id,"key":username}),200

    return jsonify({"error":"Unauthorised"}),401

@app.route("/register",methods=['GET','POST'])
def register():
    if request.method=='POST':
        u_name=request.json["name"]
        u_email=request.json["email"]
        password=request.json["password"]
        date=datetime.now()
        user=Users(email=u_email,name=u_name,password=password,createdOn=date)
        ck=Users.query.filter_by(email=u_email).first()
        if(ck):
            return jsonify({"error": "User Already exist"}), 401
        else:
           db.session.add(user)
           db.session.commit()
           return jsonify({"email":user.email, "id":user.id}),200


@app.route("/logout", methods=['GET'])
def logout():
    session.pop('user')
    return jsonify({"success": "User Already Successfully Logged Out"}), 401

@app.route("/addnote/<string:auth>",methods=['GET','POST'])
def addnote(auth):
    if request.method == 'POST':
        u_content = request.json["content"]
        date = datetime.now()
        api_key = params['api_key']
        emotion = requests.post("https://apis.paralleldots.com/v4/emotion", data={"api_key": api_key, "text": u_content, "lang_code": "en"}).text
        emotion = json.loads(emotion)
        # emotion=str(emotion)
        sentiment = requests.post("https://apis.paralleldots.com/v4/sentiment",
                               data={"api_key": api_key, "text": u_content, "lang_code": "en"}).text
        sentiment = json.loads(sentiment)
        # sentiment = str(sentiment)
        journal=Journals(emotion=emotion,sentiment=sentiment,createdOn=date,content=u_content,user=auth)
        db.session.add(journal)
        db.session.commit()
        return jsonify({"success":"Note Added"}),200


@app.route("/getgraph/<string:sess>",methods=['GET'])
def getgraph(sess):
    if (sess):
       data=Journals.query.filter_by(user=sess).first()
       return jsonify(data.emotion,data.sentiment),200
    return jsonify({"error": "Login Again"}), 401



app.run(debug=True)
