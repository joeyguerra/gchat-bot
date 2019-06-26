import tap from "tap"
import natural from "natural"
import myVocab from "../lib/MyVocab.mjs"

const classifier = new natural.LogisticRegressionClassifier()
myVocab.intents.map( intent => {
    intent.patterns.forEach(p=>{
        classifier.addDocument(p, intent.tag)
    })
})
classifier.train()

tap.test(t=> { 
  let tag = classifier.classify("Is this the best place in the world?")
  let intent = myVocab.intents.find(t=>t.tag === tag)
  t.equal(tag, "best")
  t.end()
})