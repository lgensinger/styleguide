// settings
var express = require("express");
var router = express.Router();
var pg = require("pg");
var conString = process.env.DATABASE_URL || "postgres://postgres:***@localhost/postgres";
var baseUrl = "/api";

/*******************************/
/************* GET *************/
/*******************************/

// return stack inside a section
router.get(baseUrl + "/:section" + "/:stack", function(req, res) {
    
    var results = [];
    
    // get a postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        
		var stack = req.params.stack.replace(/-/g, ' ');;
		var section = req.params.section;
		
        // get letters to determine plural tense of param
		var lastThree = section.substring(section.length - 3, section.length + 1);
        var lastOne = section.substring(section.length - 1, section.length + 1);
        var allButLastOne = section.substring(0, section.length -1);
        var allButLastThree = section.substring(0, section.length - 3);
        
        // format stack so url is user friendly but db is still all in singular format
		var sectionFormat = lastOne == "i" ? section : (lastThree == "ies" ? allButLastThree + "y" : allButLastOne);
		
        // SQL query
        var query = client.query("select * from " + sectionFormat + " where name = '" + stack + "';");
        
        // stream results back one row at a time
        query.on("row", function(row) {
            results.push(row);
        });
        
        // close connection and return results
        query.on("end", function() {
            client.end();
            return res.json(results);
        });
        
        // handle errors
        if(err) {
            console.log(err);
        };
        
    });
    
});

// return section
router.get(baseUrl + "/:section", function(req, res) {
    
    var results = [];
    
    // get a postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        
        var section = req.params.section;
        
        var brands = {
		"name": "rubicon",
		"children": [
			{
				"name": "yellow moon"
			},
            {
                "name": "olive"
            },
            {
                "name": "slinger"
            },
            {
                "name": "helio"
            },
            {
                "name": "the grid project",
                "children": [
                    {
                        "name": "rigel"
                    },
                    {
                        "name": "inceptions past"
                    },
                    {
                        "name": "ember de lei"
                    }
                ]
            }
		]
	};
        var api = {
		"name": "API",
		"children": [
			{
				"name": "system",
				"children": [
					{
						"name": "palette",
						"children": [
                            {
                                "name": "name"
                            },
                            {
                                "name": "id"
                            },
                            {
                                "name": "swatch",
                                "children": [
                                    {
                                        "name": "name"
                                    },
                                    {
                                        "name": "id"
                                    },
                                    {
                                        "name": "r"
                                    },
                                    {
                                        "name": "g"
                                    },
                                    {
                                        "name": "b"
                                    }
                                ]
                            }
                        ]
					}/*,
                    {
                        "name": "asset",
                        "children": [
                            {
                                "name": "logo",
                                "children": [
                                    {
                                        "name": "name"
                                    },
                                    {
                                        "name": "id"
                                    },
                                    {
                                        "name": "file"
                                    }
                                ]
                            },
                            {
                                "name": "icon",
                                "children": [
                                    {
                                        "name": "name"
                                    },
                                    {
                                        "name": "id"
                                    },
                                    {
                                        "name": "file"
                                    }
                                ]
                            },
                            {
                                "name": "image",
                                "children": [
                                    {
                                        "name": "name"
                                    },
                                    {
                                        "name": "id"
                                    },
                                    {
                                        "name": "file"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "motion",
                        "children": [
                            {
                                "name": "animation",
                                "children": [
                                    {
                                        "name": "concept",
                                        "children": [
                                            {
                                                "name": "name"
                                            },
                                            {
                                                "name": "id"
                                            },
                                            {
                                                "name": "storyboard"
                                            }
                                        ]
                                    },
                                    {
                                        "name": "code",
                                        "children": [
                                            {
                                                "name": "name"
                                            },
                                            {
                                                "name": "id"
                                            },
                                            {
                                                "name": "dist",
                                                "children": [
                                                    {
                                                        "name": "html"
                                                    },
                                                    {
                                                        "name": "css"
                                                    },
                                                    {
                                                        "name": "js"
                                                    },
                                                    {
                                                        "name": "asset"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "name": "video",
                                "children": [
                                    {
                                        "name": "concept",
                                        "children": [
                                            {
                                                "name": "name"
                                            },
                                            {
                                                "name": "id"
                                            },
                                            {
                                                "name": "storyboard"
                                            }
                                        ]
                                    },
                                    {
                                        "name": "production",
                                        "children": [
                                            {
                                                "name": "name"
                                            },
                                            {
                                                "name": "id"
                                            },
                                            {
                                                "name": "file",
                                                "children": [
                                                    {
                                                        "name": "asset"
                                                    },
                                                    {
                                                        "name": "transcript"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "visualization",
                        "children": [
                            {
                                "name": "name"
                            },
                            {
                                "name": "data visualization",
                                "children": [
                                    {
                                        "name": "data"
                                    },
                                    {
                                        "name": "form"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "typography",
                        "children": [
                            {
                                "name": "font"
                            }
                        ]
                    },
                    {
                        "name": "layout",
                        "children": [
                            {
                                "name": "structure"
                            },
                            {
                                "name": "form"
                            }
                        ]
                    },
                    {
                        "name": "ui",
                        "children": [
                            {
                                "name": "workspace",
                                "children": [
                                    {
                                        "name": "workspace",
                                        "children": [
                                            {
                                                "name": "module",
                                                "children": [
                                                    {
                                                        "name": "title"
                                                    },
                                                    {
                                                        "name": "visualization"
                                                    },
                                                    {
                                                        "name": "action"
                                                    },
                                                    {
                                                        "name": "source"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "component",
                        "children": [
                            {
                                "name": "poster"
                            },
                            {
                                "name": "ad"
                            },
                            {
                                "name": "wallpaper"
                            }
                        ]
                    }*/
				]
			},
            /*{
                "name": "brand",
                "children": [
                    {
                        "name": "market",
                        "children": [
                            {
                                "name": "audience",
                                "children": [
                                    {
                                        "name": "name"
                                    },
                                    {
                                        "name": "id"
                                    },
                                    {
                                        "name": "needs"
                                    },
                                    {
                                        "name": "attribute",
                                        "children": [
                                            {
                                                "name": "age"
                                            },
                                            {
                                                "name": "gender"
                                            },
                                            {
                                                "name": "role"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "name": "trend",
                                "children": [
                                    {
                                        "name": "name"
                                    },
                                    {
                                        "name": "span"
                                    }
                                ]
                            },
                            {
                                "name": "innovation",
                                "children": [
                                    {
                                        "name": "name"
                                    },
                                    {
                                        "name": "type"
                                    }
                                ]
                            },
                            {
                                "name": "competition",
                                "children": [
                                    {
                                        "name": "name"
                                    },
                                    {
                                        "name": "value"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "attributes",
                        "children": [
                            {
                                "name": "essential"
                            },
                            {
                                "name": "valued"
                            },
                            {
                                "name": "unique"
                            },
                            {
                                "name": "definitive"
                            },
                            {
                                "name": "dominant"
                            }
                        ]
                    },
                    {
                        "name": "concept",
                        "children": [
                            {
                                "name": "name"
                            },
                            {
                                "name": "moodboard"
                            },
                            {
                                "name": "positioning",
                                "children": [
                                    {
                                        "name": "values"
                                    },
                                    {
                                        "name": "focus"
                                    },
                                    {
                                        "name": "definition"
                                    },
                                    {
                                        "name": "offer"
                                    },
                                    {
                                        "name": "differentiation"
                                    },
                                    {
                                        "name": "emotional"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "system",
                        "children": [
                            {
                                "name": "voice",
                                "children": [
                                    {
                                        "name": "tone"
                                    },
                                    {
                                        "name": "language"
                                    }
                                ]
                            },
                            {
                                "name": "name"
                            },
                            {
                                "name": "style"
                            },
                            {
                                "name": "tagline"
                            }
                        ]
                    }
                ]
            },*/
            {
                "name": "standard",
                "children": [
                    {
                        "name": "name"
                    },
                    {
                        "name": "id"
                    },
                    {
                        "name": "guideline",
                        "children": [
                            {
                                "name": "name"
                            },
                            {
                                "name": "id"
                            },
                            {
                                "name": "specification",
                                "children": [
                                    {
                                        "name": "name"
                                    },
                                    {
                                        "name": "id"
                                    },
                                    {
                                        "name": "description"
                                    },
                                    {
                                        "name": "type"
                                    },
                                    {
                                        "name": "layout"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
		]
	};
        var categories = {
		"name": "categories",
		"children": [
            {
                "name": "logo"
            },
            {
                "name": "palette"
            }
        ]
	};
        var specs = {
            "name": "specifications",
            "children": [
                {
                    "name": "id"
                },
                {
                    "name": "name"
                },
                {
                    "name": "description"
                },
                {
                    "name": "type"
                },
                {
                    "name": "layout"
                }
            ]
        }
        
        if (section == "brands") {
            results.push(brands);
        } else if(section == "api") {
            results.push(api);
        } else if (section == "categories") {
            results.push(categories);
        } else if(section == "specifications") {
            results.push(specs);
        };
        
		
		
        // get letters to determine plural tense of param
		var lastThree = section.substring(section.length - 3, section.length + 1);
        var lastOne = section.substring(section.length - 1, section.length + 1);
        var allButLastOne = section.substring(0, section.length -1);
        var allButLastThree = section.substring(0, section.length - 3);
        
        // format stack so url is user friendly but db is still all in singular format
		var sectionFormat = lastOne == "i" ? section : (lastThree == "ies" ? allButLastThree + "y" : allButLastOne);
        
        // SQL query
        var query = client.query("select db.label as name,db.description as description,array_agg(row_to_json(r)) as items from db db,(select * from " + sectionFormat + ") r where db.label = '" + section + "' group by db.label,db.description;");
        
        // stream results back one row at a time
        query.on("row", function(row) {
            results.push(row);
        });
        
        // close connection and return results
        query.on("end", function() {
            client.end();
            return res.json(results);
        });
        
        // handle errors
        if(err) {
            console.log(err);
        };
        
    });
    
});

// expose to node
module.exports = router;