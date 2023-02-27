/**
 * Global Variables
 *
 */
let oldTarget;
let oldSection;
let windowHeight;

const navbarList = document.getElementById("navbar__list");
const landingContainer =
  document.body.getElementsByClassName("landing__container");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

const createNavItems = () => {
  for (let i = 1; i <= landingContainer.length; i++) {
    const navbarItem = document.createElement("li");
    const navbarLink = document.createElement("a");

    navbarLink.className = "menu__link";
    navbarLink.textContent = `Section ${i}`;

    navbarLink.setAttribute("id", `navItem${i}`);

    if (i === 1) {
      navbarLink.classList.add("active");
    }

    navbarItem.appendChild(navbarLink);
    navbarList.appendChild(navbarItem);
  }
};

const createScrollToTopButton = () => {
  const button = document.createElement("button");
  button.className = "button__scrollTop";
  button.textContent = "⬆ go to Top";
  button.setAttribute("id", "button__scrollTop");

  document.body.getElementsByTagName("main")[0].appendChild(button);
};

const scrollToTop = () => {
  document.body.scrollTo({ top: 0, behavior: "smooth" });
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */
createNavItems();
createScrollToTopButton();

const setActiveStates = () => {
  setTimeout(() => {
    windowHeight = document.body.clientHeight;

    for (let i = 0; i < landingContainer.length; i++) {
      let landingContainerRect = landingContainer[i].getBoundingClientRect();

      if (0 < landingContainerRect.y && landingContainerRect.y < windowHeight) {
        let navbarItem = document.getElementById(`navItem${i + 1}`);

        navbarItem.classList.add("active");
        landingContainer[i].parentElement.classList.add("section__active");
        oldTarget = navbarItem;
        oldSection = landingContainer[i].parentElement;
      } else {
        let navbarItem = document.getElementById(`navItem${i + 1}`);
        navbarItem.classList.remove("active");
        landingContainer[i].parentElement.classList.remove("section__active");
      }
    }
  }, 0);
};

const scrollToSection = (event) => {
  event.preventDefault();
  document.removeEventListener("scroll", setActiveStates);

  if (oldTarget && event.target !== oldTarget && oldSection) {
    oldTarget.classList.remove("active");
    oldSection.classList.remove("section__active");
  }
  let clickedSectionContent = event.target.textContent;
  let sectionId = clickedSectionContent.toLowerCase().replace(" ", "");
  let clickedSection = document.getElementById(sectionId);

  event.target.classList.add("active");
  clickedSection.classList.add("section__active");

  if (windowHeight < 100) {
    event.target.classList.add("active");
  }

  clickedSection.scrollIntoView({ behavior: "smooth" });

  oldTarget = event.target;
  oldSection = clickedSection;

  setTimeout(() => {
    document.addEventListener("scroll", setActiveStates);
  }, 1000);
};

/**
 * End Main Functions
 * Begin Events
 *
 */

document.addEventListener("scroll", setActiveStates);
navbarList.addEventListener("click", scrollToSection);
document
  .getElementById("button__scrollTop")
  .addEventListener("click", scrollToTop);
