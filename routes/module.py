import json
import os
import psycopg2
import psycopg2.extras
import web

import helper

urls = (

    # /api/data/module/
    
    # /api/data/module/#/panel/#/
    #   where first # == persona.id, second # == panel.id, third # == number of items to return
    "persona/(\d+)/panel/(\d+)/count/(\d+)/", "persona_panel_module"

)

class persona_panel_module:
    """ Extract modules for a particular persona and panel.
    input:
        * persona.id
        * panel.id
        * count
    output:
        * module.name
    """
    def GET(self, persona_id, panel_id, count, connection_string=helper.get_connection_string(os.environ['DATABASE_URL'])):
        # connect to postgresql based on configuration in connection_string
        connection = psycopg2.connect(connection_string)
        # get a cursor to perform queries
        self.cursor = connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        # execute query
        self.cursor.execute("""
		select m.name
        from """ + helper.table_prefix + """persona_panel_module ppm
        left join """ + helper.table_prefix + """module m on m.id = ppm.module_id
        limit """ + count + """;
        """)
        # obtain the data
        data = self.cursor.fetchall()
        # commit database changes
        connection.commit()
        # close cursor and connection
        connection.close()
        self.cursor.close()
        # convert data to a string
        return json.dumps(data)
    
# instantiate the application
app = web.application(urls, locals())