const sequenceDiagram = require('js-sequence-diagrams')

const input = `
Alice->Bob: Hello Bob, how are you?
Note right of Bob: Bob thinks
Bob-->Alice: I'm good thanks!
`

const output = sequenceDiagram.parse(input).toString()
console.log(output)