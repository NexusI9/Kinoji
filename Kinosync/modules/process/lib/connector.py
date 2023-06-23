#Database connection handler

import mysql.connector
from mysql.connector import Error
import json


class Connector:

    def __init__(self, HOSTNAME, USERNAME, PASSWORD, DTBNAME):
        self.connection = self.setConnection(HOSTNAME, USERNAME, PASSWORD, DTBNAME)
        return



    def setConnection(self, h_name, u_name, psd, dbn):
        con = None
        try:
            con = mysql.connector.connect(
                host=h_name,
                user=u_name,
                passwd=psd,
                database=dbn
            )
        except Error as err:
            print(f"Error :'{err}'")
        else:
            print("")
            print("MySql Database connection successful")

            return con

    def commit(self, tb, obj):
        if(not obj or obj == None):
            return
        
        print("Committing to Database Table: %s" % (tb))
        self.update(table=tb,data=obj)
        print("> DONE !")

    def execute(self, query, args=()):
        cursor = self.connection.cursor(buffered=True)
        try:
            cursor.execute(query,args)
            self.connection.commit()
            return cursor.fetchall()
        except Error as err:
            print(f"Error :'{err}'")


    def getJSON(self, query, args=()):
        cursor = self.connection.cursor()
        cursor.execute(query,args)
        r = [dict((cursor.description[i][0], value) \
                  for i, value in enumerate(row)) for row in cursor.fetchall()]
        cursor.close()
        return json.loads(json.dumps(r, default=str))

    def cleanUp(self,object):
        #remove None
        for key, value in dict(object).items():
            if value is None or value == '':
                del object[key]
        return object


    def update(self, table, data):
        # table : table name to insert values       (movies)
        # data : tupple value to insert             ({folder:akira, name:otomo, age:50})
        # key : the column to look if not exists    (folder)
        data = self.cleanUp(data)
        columns = []
        values = []
        update = []

        for k in data:

            #convert string
            if( isinstance(data[k],str) ):
                data[k] = data[k].replace('\"','')

            concat = "\"" + str(data[k]) + "\""
            values.append(concat)
            columns.append(k)
            update.append(k+"="+concat)


        columns = ', '.join(columns)
        values = ', '.join(values)
        update = ', '.join(update)

        QUERY = """
        INSERT INTO %s (%s)
        VALUES (%s)
        ON DUPLICATE KEY UPDATE
            %s
        """ % (table, columns, values, update)
        print(QUERY)
        self.execute(QUERY)
