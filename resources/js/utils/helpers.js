const defaultAspectRatios = [1, 2, 3, 4];

export const getRandomAspectRatio = () =>
  defaultAspectRatios[Math.floor(Math.random() * defaultAspectRatios.length)];

export const reduceFeaturedSpectacles = (spectacles, factor = 5) => {
  const boxes = spectacles.length / factor;
  const integerBoxes = Math.floor(boxes);
  const decimalBoxes = boxes - integerBoxes;
  const rounds = integerBoxes + (decimalBoxes > 0 ? 1 : 0);
  const acc = [];

  for (let i = 0; i < rounds; i++) {
    const start = i * factor;
    const end = start + factor;
    acc.push(spectacles.slice(start, end));
  }

  return acc;
};
