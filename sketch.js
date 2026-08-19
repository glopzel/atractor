let sigma = 10; let rho = 28; let beta = 8/3; 
let dt = 0.01; let maxPoints = 30;
let previousVolume = 0;

let attractors = []; let num = 12;

let mic;
let amplitude;
let fft;
let spectrum;

function getFullScreen() {
  return (
    document.fullscreenElement ||
    document.webkitFullScreenElement ||
    document.mozFullScreenElement ||
    document.msFullScreenElement
  );
}

function toggleScreen() {
  if (getFullScreen()) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen().catch(console.log);
  }
}

document.addEventListener("click", () => {
  toggleScreen();
});

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    mic = new p5.AudioIn();
    amplitude = new p5.Amplitude();
    fft = new p5.FFT();

    userStartAudio();
    
    userStartAudio();
        mic.start(() => {
        console.log("MIC STARTED");
        amplitude.setInput(mic);
        fft.setInput(mic);
    });   

    // background(0);
    for (let i=0; i<num; i++) {
        let initCond = (i + 1)*0.05;
        let c = color((i+1) / num * 255, 100, 255);
        attractors[i] = new Attractor(initCond, initCond, initCond, c);
    }


  
}

function draw() {
  spectrum = fft.analyze();

  let volume = amplitude.getLevel();

  let brightness = map(volume, 0, 0.03, 30, 255);

  brightness = constrain(brightness, 30, 255);

  let hit = volume - previousVolume;
  previousVolume = volume;

  // orbitControl();
  scale(5);

  for (let i = 0; i < num; i++) {
    attractors[i].setBrightness(brightness);

    // Sudden sound = spark
  if (hit > 0.002) {
    attractors[i].spark = 1;
  }

    attractors[i].update();
    attractors[i].display();
  }
}


