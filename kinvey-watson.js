var watson = require('watson-developer-cloud');
var fs = require('fs');
var credentials = require('./credentials');

var service = process.argv[2];

if (!(service in credentials)) {
  console.log(fs.readFileSync('./usage.txt', 'utf8'));
  return;
}


switch(service) {
  case 'alchemyLanguage':
    alchemyLanguage(process.argv[3]);
    break;

  case 'alchemyVision':
    alchemyVision(process.argv[3]);
    break;

  case 'alchemyDataNews':
    alchemyDataNews(process.argv[3], process.argv[4]);
    break;

  case 'toneAnalyzer':
    toneAnalyzer(process.argv[3]);
    break;

  case 'tradeoffAnalytics':
    tradeoffAnalytics(process.argv[3]);
    break;

  case 'speechToText':
    speechToText(process.argv[3]);
    break;

  case 'textToSpeech':
    textToSpeech(process.argv[3]);
    break;

  case 'languageTranslation':
    langaugeTranslation(process.argv[3]);
    break;

  case 'documentConversion':
    documentConversion(process.argv[3]);
    break;

  case 'visualRecognition':
    visualRecognition(process.argv[3]);

  default:
   break;
}


function alchemyLanguage(inputText) {
  var text = inputText || 'The weather is nice today';
  var alchemy_language = watson.alchemy_language({
    api_key: credentials.alchemyLanguage.apiKey
  });
 
  var params = { text: text };
  alchemy_language.sentiment(params, function (err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
  });
}


function alchemyVision(inputFile) {
  var imageFile = inputFile || './resources/face.jpg'
  var alchemy_vision = watson.alchemy_vision({
    api_key: credentials.alchemyVision.apiKey
  });

  var params = { image: fs.createReadStream(imageFile) };  

  alchemy_vision.getImageKeywords(params, function (err, keywords) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(keywords, null, 2));
  }); 
}


function alchemyDataNews(start, end) {
  var startNews = start || 'now-1h';
  var endNews = end || 'now'

  var alchemy_data_news = watson.alchemy_data_news({
    api_key: credentials.alchemyDataNews.apiKey
  });
   
  var params = {
    start: startNews,
    end: endNews,
    max: 10,
    return: 'enriched.url.title'
  };
   
  alchemy_data_news.getNews(params, function (err, news) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(news, null, 2));
  });  
}


function toneAnalyzer(inputText) {
  var text = inputText || 'Greetings from Watson Developer Cloud!';
  var tone_analyzer = watson.tone_analyzer({
    username: credentials.toneAnalyzer.username,
    password: credentials.toneAnalyzer.password,
    version: 'v3',
    version_date: '2016-05-19'
  });
 
  tone_analyzer.tone({ text: text }, function(err, tone) {
      if (err)
        console.log(err);
      else
        console.log(JSON.stringify(tone, null, 2));
  });
}


function tradeoffAnalytics(inputProblemFile) {
  var problemFile = inputProblemFile || './resources/problem.json';
  var tradeoff_analytics = watson.tradeoff_analytics({
    username: credentials.tradeoffAnalytics.username,
    password: credentials.tradeoffAnalytics.password,
    version: 'v1'
  });
   

  var params = require(problemFile);   
  tradeoff_analytics.dilemmas(params, function(err, res) {
    if (err)
      console.log(err);
    else
      console.log(JSON.stringify(res, null, 2));
  });  
}


function speechToText(inputFile) {
  var input = inputFile || './resources/speech.wav';
  var speech_to_text = watson.speech_to_text({
    username: credentials.speechToText.username,
    password: credentials.speechToText.password,
    version: 'v1'
  });

  var params = {
    audio: fs.createReadStream(input),
    content_type: 'audio/l16; rate=6400'
  };

  speech_to_text.recognize(params, function(err, res) {
    if (err)
      console.log(err);
    else
      console.log(JSON.stringify(res, null, 2));
  });
}


function textToSpeech(inputText) {
  var text = inputText || 'Hello from IBM Watson';
  var text_to_speech = watson.text_to_speech({
    username: credentials.textToSpeech.username,
    password: credentials.textToSpeech.password,
    version: 'v1'
  });

  var params = {
    text: text,
    voice: 'en-US_AllisonVoice', // Optional voice
    accept: 'audio/wav'
  };

  // Pipe the synthesized text to a file
  text_to_speech.synthesize(params).pipe(fs.createWriteStream('output.wav'));
  console.log('output.wav contains the speech equivalent of the text')
}


function langaugeTranslation(inputText) {
  var text = inputText || 'I am the language translator';

  var language_translator = watson.language_translator({
    username: credentials.languageTranslation.username,
    password: credentials.languageTranslation.password,
    version: 'v2'
  });

  language_translator.translate({
    text: text, source : 'en', target: 'es' },
    function (err, translation) {
      if (err)
        console.log('error:', err);
      else
        console.log(JSON.stringify(translation, null, 2));
  });
}


function documentConversion(inputFile) {
  var file = inputFile || './resources/sample-docx.docx'

  var document_conversion = watson.document_conversion({
    username:     credentials.documentConversion.username,
    password:     credentials.documentConversion.password,
    version:      'v1',
    version_date: '2015-12-01'
  });

  // convert a single document
  document_conversion.convert({
    // (JSON) ANSWER_UNITS, NORMALIZED_HTML, or NORMALIZED_TEXT
    file: fs.createReadStream(file),
    conversion_target: document_conversion.conversion_target.ANSWER_UNITS
  }, function (err, response) {
    if (err) {
      console.error(err);
    } else {
      console.log(JSON.stringify(response, null, 2));
    }
  });  
}

function visualRecognition(inputImageFile) {
  var image = inputImageFile || './resources/car.png';

  var visual_recognition = watson.visual_recognition({
    api_key: credentials.visualRecognition.apiKey,
    version: 'v3',
    version_date: '2016-05-19'
  });

  var params = {
    images_file: fs.createReadStream(image)
  };

  visual_recognition.classify(params, function(err, res) {
    if (err)
      console.log(err);
    else
      console.log(JSON.stringify(res, null, 2));
  });   
}

