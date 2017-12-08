'use strict';
const fs = require('fs');
var svgCaptcha = require('svg-captcha');

var video = require('../model/video.js');
var MobileDetect = require('mobile-detect');

module.exports = app => {
  class AboutController extends app.Controller {
    * careers() {
      let ctx = this.ctx;
      ctx.body = yield ctx.renderView('about/careers.html', {activeMenu: 'about'});
    }

    * contactUs() {
      let ctx = this.ctx,
          type = 'E1',
          queryObj = ctx.request.query;

      if (!queryObj.agent_id && queryObj.property_id) {
        type = 'E2';
      }
      if (queryObj.agent_id && queryObj.property_id) {
        type = 'E3';
      }

      let mobile = (queryObj.mobile || '').replace(/[\s\(\)-]/g, '');
      
      let data = {
        type,
        activeMenu: 'about',
        apiUrl: app.config.apiUrl,
        agentId: queryObj.agent_id,
        unitId: queryObj.property_id,
        name: queryObj.name,
        email: queryObj.email,
        message: queryObj.message,
        mobile,
      }
      ctx.body = yield ctx.renderView('about/contact-us.html', data);
    }

    captcha() {
      let ctx = this.ctx;
      let captcha = svgCaptcha.create();
      ctx.cookies.set('cap', captcha.text, {httpOnly: false});
      ctx.body = captcha.data;
    }

    * marketingYourHome() {
      let ctx = this.ctx;
      ctx.body = yield ctx.renderView('about/marketing-your-home.html', {activeMenu: 'about'});
    }

    * brandHeritage() {
      let ctx = this.ctx;
      let history = [
        {
          img: '/public/images/history/1744.jpeg',
          year: '1744',
          title: 'SOTHEBY\'S AUCTION HOUSE',
          desc: 'In the heart of London on New Bond Street in 1744, an exceptional auction house was born. That house built a revered tradition of uniting collectors with world-class works of art and marketing the world\'s most cherished possessions—a tradition that, now over two centuries old, provides authentic knowledge comparable to none.'
        },{
          img: '/public/images/history/1976.jpeg',
          year: '1976',
          title: 'SOTHEBY\'S INTERNATIONAL REALTY',
          desc: 'Founded on the same commitment to exceptional service that characterized the Sotheby\'s Auction House for more than two centuries, the Sotheby\'s International Realty® brand is created and becomes known around the world for the distinctive properties it represents.'
        },
        {
          img: '/public/images/history/2004.jpeg',
          year: '2004',
          title: 'GLOBAL EXPANSION',
          desc: 'Sotheby\'s enters into a long-term strategic alliance with Realogy Holdings Corp. (NYSE: RLGY), a global leader in real estate franchising and provider of real estate brokerage, relocation and settlement services. The agreement provides for the licensing of the Sotheby\'s International Realty name. The brand begins offering membership in its franchise system to select real estate brokerage companies.'
        },{
          img: '/public/images/history/2006.jpeg',
          year: '2006',
          title: 'SIGNIFICANT SALE',
          desc: 'Prominent Properties Sotheby\'s International Realty in New Jersey sells the Frick Estate, a 63-acre property in Alpine, N.J. formally owned by the grandson of steel-industry magnate Henry Clay Frick, for $58 million USD.'
        },{
          img: '/public/images/history/2008.jpeg',
          year: '2008',
          title: 'SETTING THE STANDARD OF EXCELLENCE',
          desc: 'The brand is named winner of the Franchise Business Review\'s 2008 Best in Category for Real Estate Franchisee Satisfaction award. As well, the brand is rated the most prestigious real estate company by high-net worth consumers in the Luxury Institute\'s 2008 Luxury Brand Status Index survey.'
        },{
          img: '/public/images/history/2009.jpeg',
          year: '2009',
          title: 'SETTING THE STANDARD OF EXCELLENCE',
          desc: 'The brand is named to the Franchise Times Fast 55 list.'
        },
        {
          img: '/public/images/history/2010.jpeg',
          year: '2010',
          title: 'SIGNIFICANT SALE',
          desc: 'Telluride Sotheby\'s International Realty sells BootJack Ranch for approximately $48 million, a price point that at the time is the highest known for a residential sale within the United States in the last 12 months.'
        },{
          img: '/public/images/history/2012.png',
          year: '2012',
          title: 'GLOBAL ACCESS. ANYWHERE. ANYTIME.',
          desc: 'The brand debuts it iPad® app, SIR Mobile, the only luxury real estate mobile app that works anywhere and searches globally.'
        },{
          img: '/public/images/history/2013.jpeg',
          year: '2013',
          title: 'GLOBAL NETWORK',
          desc: 'The brand reported growth in its global network in 2013. At year-end, <i>Sotheby\'s International Realty U.S.</i>-affiliated brokers and sales professionals handled 24 percent more transaction sides in 2013 than 2012 – nearly three times better than the 9.2 percent gain in home sales sides reported for the overall market by the National Association of Realtors®.'
        },{
          img: '/public/images/history/2014.gif',
          year: '2014',
          title: 'BEYOND THE EXTRAORDINARY',
          desc: 'The brand wins Franchise Business Review’s Best in Category for Real Estate Franchisee Satisfaction award for the seventh year in a row. Today, the network totals 700 offices and more than 14,500 sales associates. The network encompasses 52 countries and territories worldwide.'
        },{
          img: '/public/images/history/2015.png',
          year: '2015',
          title: 'THE SOTHEBY\'S INTERNATIONAL REALTY BRAND LAUNCHES AWARD WINNING WEBSITE',
          desc: 'The new Sotheby’s International Realty brand website was recognized by the Web Marketing Association with the "2015 Outstanding Website WebAward" and by W 3 with the "2015 W3 Gold Award." With a great focus on creating the best possible user experience, the new sothebysrealty.com continues the brand\'s tradition of revolutionizing Luxury Real Estate in the digital space.'
        }
      ];
      let data = {
        apiUrl: app.config.apiUrl,
        activeMenu: 'about',
        history,
        historySource: JSON.stringify(history)
      }
      ctx.body = yield ctx.renderView('about/brand-heritage.html', data);
    }

    * csr() {
      let ctx = this.ctx;
      ctx.body = yield ctx.renderView('about/csr.html', {activeMenu: 'about'});
    }

    * management() {
      let ctx = this.ctx;
      ctx.body = yield ctx.renderView('about/management.html', {activeMenu: 'about'});
    }

    * marketingProperty() {
      let ctx = this.ctx;
      ctx.body = yield ctx.renderView('about/marketing-property.html', {activeMenu: 'marketing'});
    }

    * artHome() {
      let ctx = this.ctx;
      ctx.body = yield ctx.renderView('about/art-home.html');
    }

    * auctionHouse() {
      let ctx = this.ctx;
      ctx.body = yield ctx.renderView('about/auction-house.html');
    }
    * video() {
      let ctx = this.ctx;
      let mobileDetect = new MobileDetect(ctx.req.headers['user-agent']);
      let type = ['brand', 'live', 'angles', 'lifestyle', 'houseguest'];
      ctx.body = yield ctx.renderView('about/video.html', {
        activeMenu: 'marketing',
        type,
        video,
        isMobile: mobileDetect.is('iPhone') || mobileDetect.is('AndroidOS')
      });
    }

    * fullDisclaimer() {
      let ctx = this.ctx;
      ctx.body = yield ctx.renderView('about/full-disclaimer.html');
    }

  }
  return AboutController;
};
