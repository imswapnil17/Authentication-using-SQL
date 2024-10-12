#Using flask,mysql.connector,fernet,json and other library 
# including other presented files
from flask import Flask,render_template,request,url_for,redirect
import mysql.connector
from cryptography.fernet import Fernet
import json
import Data
import importlib 
import findUser


# Loading in the database in this case I used one 
# from sql12.freesqldatabase.com'''
mydb = mysql.connector.connect(
host="Your Host",
user="Your Username",
password="Your Pasword",
database="Your Databse")
mycursor = mydb.cursor()
#loading secret key shhh.....
def loadKey():
    with open("key.txt","rb") as file:
        key = file.readline().decode("utf-8")
    return key
#encrypts the string provided
def encryptString(key,string):
    if(string!=None):
        encrypter = Fernet(key=key)
        token = encrypter.encrypt(str.encode(string))
        return token.decode('utf-8')
    else:
        return 
#this function decrypts the key which we will use for passwords
def decryptKey(key,string):
    if(string != None):
        decrypter = Fernet(key=key)
        token = decrypter.decrypt(str.encode(string))
        return token.decode('utf-8')
    else:
        return
#This function store the data given by the user at sign-up page      
def updateSignup():
    if(request.form.get("username") is not None):
        username = request.form.get("username").lower()
        if(username!=None or username!=""):
            key=loadKey()
            name = request.form.get("name")
            password = encryptString(key=key,string=request.form.get("password"))
            decryptpass = decryptKey(key=key,string=password)
            email = request.form.get("email")
            
            create_user = f'''INSERT INTO users (name, username, password, email)
        VALUES ('{name}', '{username}', '{password}', '{email}');
            '''
            try:
                mycursor.execute(create_user)
                mydb.commit()
                return True
            except mysql.connector.Error as e:
                return False
#If user had logged-in getting all the data presented in database
def drawDashboard():
    if(request.cookies.get("username") != None):
                users_username = request.cookies.get("username").replace('username=','')
                mycursor.execute(f"SELECT * from users where username='{users_username}';")
                rv = mycursor.fetchall()
                user=[]
                content={}
                for result in rv:
                    content  = {'id':result[0],'name':result[1],'username':result[2],'password':result[3],'email':result[4]}
                    user.append(content)
                    content ={}
                jsoned_data = json.dumps(user)
                user = json.loads(jsoned_data)[0]
    return user
#Checking if the User exist if yes then check the password and let the user login
def checkLogin():
    key=loadKey()
    username = request.form.get('username_login')
    password = request.form.get("password_login")
    importlib.reload(findUser)
    try:
        data =findUser.findUserbyUsername(username)
        password_database = decryptKey(key=key,string=data['password'])
        if(password_database==password):
            return redirect(url_for("Dashboard"))
    except Exception as e:
         return render_template("login.html")

app = Flask(__name__)
global username;
#Home route for the default page which is sign up
@app.route("/", methods=["GET","POST"])
def home():
    updatedDatabase = updateSignup()
    if(updatedDatabase):
        return redirect(url_for("Dashboard"))
    return render_template("index.html")

#Dashboard route for login page        
@app.route("/Dashboard",methods=["GET","POST"])
def Dashboard():
    user = drawDashboard()
    return render_template("Dashboard.html",name=user['name'],username=user['username'],email=user['email'])
            
        
#Login route for login page        
@app.route("/login",methods=["POST","GET"])
def login():
    checkLogin()
    return render_template("login.html")
#Updating Data every reload / submit (mostly used in .js files)
@app.route("/updataD",methods=["POST","GET"])
def update():
    importlib.reload(Data)
    return Data.load_data


app.run(debug=True)

    





