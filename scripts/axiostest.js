const tvName = document.querySelector(".tvName");
const tvGenres = document.querySelector(".tvGenres");
const form = document.querySelector("form");
const conte = document.querySelector(".searched");
const featuredNames = document.querySelector(".featuredNames");
const featuredBar = document.querySelector(".featured");
const switchSidebar = document.querySelector("button");
const featured = document.createElement("div");
let touchstartX = 0;
let touchendX = 0;

function checkDirection() {
  if (touchendX < touchstartX) {
    featuredBar.classList.remove("wrapped");
    switchSidebar.classList.remove("btn--wrapped");
  }
  if (touchendX > touchstartX) {
    featuredBar.classList.add("wrapped");
    switchSidebar.classList.add("btn--wrapped");
  }
}
document.addEventListener("touchstart", (e) => {
  touchstartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
  touchendX = e.changedTouches[0].screenX;
  checkDirection();
});
const changeState = () => {
  featuredBar.classList.toggle("wrapped");
  switchSidebar.classList.toggle("btn--wrapped");
};

switchSidebar.addEventListener("click", () => {
  changeState();
});
setTimeout(() => {
  if (window.innerWidth < 876) {
    changeState();
  }
}, 300);

const makeImages = async (shows) => {
  let arone = [];
  const featuredContainer = document.querySelector(".featuredNames");

  for (let i of shows) {
    arone.push(i.show.id);

    if (i.show.image) {
      const img = document.createElement("img");
      const cont = document.createElement("div");
      const title = document.createElement("span");
      const featuredTitle = document.createElement("h1");

      img.src = i.show.image.original;

      title.innerHTML = i.show.name;
      featuredTitle.innerHTML = i.show.name;
      cont.classList.add("lol");

      featuredContainer.appendChild(featured);
      featured.appendChild(featuredTitle);

      title.innerHTML = i.show.name;
      if (i.show.webChannel !== null && i.show.webChannel.name === "Netflix") {
        console.log(i.show.webChannel.name);
        cont.classList.add("active");
      }
      conte.appendChild(cont);
      cont.appendChild(img);
      cont.appendChild(title);
    }
  }
  return arone;
};

["input", ""].forEach((event) =>
  form.addEventListener(event, async (e) => {
    e.preventDefault();
    await input(e);
  })
);

const input = async (param) => {
  let ep = document.querySelectorAll(".featuredNames div h1");

  ep.forEach((element) => {
    element.remove();
  });

  let ob = document.querySelectorAll(".lol");

  ob.forEach((element) => {
    element.remove();
  });
  let userInput = form.elements.query.value;
  userInput = (await form.elements.query.value) + " ";

  await axiosTest(userInput);
};

const axiosTest = async (param) => {
  try {
    const config = { params: { q: param } };
    const res = await axios.get(
      `https://api.tvmaze.com/search/shows?q=`,
      config
    );

    await makeImages(res.data);
  } catch (error) {
    console.log(error);
  }
};

const getVideo = async (param) => {
  const config = { params: { q: param } };
  const res = await axios.get(`https://api.tvmaze.com/search/shows?q=`, config);
};
