# kinvey-watson
This is a sample file on using IBM Watson services. The following Watson services are supported:  
Alchemy Language  
Alchemy Vision  
Alchemy Data News  
Tone Analyzer  
Tradeoff Analytics  
Speech to Text  
Text to Speech  
Language Translation  
Document Conversion  
Visual Recognition  


## Installation
Checkout the code. Pull the dependencies  
`$ git clone https://github.com/vishwakrishnamurthy/kinvey-watson.git`  
`$ cd kinvey-watson`  
`$ npm install`  


## Starting

`$ node kinvey-watson.js <service> [input]`


Usage:  

`node kinvey-watson.js <service> [input]`  

service is mandatory. Input is optional. If inputs are not provided, sample inputs are used automatically.  

`node kinvey-watson.js alchemyLanguage <text-to-analyze>`  
`node kinvey-watson.js alchemyVision <path-to-input-image-file>`  
`node kinvey-watson.js alchemyDataNews <start> <end>`  
`node kinvey-watson.js toneAnalyzer <text to analyze>`  
`node kinvey-watson.js tradeoffAnalytics <path-to-file>`  
`node kinvey-watson.js speechToText <path-to-wav-file>`  
`node kinvey-watson.js textToSpeech <text>`  
`node kinvey-watson.js languageTranslation <text>`  
`node kinvey-watson.js documentConversion <path-to-input-file>`  
`node kinvey-watson.js visualRecognition <path-to-input-image-file>`  

