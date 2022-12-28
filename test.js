const samplePcmccTc = 
    {
        "EntityTestDetail": {
            "type": "object",
            "properties": {
                "elementName": {
                    "type": "string",
                    "description": "I am groot.",
                    "enum": [
                      "enum1",
                      "enum2",
                      "enum3"
                    ]
                },
                "elementNameWithoutEnum": {
                    "type": "string",
                    "description": "Gandalf the great"
                },
                "elementNameWithoutEnum2": {
                    "type": "boolean",
                    "description": "I think therefore I am."
                }
            }
        }
    }
