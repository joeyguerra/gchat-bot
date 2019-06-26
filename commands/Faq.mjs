import natural from "natural"
import myVocab from "../lib/MyVocab.mjs"

const classifier = new natural.LogisticRegressionClassifier()
myVocab.intents.map( intent => {
    intent.patterns.forEach(p=>{
        classifier.addDocument(p, intent.tag)
    })
})

classifier.train()

const Faq = {
  async execute(chatMessage){
    let tag = classifier.classify(chatMessage.message.argumentText.trim())
    let intent = myVocab.intents.find(t=>t.tag === tag)
    return {text: intent.responses[0]}
  },
  respondsTo(chatMessage){
    if(chatMessage.type !== "MESSAGE") return false
    let classifications = classifier.getClassifications(chatMessage.message.argumentText.trim())    
    return classifications.filter(c=>c.value > 0.5).length > 0
  }
}

export default Faq