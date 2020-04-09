import withRoot from './components/landingPage/withRoot';
// --- Post bootstrap -----
import React from 'react';
import ProductSmokingHero from './components/landingPage/views/ProductSmokingHero';
import AppFooter from './components/landingPage/views/AppFooter';
import ProductHero from './components/landingPage/views/ProductHero';
import ProductHowItWorks from './components/landingPage/views/ProductHowItWorks';
import AppAppBar from './components/landingPage/views/AppAppBar';

function Landing() {
  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero />
      <ProductHowItWorks />
      <ProductSmokingHero />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Landing);