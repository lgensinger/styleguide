#!/usr/bin/env python

import os
import sys
import psycopg2

from subprocess import call, Popen, PIPE

def grab_repo(repo):
    msg = ''
    try:
        path = repo.split("/")
        path = path[-1].split(".")[0]
        if os.path.isdir(path):
            cmd = "cd "+path+" && git pull"
            msg = "successfully updated the repo"
        else:
            cmd = "git clone "+repo
            msg = "successfully cloned the repo"
        p = call(cmd, shell=True)
    except:
        print "unable to clone repo"
        sys.exit(1)
    print msg
    return path

def grab_submodules():
    try:
        path = ".gitmodules"
        modules = []
        if os.path.isfile(path):
            with open(path, 'r') as f:
                for line in f:
                    if line.startswith("["):
                        modules.append(line.split('"')[1])
        for module in modules:
            cmd = "cd "+module+" && git pull"
            print "pulling in updates to "+module
            p = call(cmd, shell=True)
    except:
        print "unable to get submodules"
        print sys.exc_info()
    return modules     
    
def grab_models(path, model):
    models = []
    for root, subFolders, files in os.walk(path):
        s_root = root.split(path)[1][1:]
        if s_root.endswith(model):
            for f in files:
                if f.endswith(".js"):
                    try:
                        cmd = 'git --git-dir='+path+'/.git log -1 --format="%ad" -- '+s_root+'/'+f
                        p = Popen(cmd.split(), stdin=PIPE, stdout=PIPE, stderr=PIPE)
                        output, err = p.communicate()
                        fd = {}
                        fd['path'] = s_root
                        fd['filename'] = f
                        name = f.split(model[:-1])[0]
                        if name.endswith("-") or name.endswith("_"):
                            name = name[:-1]
                        fd['model_name'] = name
                        fd['modified_date'] = output.strip()
                        models.append(fd)
                    except:
                        print "failed to get info for "+f
    return models, model

def apply_models(models, model_name, module):
    try:
        for root, subFolders, files in os.walk("."):
            s_root = root.split(".")[1][1:]
            for f in files:
                if f == "index.html" or f == "directives.js":
                    contents = []
                    with open(s_root+"/"+f, 'r') as fi:
                        for line in fi:
                            contents.append(line)
                    contents_read = contents[:]
                    flag = False
                    for i, content in enumerate(contents_read):
                        if "start control directives" in content:
                            flag = True
                            contents.insert(i, content)
                            for model in models:
                                new_model = ''
                                if f.endswith(".html"):
                                    new_model += '        <script src="js/'+model_name+'/'+ module.split("/")[-1]+"/"
                                    new_model += model['path']+'/'+model['filename']+'"></script>\n'
                                elif f.endswith(".js"):
                                    new_model += '    "'+model['model_name']+'-'+model_name[:-1]+'",\n'
                                contents.insert(i+2, new_model)
                        if flag:
                            if "end control directives" in content:
                                flag = False
                            else:
                                contents.remove(content)
                    with open(s_root+"/"+f, 'w') as fi:
                        for line in contents:
                            fi.write(line)
    except:
        print sys.exc_info()
                    
def print_models(models):
    for model in models:
        print model
    return

def store_models(model):
    
    try:
        # establish connection
        conn = psycopg2.connect("dbname='postgres' user='postgres' host='localhost' password='iamsocool'")
        
        # get a cursor
        cur = conn.cursor()
        
        # set up query string
        query = "insert into control (name, modified) values (%(model_name)s, now())"
        
        # open execute a query
        cur.executemany(query, models)
        
        # commit the query
        conn.commit()
        
        # close connection
        conn.close()
        
    except:
        print "can't make connection"
            
    return

if __name__ == "__main__":
    modules = grab_submodules()
    for module in modules:
        models, model = grab_models(module, "directives")
        apply_models(models, model, module)
        print_models(models)
        store_models(models)
    sys.exit()
    #if len(sys.argv) == 3:
    #     #path = grab_repo(sys.argv[1])
    #     models = grab_models(path, sys.argv[2])
    #     print_models(models)
    #     store_models(models)
    #else:
    #     print "specify repo to pull down and a model type (i.e. `directives`)"
    #     sys.exit(1)