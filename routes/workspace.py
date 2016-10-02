import json
import os
import psycopg2
import psycopg2.extras
import web

import helper

urls = (

    # /api/workspace
    
    # /api/workspace/persona/#/
    #   where # == persona.id
    "persona/(\d+)/", "persona_workspaces",
    
    # 0.0.0.0:8000/api/workspace/#/panels/#/
    #   where first # == workspace.url_name, second # == persona.id
    "([a-fA-F\d]{6})/panels/(\d+)/", "workspace_panels",

)

class persona_workspaces:
    """ Extract all the workspaces for a particular persona.
    input:
        * persona.id
    output:
        * workspace.id
        * workspace.name
        * persona.id
        * workspace.url_name
        * workspace.is_default
        * panel.url_name
    """
    def GET(self, persona_id, connection_string=helper.get_connection_string(os.environ['DATABASE_URL'])):
        # connect to postgresql based on configuration in connection_string
        connection = psycopg2.connect(connection_string)
        # get a cursor to perform queries
        self.cursor = connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        # execute query
        self.cursor.execute("""
		select w.id,
        wn.name,
        w.persona_id,
        w.url_name,
        w.is_default,
        pl.name as default_panel
        from """ + helper.table_prefix + """workspace w
        left join """ + helper.table_prefix + """workspace_name wn on wn.id = w.name_id
        left join """ + helper.table_prefix + """workspace_panel wp on wp.workspace_id = w.id
        left join """ + helper.table_prefix + """panel pl on pl.id = wp.panel_id
        where wp.is_default = true;
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

class workspace_panels:
    """ Extract all the panels for a particular workspace.
    input:
        * workspace.url_name
    output:
        * panel.id
        * panel.name
        * panel.url_name
        * panel.layout_name
        * workspace.url_name
        * workspace.persona_id
    """
    def GET(self, workspace_url_name, persona_id, connection_string=helper.get_connection_string(os.environ['DATABASE_URL'])):
        # connect to postgresql based on configuration in connection_string
        connection = psycopg2.connect(connection_string)
        # get a cursor to perform queries
        self.cursor = connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        # execute query
        self.cursor.execute("""
		select wp.panel_id,
        pl.name,
        pl.url_name,
        pl.layout_name,
        w.url_name as workspace_url_name,
        w.persona_id
        from """ + helper.table_prefix + """workspace_panel wp
        left join """ + helper.table_prefix + """workspace w on w.id = wp.workspace_id
        left join """ + helper.table_prefix + """panel pl on pl.id = wp.panel_id
        where w.url_name = '""" + workspace_url_name + """';
        """)
        # obtain the data
        data = self.cursor.fetchall()
        # close cursor and connection
        connection.close()
        self.cursor.close()
        # convert data to a string
        return json.dumps(data)
    
# instantiate the application
app = web.application(urls, locals())
