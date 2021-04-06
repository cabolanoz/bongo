import { PROMENADE_TYPE, CHITCHAT_TYPE } from '../actions/types';
import { Routes } from '../const';

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

export const RouteTo = (type, slug) => {
  switch (type) {
    case PROMENADE_TYPE:
      return Routes.promenade({ slug });
    case CHITCHAT_TYPE:
      return Routes.chitchat({ slug });
    default:
      return Routes.root();
  }
};
