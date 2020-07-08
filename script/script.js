let catBtn = document.getElementById("cat");
let dogBtn = document.getElementById("dog");
let flag = true;
let saveURL;
let arrSaveImg = new Array();
let divOpacitiContent = document.getElementById("content");
let divOpacitiInterview = document.getElementById("interview");
let divOpacitiResultInfo = document.getElementById("resultInfo");

const CAT_IMG = "https://api.thecatapi.com/v1/images/search?size=full";
const DOG_IMG = "https://api.thedogapi.com/v1/images/search";

function animals(status, url) {
  (this.status = status), (this.url = url);
}

document.addEventListener("DOMContentLoaded", () => {
  routing("content");
});

catBtn.addEventListener("click", () => {
  routing("interview");
  addCat(CAT_IMG);
  flag = true;
  arrSaveImg = [];
  localStorage.setItem("test", JSON.stringify(arrSaveImg));
});

dogBtn.addEventListener("click", () => {
  routing("interview");
  addDog(DOG_IMG);
  flag = false;
  arrSaveImg = [];
  localStorage.setItem("test", JSON.stringify(arrSaveImg));
});

function routing(link) {
  switch (link) {
    case "content":
      divOpacitiContent.style.display = "flex";
      divOpacitiInterview.style.display = "none";
      divOpacitiResultInfo.style.display = "none";
      break;
    case "interview":
      divOpacitiContent.style.display = "none";
      divOpacitiInterview.style.display = "flex";
      divOpacitiResultInfo.style.display = "none";
      break;
    case "resultInfo":
      divOpacitiContent.style.display = "none";
      divOpacitiInterview.style.display = "none";
      divOpacitiResultInfo.style.display = "flex";
      break;
  }
}

document.getElementById("likeBtn").addEventListener("click", () => {
  like(saveURL);
});

document.getElementById("dislikeBtn").addEventListener("click", () => {
  dislike(saveURL);
});

document.getElementById("resultBtn").addEventListener("click", () => {
  routing("resultInfo");
  localStorage.setItem("test", JSON.stringify(arrSaveImg));
  resultImg();
});

document.getElementById("menuBtn").addEventListener("click", () => {
  routing("content");
});

function like(url) {
  if (flag === true) {
    let cat = new animals(true, url);
    arrSaveImg.push(cat);
    addCat(CAT_IMG);
  } else {
    let dog = new animals(true, url);
    arrSaveImg.push(dog);
    addDog(DOG_IMG);
  }
}

function dislike(url) {
  if (flag === true) {
    let cat = new animals(false, url);
    arrSaveImg.push(cat);
    addCat(CAT_IMG);
  } else {
    let dog = new animals(false, url);
    arrSaveImg.push(dog);
    addDog(DOG_IMG);
  }
}

function loading() {
  document.getElementById("imgPosition").innerHTML = `<div id="floatingBarsG">
	<div class="blockG" id="rotateG_01"></div>
	<div class="blockG" id="rotateG_02"></div>
	<div class="blockG" id="rotateG_03"></div>
	<div class="blockG" id="rotateG_04"></div>
	<div class="blockG" id="rotateG_05"></div>
	<div class="blockG" id="rotateG_06"></div>
	<div class="blockG" id="rotateG_07"></div>
	<div class="blockG" id="rotateG_08"></div>
</div>`;
}

function addCat(url) {
  loading();
  fetch(url).then((response) => {
    response.json().then((data) => {
      let strucktCat = document.getElementById("imgPosition");
      let img = document.createElement("img");
      img.src = data[0].url;
      img.alt = "cat";

      saveURL = data[0].url;

      img.onload = () => {
        strucktCat.innerHTML = "";
        strucktCat.appendChild(img);
      };
    });
  });
}

function addDog(url) {
  loading();
  fetch(url).then((response) => {
    response.json().then((data) => {
      let strucktDog = document.getElementById("imgPosition");
      let img = document.createElement("img");
      img.src = data[0].url;
      img.alt = "dog";

      saveURL = data[0].url;

      img.onload = () => {
        strucktDog.innerHTML = "";
        strucktDog.appendChild(img);
      };
    });
  });
}

function resultImg() {
  document.getElementById("infoLikeDislike").innerHTML = "";
  document.getElementById("positionGridCard").innerHTML = "";
  document.getElementById("info").innerHTML = "";

  if (arrSaveImg.length != 0) {
    let x = JSON.parse(localStorage.getItem("test"));
    arrSaveImg = [];

    let countLike = 0;
    let countDislike = 0;

    for (let i = 0; i < x.length; i++) {
      let animal = new animals(x[i].status, x[i].url);
      arrSaveImg.push(animal);

      if (x[i].status === true) {
        countLike++;
      } else {
        countDislike++;
      }
    }

    for (let i = 0; i < x.length; i++) {
      document.getElementById(
        "infoLikeDislike"
      ).innerHTML = `<div class='countLike'><span>${countLike}</span><i class="fas fa-thumbs-up"></i></div>
            <div class='countDislike'><span>${countDislike}</span><i class="fas fa-thumbs-down"></i></div>`;
    }

    for (let i = 0; i < arrSaveImg.length; i++) {
      document.getElementById(
        "positionGridCard"
      ).innerHTML += `<div class="imgAnimal" id='imgAnimal${i}'>
                <div  ${
                  arrSaveImg[i].status === true
                    ? `class="imgTrue"><i class="fas fa-thumbs-up"></i>`
                    : `class="imgFalse"><i class="fas fa-thumbs-down"></i>`
                }</div>
                <img src=${arrSaveImg[i].url} alt='animal'></img>
            </div>`;
    }

    for (let i = 0; i < arrSaveImg.length; i++) {
      document.getElementById(`imgAnimal${i}`).addEventListener("click", () => {
        see(i);
      });
    }
  } else {
    document.getElementById("info").innerHTML = `<div class="messageEmptyArray">
            <p>Вы не оценили ни одной фотографии!</p>
        </div>`;
  }

  document.getElementById(`returnBtn`).addEventListener("click", () => {
    routing("interview");
  });
}

function see(i) {
  document.getElementById("info").innerHTML = `<div class="infoImg">
        <img src=${arrSaveImg[i].url} alt='animal'></img>
    </div>`;
}
