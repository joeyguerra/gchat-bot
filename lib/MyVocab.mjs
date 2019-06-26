const MyVocab = {
    "intents": [
        {
            "tag":"",
            "patterns":[""],
            "responses": [""]
        },
        {
            "tag": "best",
            "patterns": ["Is this the best place in the world?"],
            "responses": ["Yes. Of course it is", "No, you need to move."],
            "context_set": "best"
        },
        {
            "tag": "difference",
            "patterns": ["What is different from this and that?"],
            "responses": ["Not much!"]
        },
        {
            "tag": "fox",
            "patterns": ["What does the fox say?"],
            "responses": ["Beep bap bo do de be do boop"]
        }
    ]
}
export default MyVocab