export const removeMassiveClass = (Collection, className) => {
  [...Collection].map((elem) => {
    elem.classList.remove(className);
  });
};
