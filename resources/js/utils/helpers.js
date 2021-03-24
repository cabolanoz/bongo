const defaultAspectRatios = [1, 2, 3, 4];

export const getRandomAspectRatio = () =>
  defaultAspectRatios[Math.floor(Math.random() * defaultAspectRatios.length)];
