export const getFreshId = () => {
  return new Date().getTime().toString();
};

export const scrollToElementWithId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "nearest",
  });
};
