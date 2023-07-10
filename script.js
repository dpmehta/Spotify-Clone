console.log("Welcome to Spotify ");

let index = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let my = 20;
let myCurrentTime = 0;

let songs = [
  {
    songname: "Ek Main Aur Ekk Tu",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songname: "Fitoor",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },
  {
    songname: "Galliyan Returns",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songname: "Goom Hai Kisi Ke Pyar Mein",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songname: "Ilahi",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },
  {
    songname: "Kisi Se Pyar Ho Jaye",
    filePath: "songs/6.mp3",
    coverPath: "covers/6.jpg",
  },
  {
    songname: "Lakiro - Amit Trivedi",
    filePath: "songs/7.mp3",
    coverPath: "covers/7.jpg",
  },
  {
    songname: "Pa Pa Pagli",
    filePath: "songs/8.mp3",
    coverPath: "covers/8.jpg",
  },
  {
    songname: "tu tu hai wahi",
    filePath: "songs/9.mp3",
    coverPath: "covers/9.jpg",
  },
  {
    songname: "Uff Teri Adaa",
    filePath: "songs/10.mp3",
    coverPath: "covers/10.jpg",
  },
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songname;
});

masterPlay.addEventListener("click", () => {
  if (audioElement.paused && audioElement.currentTime === 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    document.getElementById("0").classList.remove("fa-circle-play");
    document.getElementById("0").classList.add("fa-circle-pause");
    gif.style.opacity = 1;
    my = 0;
  } else if (audioElement.paused && audioElement.currentTime !== 0) {
    audioElement.currentTime = myCurrentTime;
    let myId = index + "";
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    document.getElementById(myId).classList.remove("fa-circle-play");
    document.getElementById(myId).classList.add("fa-circle-pause");
    gif.style.opacity = 1;
    audioElement.play();
  } else {
    audioElement.pause();
    myCurrentTime = audioElement.currentTime;
    makeAllPlays();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
  }
});

//updating seek bar

audioElement.addEventListener("timeupdate", () => {
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  myProgressBar.value = progress;

  if (progress === 100 && index === 9) {
    index = 0;
    audioElement.src = `songs/${index + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterSongName.innerText = songs[index].songname;
  } else if (progress === 100 && index !== 9) {
    index += 1;
    audioElement.src = `songs/${index + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterSongName.innerText = songs[index].songname;
  }
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.add("fa-circle-play");
      element.classList.remove("fa-circle-pause");
    }
  );
};
Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      if (my !== parseInt(e.target.id)) {
        makeAllPlays();
        index = parseInt(e.target.id);
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        audioElement.src = `songs/${index + 1}.mp3`;
        gif.style.opacity = 1;
        masterSongName.innerText = songs[index].songname;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        my = parseInt(e.target.id);
      } else {
        if (e.target.classList.contains("fa-circle-pause")) {
          myCurrentTime = audioElement.currentTime;
          makeAllPlays();
          index = parseInt(e.target.id);
          e.target.classList.remove("fa-circle-pause");
          e.target.classList.add("fa-circle-play");
          audioElement.src = `songs/${index + 1}.mp3`;
          gif.style.opacity = 1;
          masterSongName.innerText = songs[index].songname;
          audioElement.pause();
          masterPlay.classList.remove("fa-circle-pause");
          masterPlay.classList.add("fa-circle-play");
        } else {
          makeAllPlays();
          index = parseInt(e.target.id);
          e.target.classList.remove("fa-circle-play");
          e.target.classList.add("fa-circle-pause");
          audioElement.src = `songs/${index + 1}.mp3`;
          gif.style.opacity = 1;
          masterSongName.innerText = songs[index].songname;
          audioElement.currentTime = myCurrentTime;
          audioElement.play();
          masterPlay.classList.remove("fa-circle-play");
          masterPlay.classList.add("fa-circle-pause");
        }
      }
    });
  }
);

document.getElementById("backward").addEventListener("click", (e) => {
  if (index === 0) {
    index = 9;
  } else {
    index = index - 1;
  }

  audioElement.src = `songs/${index + 1}.mp3`;
  masterSongName.innerText = songs[index].songname;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});

document.getElementById("forward").addEventListener("click", (e) => {
  if (index >= 9) {
    index = 0;
  } else {
    index = index + 1;
  }

  audioElement.src = `songs/${index + 1}.mp3`;
  masterSongName.innerText = songs[index].songname;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});
