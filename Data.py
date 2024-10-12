import json
import mysql.connector

#Extracting data from database to Flask

mydb = mysql.connector.connect(
host="Your Host",
user="Your Username",
password="Your Pasword",
database="Your Databse")
mycursor = mydb.cursor()
mycursor.execute("SELECT * from users;")
rv = mycursor.fetchall()
user=[]
content={}
for result in rv:
    content  = {'id':result[0],'name':result[1],'username':result[2],'password':result[3],'email':result[4]}
    user.append(content)
    content ={}
jsoned_data = json.dumps(user)

load_data = json.loads(jsoned_data)
