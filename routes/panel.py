import json
import os
import psycopg2
import psycopg2.extras
import web

import helper

urls = (

    # /api/data/panel/
    
    # /api/data/panel/#/urls/#/
    #   where first # == workspace.url_name, second # == bool to return only those shown in nav
    "([a-fA-F\d]{6})/urls/(.*)/", "panels_urls"

)

class panels_urls:
    """ Extract panel urls for a particular workspace either all or only those shown in nav.
    input:
        * workspace.url_name
        * workspace.persona.id
        * shown_in_nav
    output:
        * panel.url_name
    """
    def GET(self, workspace_url_name, shown_in_nav, connection_string=helper.get_connection_string(os.environ['DATABASE_URL'])):
        # connect to postgresql based on configuration in connection_string
        connection = psycopg2.connect(connection_string)
        # get a cursor to perform queries
        self.cursor = connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        # execute query
        self.cursor.execute("""
		select array_agg(pl.url_name) as urls
        from """ + helper.table_prefix + """workspace_panel wp
        left join """ + helper.table_prefix + """panel pl on pl.id = wp.panel_id
        left join """ + helper.table_prefix + """workspace w on w.id = wp.workspace_id
        where w.url_name = '""" + workspace_url_name + """'
        and pl.show_in_nav = """ + shown_in_nav + """;
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