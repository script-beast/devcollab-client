export const showLoader = () => {
  const loader = document.getElementById("backdropLoader");
  if (!loader) return;
  loader.style.opacity = "1";
  loader.style.visibility = "visible";
  document.body.style.overflowY = "hidden";
};

export const hideLoader = () => {
  const loader = document.getElementById("backdropLoader");
  if (!loader) return;
  loader.style.opacity = "0";
  loader.style.visibility = "hidden";
  document.body.style.overflowY = "auto";
};
