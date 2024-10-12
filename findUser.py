import json
import mysql.connector
mydb = mysql.connector.connect(
host="Your Host",
user="Your Username",
password="Your Pasword",
database="Your Databse")
mycursor = mydb.cursor()
#This function finds user by their username.

def findUserbyUsername(users_username):
    #You can find user by anything, by altering the cursor.excute command
    mycursor.execute(f"SELECT * from users where username='{users_username}';")
    rv = mycursor.fetchall()
    user=[]
    content={}
    for result in rv:
        content  = {'id':result[0],'name':result[1],'username':result[2],'password':result[3],'email':result[4]}
        user.append(content)
        content ={}
    jsoned_data = json.dumps(user)
    data = json.loads(jsoned_data)[0]
    return data
