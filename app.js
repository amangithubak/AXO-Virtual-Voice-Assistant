const btn = document.querySelector('#talk');
const content = document.querySelector('#content');

function speak(text){
 const text_speak = new SpeechSynthesisUtterance(text);

 text_speak.rate = 1;
 text_speak.volume = 1;
 text_speak.pitch = 1;

 window.speechSynthesis.speak(text_speak);
}

function wishMe(){
  let day = new Date();
  let hour = day.getHours();

  if(hour>=0 && hour<12){
    speak("Good Morning Boss...")
  }
  else if(hour>12 && hour<17){
    speak("Good Afternoon Boss...");
  }
  else{
    speak("Good Evening Boss...");
  }
}

window.addEventListener('load', ()=>{
  speak("Initializing AXO...");
  wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.onresult = (event)=>{
  const currentIndex = event.resultIndex;
  const transcript = event.results[currentIndex][0].transcript;
  content.textContent = transcript;
  takeCommand(transcript.toLowerCase());
}

btn.addEventListener('click', ()=>{
  content.textContent = "Listening...";
  recognition.start();
})

function takeCommand(messege){
  if(messege.includes('hey') || messege.includes('hello')){
    speak("Hello Boss, How May I Help You...");
  }
  else if(messege.includes("open google")){
    window.open("https://www.google.com", "_blank");
    speak("opening Google...");
  }
  else if(messege.includes("open facebook")){
    window.open("https://www.facebook.com", "_blank");
    speak("opening Facebook...");
  }
  else if(messege.includes("open youtube")){
    window.open("https://www.youtube.com/", "_blank");
    speak("opening YouTube...");
  }
  else if(messege.includes("time")){
    const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"})
    const finalText = time;
    speak(finalText);
  }
  else if(messege.includes("date")){
    const date = new Date().toLocaleString(undefined, {month: "short", day: "numeric"});
    const finalText = date;
    speak(finalText);
  }
  else if(messege.includes("calculator")){
    window.open("Calculator:///");
    const finalText = "opening Calculator";
    speak(finalText);
  }
  else if(messege.includes("wikipedia")){
    window.open(`https://en.wikipedia.org/wiki/${messege.replace("wikipedia", " ")}`, "_blank");
    const finalText = "This is what i found on internet regarding " + messege;
    speak(finalText);
  }
  else if(messege.includes("what is") || messege.includes("who is") || messege.includes("what are")){
    window.open(`https://www.google.com/search?q=${messege.replace(" ", "+")}`, "_blank");
    const finalText = "This is what i found on internet regarding " + messege;
    speak(finalText);
  }
  else{
    window.open(`https://www.google.com/search?q=${messege.replace(" ", "+")}`, "_blank");
    const finalText = "I found some information for " + messege + "on google";
    speak(finalText);
  }
}