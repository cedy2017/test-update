'use strict';

module.exports = app => {
  // page
  app.get('/', 'home.index');
  app.get('/property-detail', 'buy.detail');
  app.get('/buy-search', 'buy.buySearch');
  app.get('/buy-result', 'buy.buyResult');
  app.get('/list-property', 'buy.listProperty');
  app.get('/rent-search', 'buy.rentSearch');
  app.get('/rent-result', 'buy.rentResult');
  app.get('/our-team', 'home.ourTeam');
  app.get('/international-list','international.list');
  app.get('/international', 'international.detail');

  app.get('/preview-detail', 'buy.previewDetail');

  app.get('/captcha', 'about.captcha');

  // about
  app.get('/marketing-your-home', 'about.marketingYourHome');
  app.get('/contact-us', 'about.contactUs');
  app.get('/brand-heritage', 'about.brandHeritage');
  app.get('/careers', 'about.careers');
  app.get('/csr', 'about.csr');
  app.get('/management', 'about.management');
  app.get('/marketing-property', 'about.marketingProperty');
  app.get('/art-home', 'about.artHome');
  app.get('/auction-house', 'about.auctionHouse');
  app.get('/video', 'about.video');
  app.get('/full-disclaimer', 'about.fullDisclaimer')

  // keyword search
  app.get('/autofill', 'home.getKeywords');
};
