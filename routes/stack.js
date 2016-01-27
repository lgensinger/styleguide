// settings
var express = require("express");
var router = express.Router();
var pg = require("pg");
var conString = process.env.DATABASE_URL || "postgres://postgres:iamsocool@localhost/postgres";
var baseUrl = "/api";

/*******************************/
/************* GET *************/
/*******************************/

// return stack inside a section
router.get(baseUrl + "/:section" + "/:id", function(req, res) {
    console.log("------------ stack in a section ---------------")
    var results = [];
    
    // get a postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        
		var section = req.params.section;
        var id = req.params.id;
        var idType = parseInt(id);
        var idFormat = id.replace(/-/g, ' ');
        
        // get letters to determine plural tense of param
		var lastThree = section.substring(section.length - 3, section.length + 1);
        var lastTwo = section.substring(section.length - 2, section.length + 1);
        var lastOne = section.substring(section.length - 1, section.length + 1);
        var allButLastOne = section.substring(0, section.length -1);
        var allButLastTwo = section.substring(0, section.length - 2);
        var allButLastThree = section.substring(0, section.length - 3);
        
        // format stack so url is user friendly but db is still all in singular format
		var sectionFormat = lastOne == "i" ? section : (lastThree == "ies" ? allButLastThree + "y" : (lastThree == "hes" ? allButLastTwo : allButLastOne));
        
        // check the param type
        if (isNaN(idType)) {
            
            var statement = "select * from " + sectionFormat + " where name = '" + idFormat + "';"
            
        } else {
            
            var statement = "select * from " + sectionFormat + " where id = " + id + ";"
        };

        // SQL query
        var query = client.query(statement);
        
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
    console.log("------------ a section ---------------")
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
                        "name": "system",
                        "children": [
                            {
                                "name": "set",
                                "children": [
                                    {
                                        "name": "component",
                                        "children": [
                                            {
                                                "name": "item",
                                                "children": [
                                                    {
                                                        "name": "type"
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
                        "name": "",
                        "children": [
                            {
                                "name": "",
                                "children": [
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "graphic",
                                                "children": [
                                                    {
                                                        "name": "vector"
                                                    },
                                                    {
                                                        "name": "raster"
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
                        "name": "",
                        "children": [
                            {
                                "name": "",
                                "children": [
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "text"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "",
                        "children": [
                            {
                                "name": "",
                                "children": [
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "swatch"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "",
                        "children": [
                            {
                                "name": "",
                                "children": [
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "action",
                                                "children": [
                                                    {
                                                        "name": "animation"
                                                    },
                                                    {
                                                        "name": "event"
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
                        "name": "",
                        "children": [
                            {
                                "name": "",
                                "children": [
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "plot",
                                                "children": [
                                                    {
                                                        "name": "bar"
                                                    },
                                                    {
                                                        "name": "pie"
                                                    },
                                                    {
                                                        "name": "line"
                                                    },
                                                    {
                                                        "name": "area"
                                                    },
                                                    {
                                                        "name": "map"
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
                        "name": "",
                        "children": [
                            {
                                "name": "",
                                "children": [
                                    {
                                        "name": "button",
                                        "children": [
                                            {
                                                "name": "action"
                                            },
                                            {
                                                "name": "text"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "",
                        "children": [
                            {
                                "name": "",
                                "children": [
                                    {
                                        "name": "palette",
                                        "children": [
                                            {
                                                "name": "swatch"
                                            },
                                            {
                                                "name": "swatch"
                                            },
                                            {
                                                "name": "swatch"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "",
                        "children": [
                            {
                                "name": "",
                                "children": [
                                    {
                                        "name": "icon",
                                        "children": [
                                            {
                                                "name": "graphic"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "",
                        "children": [
                            {
                                "name": "logo",
                                "children": [
                                    {
                                        "name": "palette",
                                        "children": [
                                            {
                                                "name": "swatch"
                                            },
                                            {
                                                "name": "swatch"
                                            }
                                        ]
                                    },
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "graphic"
                                            }
                                        ]
                                    },
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "text"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "",
                        "children": [
                            {
                                "name": "tooltip",
                                "children": [
                                    {
                                        "name": "button",
                                        "children": [
                                            {
                                                "name": "text"
                                            },
                                            {
                                                "name": "action"
                                            }
                                        ]
                                    },
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "text"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "",
                        "children": [
                            {
                                "name": "user action",
                                "children": [
                                    {
                                        "name": "button",
                                        "children": [
                                            {
                                                "name": "text"
                                            },
                                            {
                                                "name": "action"
                                            }
                                        ]
                                    },
                                    {
                                        "name": "button",
                                        "children": [
                                            {
                                                "name": "text"
                                            },
                                            {
                                                "name": "action"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "",
                        "children": [
                            {
                                "name": "sourcing",
                                "children": [
                                    {
                                        "name": "icon",
                                        "children": [
                                            {
                                                "name": "graphic"
                                            },
                                            {
                                                "name": "action"
                                            }
                                        ]
                                    },
                                    {
                                        "name": "icon",
                                        "children": [
                                            {
                                                "name": "graphic"
                                            },
                                            {
                                                "name": "action"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "",
                        "children": [
                            {   "name": "class",
                                "children": [
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "text"
                                            }
                                        ]
                                    },
                                    {
                                        "name": "palette",
                                        "children": [
                                            {
                                                "name": "swatch"
                                            },
                                            {
                                                "name": "swatch"
                                            },
                                            {
                                                "name": "swatch"
                                            }
                                        ]
                                    },
                                    {
                                        "name": "button",
                                        "children": [
                                            {
                                                "name": "text"
                                            },
                                            {
                                                "name": "action"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "viz",
                        "children": [
                            {   "name": "",
                                "children": [
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "text"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "name": "",
                                "children": [
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "plot"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "name": "",
                                "children": [
                                    {
                                        "name": "palette",
                                        "children": [
                                            {
                                                "name": "swatch"
                                            },
                                            {
                                                "name": "swatch"
                                            },
                                            {
                                                "name": "swatch"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "name": "sourcing",
                                "children": [
                                    {
                                        "name": "icon",
                                        "children": [
                                            {
                                                "name": "graphic"
                                            },
                                            {
                                                "name": "action"
                                            }
                                        ]
                                    },
                                    {
                                        "name": "icon",
                                        "children": [
                                            {
                                                "name": "graphic"
                                            },
                                            {
                                                "name": "action"
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
                            {   "name": "",
                                "children": [
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "text"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "name": "logo",
                                "children": [
                                    {
                                        "name": "palette",
                                        "children": [
                                            {
                                                "name": "swatch"
                                            },
                                            {
                                                "name": "swatch"
                                            }
                                        ]
                                    },
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "graphic"
                                            }
                                        ]
                                    },
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "text"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "name": "",
                                "children": [
                                    {
                                        "name": "palette",
                                        "children": [
                                            {
                                                "name": "swatch"
                                            },
                                            {
                                                "name": "swatch"
                                            },
                                            {
                                                "name": "swatch"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "name": "",
                                "children": [
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "graphic"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "name": "",
                                "children": [
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "graphic"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "name": "",
                                "children": [
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "action"
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
                "name": "brand",
                "children": [
                    {
                        "name": "brand",
                        "children": [
                            {
                                "name": "concept",
                                "children": [
                                    {
                                        "name": "attributes",
                                        "children": [
                                            {
                                                "name": "market",
                                                "children": [
                                                    {
                                                        "name": "type"
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
                        "name": "",
                        "children": [
                            {
                                "name": "",
                                "children": [
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "audience",
                                                "children": [
                                                    {
                                                        "name": "corporate"
                                                    },
                                                    {
                                                        "name": "general"
                                                    },
                                                    {
                                                        "name": "partner"
                                                    },
                                                    {
                                                        "name": "peer"
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
                        "name": "",
                        "children": [
                            {
                                "name": "",
                                "children": [
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "trend",
                                                "children": [
                                                    {
                                                        "name": "design"
                                                    },
                                                    {
                                                        "name": "ux"
                                                    },
                                                    {
                                                        "name": "content"
                                                    },
                                                    {
                                                        "name": "economic"
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
                        "name": "",
                        "children": [
                            {
                                "name": "",
                                "children": [
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "innovation"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "",
                        "children": [
                            {
                                "name": "",
                                "children": [
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "competition"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "",
                        "children": [
                            {
                                "name": "",
                                "children": [
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "ABC group"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "",
                        "children": [
                            {
                                "name": "",
                                "children": [
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "partner 1"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "",
                        "children": [
                            {
                                "name": "",
                                "children": [
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "custom onboard"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "",
                        "children": [
                            {
                                "name": "",
                                "children": [
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "total awareness"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "",
                        "children": [
                            {
                                "name": "",
                                "children": [
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "uyod"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "",
                        "children": [
                            {
                                "name": "",
                                "children": [
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "flat design"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "",
                        "children": [
                            {
                                "name": "",
                                "children": [
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "firefox v30"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "",
                        "children": [
                            {
                                "name": "",
                                "children": [
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "group xyz"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
					{
                        "name": "",
                        "children": [
                            {
                                "name": "",
                                "children": [
                                    {
                                        "name": "data-driven",
                                        "children": [
                                            {
                                                "name": "partner 1"
                                            }
                                        ]
                                    },
									{
										"name": "machine learning",
										"children": [
											{
												"name": "partner 2"
											}
										]
									}
                                ]
                            }
                        ]
                    },
					{
                        "name": "",
                        "children": [
                            {
                                "name": "",
                                "children": [
                                    {
                                        "name": "value speed",
                                        "children": [
                                            {
                                                "name": "group xyz"
                                            }
                                        ]
                                    },
									{
                                        "name": "modularity",
                                        "children": [
                                            {
                                                "name": "flat design"
                                            },
											{
												"name": "custom onboard"
											}
                                        ]
                                    },
									{
                                        "name": "geo-spatial",
                                        "children": [
                                            {
                                                "name": "group 2"
                                            },
											{
												"name": "ABC group"
											}
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
					{
                        "name": "",
                        "children": [
                            {
                                "name": "people analytics",
                                "children": [
                                    {
                                        "name": "value speed",
                                        "children": [
                                            {
                                                "name": "group xyz"
                                            }
                                        ]
                                    },
									{
                                        "name": "modularity",
                                        "children": [
                                            {
                                                "name": "flat design"
                                            },
											{
												"name": "custom onboard"
											}
                                        ]
                                    },
									{
                                        "name": "geo-spatial",
                                        "children": [
                                            {
                                                "name": "group 2"
                                            },
											{
												"name": "ABC group"
											}
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
					{
                        "name": "rain",
                        "children": [
                            {
                                "name": "threat",
                                "children": [
                                    {
                                        "name": "value speed",
                                        "children": [
                                            {
                                                "name": "group xyz"
                                            }
                                        ]
                                    },
									{
                                        "name": "modularity",
                                        "children": [
                                            {
                                                "name": "flat design"
                                            },
											{
												"name": "custom onboard"
											}
                                        ]
                                    },
									{
                                        "name": "geo-spatial",
                                        "children": [
                                            {
                                                "name": "group 2"
                                            },
											{
												"name": "ABC group"
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
                "name": "standard",
                "children": [
                    {
                        "name": "standard",
                        "children": [
                            {
                                "name": "guideline",
                                "children": [
                                    {
                                        "name": "specification",
                                        "children": [
                                            {
                                                "name": "rule"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "",
                        "children": [
                            {
                                "name": "",
                                "children": [
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "aspect ratio"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "",
                        "children": [
                            {
                                "name": "",
                                "children": [
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "colorspace"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "",
                        "children": [
                            {
                                "name": "",
                                "children": [
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "font"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "",
                        "children": [
                            {
                                "name": "",
                                "children": [
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "functional"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "",
                        "children": [
                            {
                                "name": "",
                                "children": [
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "2D"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "",
                        "children": [
                            {
                                "name": "",
                                "children": [
                                    {
                                        "name": "button interaction",
                                        "children": [
                                            {
                                                "name": "2D"
                                            },
                                            {
                                                "name": "font"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "",
                        "children": [
                            {
                                "name": "",
                                "children": [
                                    {
                                        "name": "category palette",
                                        "children": [
                                            {
                                                "name": "colorspace"
                                            },
                                            {
                                                "name": "swatch order"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "",
                        "children": [
                            {
                                "name": "min size",
                                "children": [
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "aspect ratio"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "",
                        "children": [
                            {
                                "name": "padding",
                                "children": [
                                    {
                                        "name": "weight",
                                        "children": [
                                            {
                                                "name": "font"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "name": "cursor",
                                "children": [
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "functional"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "",
                        "children": [
                            {
                                "name": "mouseover",
                                "children": [
                                    {
                                        "name": "weight",
                                        "children": [
                                            {
                                                "name": "font"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "name": "cursor",
                                "children": [
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "functional"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "",
                        "children": [
                            {
                                "name": "focus",
                                "children": [
                                    {
                                        "name": "weight",
                                        "children": [
                                            {
                                                "name": "font"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "name": "cursor",
                                "children": [
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "functional"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "bar chart",
                        "children": [
                            {
                                "name": "placement",
                                "children": [
                                    {
                                        "name": "weight",
                                        "children": [
                                            {
                                                "name": "font"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "name": "swatch count",
                                "children": [
                                    {
                                        "name": "category palette",
                                        "children": [
                                            {
                                                "name": "colorspace"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "story transition",
                        "children": [
                            {
                                "name": "",
                                "children": [
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "aspect ratio"
                                            }
                                        ]
                                    },
                                    {
                                        "name": "",
                                        "children": [
                                            {
                                                "name": "colorspace"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "name": "single line",
                                "children": [
                                    {
                                        "name": "easing",
                                        "children": [
                                            {
                                                "name": "functional"
                                            }
                                        ]
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