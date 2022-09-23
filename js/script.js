const routes = {
  "/": "/pages/home.html",
  "/home": "/pages/home.html",
  "/universe": "/pages/universe.html",
  "/explore": "/pages/explore.html",
  404: "/pages/404.html",
};

const routesClassesNames = {
  "/": "backgroundHome",
  "/home": "backgroundHome",
  "/universe": "backgroundUniverse",
  "/explore": "backgroundExplore",
  404: "",
};

function route(event) {
  event = event || window.event;
  event.preventDefault();

  window.history.pushState({}, "", event.target.href);

  handle();
}

const buttonExplore = document.querySelector(".buttonExplore");
console.log(buttonExplore);

function routeButton() {
  window.history.pushState({}, "", "/explore");
  handle();
}

buttonExplore?.addEventListener("click", function () {
  routeButton();
});

function handle() {
  console.log(buttonExplore);

  const { pathname } = window.location;
  const route = routes[pathname] || routes[404];
  fetch(route)
    .then((data) => data.text())
    .then((html) => {
      document.querySelector("#app").innerHTML = html;

      const buttonExplore = document.querySelector(".buttonExplore");

      buttonExplore?.addEventListener("click", function () {
        routeButton();
      });

      document
        .querySelector("body")
        .classList.remove(...document.querySelector("body").classList);
      document
        .querySelector("body")
        .classList.add(routesClassesNames[pathname]);
    });
}

handle();

window.onpopstate = () => handle();
window.route = () => route();
