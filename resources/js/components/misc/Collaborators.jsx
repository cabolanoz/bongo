import React from 'react';

import '../../styles/collaborators.scss';

const COLLABORATOR_PATH = '/images/collaborators/';
const COLLABORATORS = Object.freeze([
  { logo: 'nj_andlogo.jpg', siteUrl: '' },
  { logo: 'nj_rutamayalogo.jpg', siteUrl: '' },
  { logo: 'nj_rdlogo.jpg', siteUrl: '' },
  { logo: 'nj_paclogo.jpg', siteUrl: '' },
  { logo: 'nj_aflogo.jpg', siteUrl: '' },
  { logo: 'nj_casadelos3mundoslogo.jpg', siteUrl: 'http://c3mundos.org/' },
  { logo: 'nj_fipglogo.jpg', siteUrl: 'https://www.festivalpoesianicaragua.com/' },
  { logo: 'nj-CasamejiaGodoy.jpg', siteUrl: 'http://www.losmejiagodoy.com/' },
  { logo: 'nj-redtipitapa.jpg', siteUrl: 'https://www.facebook.com/redculturaldetipitapa' },
  { logo: 'nj-chillot.jpg', siteUrl: 'https://www.facebook.com/Chilloutloungemanagua' },
  { logo: 'nj-ronkonrolas.jpg', siteUrl: 'https://www.facebook.com/ron.kon.rolas.oficial/' },
  { logo: 'nj-elcaramanchel.jpg', siteUrl: 'https://www.facebook.com/el.caramanchel/' },
  { logo: 'nj-otraembajada.jpg', siteUrl: 'https://www.facebook.com/laotraembajada/' },
  { logo: 'nj-SaxoProducciones.jpg', siteUrl: 'https://www.facebook.com/ProduccionSaXo' },
  { logo: 'nj-proyectovigoron.jpg', siteUrl: 'https://www.facebook.com/provigoron/' },
  { logo: 'nj-djavu.jpg', siteUrl: 'https://www.facebook.com/acustico.dejavu' },
  { logo: 'hashtag_rockbar.jpg', siteUrl: 'https://www.facebook.com/Hashtag-Rock-Bar-649876435153179/' },
  { logo: 'nj-TeatroJustoRufinoGaray.jpg', siteUrl: 'http://www.rufinos.org/' },
  { logo: 'nj-ccen.jpg', siteUrl: 'http://www.ccenicaragua.org/' },
  { logo: 'nj-ccguanuca.jpg', siteUrl: 'https://www.facebook.com/Centro-Cultural-Guanuca-311210419814/' }
]);

const ALLY_PATH = '/images/allies/';
const ALLIES = Object.freeze([
  { logo: 'nj-ChacuaTool.jpg', siteUrl: 'http://www.chacuatool.com/' },
  { logo: 'nj-NicaMovil.jpg', siteUrl: '' },
  { logo: 'nj-infobot.jpg', siteUrl: 'http://infobotapp.com/' },
  { logo: 'nj-lapulga.jpg', siteUrl: 'http://lapulga.com.ni/' },
  { logo: 'nj_UAM.jpg', siteUrl: 'http://www.uam.edu.ni/' },
  { logo: 'nj_UPOLI.jpg', siteUrl: 'https://www.upoli.edu.ni/' },
  { logo: 'nj_altantologo.jpg', siteUrl: 'http://www.altanto.com.ni/' },
]);

const CollaboratorThumbnail = ({ logo, siteUrl, collaborator }) => {
  const url = siteUrl || '#';
  const target = siteUrl ? '_blank' : '';
  const path = collaborator ? COLLABORATOR_PATH : ALLY_PATH;

  return (
    <div className="col-md-2 col-sm-3 col-6 collaborators__wrapper">
      <a className="collaborators__thumbnail" href={url} target={target}>
        <img src={path.concat(logo)} alt="Logo Colaborador" className="img-fluid"/>
      </a>
    </div>
  );
};

const Collaborators = () => (
  <div className="collaborators">
    <div className="container">
      <h1 className="collaborators__title mb-5">NUESTROS COLABORADORES</h1>
      <div className="row">
        {COLLABORATORS.map(collaborator => <CollaboratorThumbnail key={collaborator.logo} {...collaborator} collaborator />)}
      </div>
      <h1 className="collaborators__title my-5">NUESTROS ALIADOS</h1>
      <div className="row">
        {ALLIES.map(ally => <CollaboratorThumbnail key={ally.logo} {...ally} />)}
      </div>
    </div>
  </div>
);

export default Collaborators;
