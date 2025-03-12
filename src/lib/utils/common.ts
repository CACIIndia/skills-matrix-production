export const scrollToSection = (id: string, scrollOffset: number = 460) => {
    const element = document.getElementById(id);
    if (element) {
      const sectionTop =
      element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: sectionTop - 460,
        behavior: "smooth",
      });
    }
}