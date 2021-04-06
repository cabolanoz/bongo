import featuredPromenadesReducer from './featured_promenades';
import prominentPromenadesReducer from './prominent_promenades';
import featuredChitchatsReducer from './featured_chitchats';
import prominentChitchatsReducer from './prominent_chitchats';
import commercialsReducer from './commercials';
import modalReducer from './modal';

export default (
  {
    featuredPromenades,
    prominentPromenades,
    featuredChitchats,
    prominentChitchats,
    commercials,
    modal
  },
  action
) => ({
  featuredPromenades: featuredPromenadesReducer(featuredPromenades, action),
  prominentPromenades: prominentPromenadesReducer(prominentPromenades, action),
  featuredChitchats: featuredChitchatsReducer(featuredChitchats, action),
  prominentChitchats: prominentChitchatsReducer(prominentChitchats, action),
  commercials: commercialsReducer(commercials, action),
  modal: modalReducer(modal, action),
});
