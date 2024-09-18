console.log("let's write javascript");
let currentSong = new Audio();
var songs;
let currFolder;

function convertSecondsToTimeFormat(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Format with leading zeros if necessary
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(folder) {
  currFolder = folder;
  let a = await fetch(`http://127.0.0.1:3000/Songs/${folder}/`);
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  songs = [];
  for (let i = 0; i < as.length; i++) {
    const element = as[i];
    if (element.href.endsWith(".mp3")) {
      const songPath = decodeURI(element).split("/").slice(-1)[0];
      songs.push(songPath);
    }
  }

  

  //show all the songs in the playlist
  let songUL = document
    .querySelector(".songList")
    .getElementsByTagName("ul")[0];
  songUL.innerHTML = " ";

  for (const song of songs) {
    songUL.innerHTML =
      songUL.innerHTML +
      `<li>   
                <img class="" src="music.svg" alt="" />
                <div class="info">
                  <div>${decodeURI(song)}</div>
                  <div>Harry</div>
                </div>
                <div class="playNow">
                  <span>Play Now</span>
                  <img src="play.svg" alt="" />
                </div> </li>`;
  }
  //attach an event listner to each song

  Array.from(
    document.querySelector(".songList").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
      playMusic(e.querySelector(".info>div").innerHTML.trim());
    });
  });
  return songs;
}

const playMusic = (track, pause = false) => {
  currentSong.src = `/Songs/${currFolder}/` + track;
  if (!pause) {
    currentSong.play();
    play.src = "pause.svg";
  }
  document.querySelector(".songInfo").innerHTML = decodeURI(track);
  document.querySelector(".songTime").innerHTML = "00:00/00:00";
};

async function displayAlbums() {
  let a = await fetch(`http://127.0.0.1:3000/Songs/`);
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let anchors = div.getElementsByTagName("a");
  let cardContainer = document.querySelector(".cardContainer");
  let array = Array.from(anchors);
  for (let index = 0; index < array.length; index++) {
    const e = array[index];
    if (e.href.includes("/Songs")) {
      let folder = e.href.split("/").splice(-2)[0];
      //get the meta data of the folder
      let a = await fetch(`http://127.0.0.1:3000/Songs/${folder}/info.json`);
      let response = await a.json();
      console.log(response);
      cardContainer.innerHTML =
        cardContainer.innerHTML +
        `<div data-folder=${folder} class="card">
              <div class="play">
                <svg
                  class="play"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 28 28"
                  width="48"
                  height="48"
                >
                  <circle cx="14" cy="14" r="14" />
                  <path
                    d="M21.8906 14.846C21.5371 16.189 19.8667 17.138 16.5257 19.0361C13.296 20.8709 11.6812 21.7884 10.3798 21.4196C9.8418 21.2671 9.35159 20.9776 8.95624 20.5787C8 19.6139 8 17.7426 8 14C8 10.2574 8 8.3861 8.95624 7.42132C9.35159 7.02245 9.8418 6.73288 10.3798 6.58042C11.6812 6.21165 13.296 7.12907 16.5257 8.96393C19.8667 10.86197 21.5371 11.811 21.8906 13.154C22.0365 13.7084 22.0365 14.2916 21.8906 14.846Z"
                  />
                </svg>
              </div>
              <img
                src="/Songs/${folder}/cover.jpg"
                alt=""
              />
              <h2>${response.heading}</h2>
              <p>${response.description}</p>
            </div>`;
    }
  }
  //load the playlist whenever the card is clicked
  Array.from(document.getElementsByClassName("card")).forEach((e) => {
    e.addEventListener("click", async (item) => {
      // console.log(item.currentTarget.dataset.folder);
      songs = await getSongs(`/${item.currentTarget.dataset.folder}`);
      playMusic(songs[0])
    });
  });
}

async function main() {
  //get the list of all the songs
  songs = await getSongs("/NCS");
  playMusic(songs[0], true);

  //Display all the albums on the page
  displayAlbums();

  //Attach an event listner to play, next and prev

  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "pause.svg";
    } else {
      currentSong.pause();
      play.src = "play.svg";
    }
  });

  //Listen for time update event
  currentSong.addEventListener("timeupdate", () => {
    document.querySelector(
      ".songTime"
    ).innerHTML = ` ${convertSecondsToTimeFormat(
      Math.floor(currentSong.currentTime)
    )}/${convertSecondsToTimeFormat(Math.floor(currentSong.duration))}`;
    document.querySelector(".circle").style.left =
      (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });

  //add an event listner to seekbar
  document.querySelector(".seekbar").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;

    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = (currentSong.duration * percent) / 100;
  });

  //add an event listner to hamburger

  document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0";
    document.querySelector(".left").style.width = "50vw";
  });

  //add an event listner to close
  document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-110%";
  });

  //add an event listner to previous
  previous.addEventListener("click", () => {
    let index = songs.indexOf(
      decodeURI(currentSong.src).split("/").slice(-1)[0]
    );

    if (index - 1 >= 0) {
      playMusic(songs[index - 1]);
    }
  });

  //add an event listner to next
  next.addEventListener("click", () => {
    let index = songs.indexOf(
      decodeURI(currentSong.src).split("/").slice(-1)[0]
    );

    if (index + 1 < songs.length) {
      playMusic(songs[index + 1]);
    }
  });

  //add an event listner to Volume
  document
    .querySelector(".range")
    .getElementsByTagName("input")[0]
    .addEventListener("change", (e) => {
      currentSong.volume = parseInt(e.target.value) / 100;
    });

  //add event listner to mute

  document.querySelector(".volume img").addEventListener("click", (e) => {
    if (e.target.src.includes("volume.svg")) {
      e.target.src = "mute.svg";
      currentSong.muted = true;
      document.querySelector(".range input").value = 0;
    } else {
      e.target.src = "volume.svg";
      currentSong.muted = false;
      currentSong.volume = 0.1;
      document.querySelector(".range input").value = 10;
    }
  });
}

main();
