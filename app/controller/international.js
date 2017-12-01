'use strict';

const LIST_DATA = [{
  name: 'The Woolworth Pinnacle Penthouse',
  address: 'New York, United States',
  pic: '/public/international/woolworth/thumb.jpg',
  id: 'woolworth'
},{
  name: 'Four Seasons Private Residences',
  address: 'Montreal, Canada',
  pic: '/public/international/fourseason/thumb.jpg',
  id: 'fourseason'
}];

const AGENT_CHAN = {
  id: "1",
  first_name: "Binoche",
  last_name: "Chan",
  title: "COO",
  agent_number: "E343556",
  general_line: '3793 3672',
  mobile: '9171 1870',
  profile_pic: "/public/our-team/binoche_chan.jpg"
}

const DETAIL_DATA = {
  woolworth: {
    name:'The Woolworth Pinnacle Penthouse –',
    urlName: 'The Woolworth Pinnacle Penthouse',
    address: 'New York, United States',
    gallery: [
      {
        caption: '',
        video: '/public/international/woolworth/woolworth01.m4v',
        image: '/public/international/woolworth/video1.png',
      },{
        caption: '',
        video: '/public/sotheby_videos/international/woolworth02.mp4',
        image: '/public/international/woolworth/video2.png',
      },
      {
        caption: '',
        image: '/public/international/woolworth/02.jpg',
      },
      {
        caption: '',
        image: '/public/international/woolworth/03.jpg',
      },
      {
        caption: '',
        image: '/public/international/woolworth/04.jpg',
      },
      {
        caption: '',
        image: '/public/international/woolworth/05.jpg',
      },
      {
        caption: '',
        image: '/public/international/woolworth/06.jpg',
      },
      {
        caption: '',
        image: '/public/international/woolworth/07.jpg',
      },
      {
        caption: '',
        image: '/public/international/woolworth/08.jpg',
      },
      {
        caption: '',
        image: '/public/international/woolworth/09.jpg',
      },
      {
        caption: '',
        image: '/public/international/woolworth/10.jpg',
      },
      {
        caption: '',
        image: '/public/international/woolworth/11.jpg',
      }
    ],
    agentObj: AGENT_CHAN,
    propertyDesc: [
      'The Woolworth Pinnacle Penthouse is one of a kind five-floor residence atop a celebrated New York Landmark. At the peak of New York’s most iconic residential condominium, reigns over lower Manhattan like a castle in the sky. Commissioned by F.W. Woolworth, and designed by Cass Gilbert, the Woolworth Building -- a national historic landmark -- stood as the tallest structure in the world when completed in 1913 — now, its legendary crown will have an extraordinary, original penthouse residence.',
      'The Woolworth Building was inaugurated on April 24, 1913, when President Woodrow Wilson flipped a switch in the White House, boldly illuminating the world’s then tallest building. From that moment on, Woolworth and Gilbert’s creation became an instant icon of architectural achievement for an entire city and nation. Over a century later, a rebirth is taking place at this National Historic Landmark. The Woolworth Tower Residences, developed by Alchemy Properties, will carry on the pioneering spirit and attention to detail embedded in this structure by its creators. The 33 individually crafted condominium residences start on the 29th floor and have been designed by world-renowned French architect, Thierry W Despont.',
      'Location: The beacon of Tribeca and Downtown Manhattan, The Woolworth Pinnacle Penthouse is prominently positioned across from City Hall Park with a commanding view of the entire Manhattan skyline. Highlights of the thriving neighborhood include cobblestoned side streets, the adjacent Westfield Center, Brookfield Place with world class shopping, and superb dining choices with easy access to a stroll in Hudson River Park and Promenade.'
    ]
  },
  fourseason: {
    name:'Four Seasons Private Residences  -',
    urlName: 'Four Seasons Private Residences',
    address: 'Montreal, Canada',
    gallery: [
      {
        caption: '',
        image: '/public/international/fourseason/01_four_seasons.jpg',
      },
      {
        caption: '',
        image: '/public/international/fourseason/02_four_seasons.jpg',
      },
      {
        caption: '',
        image: '/public/international/fourseason/03_four_seasons.jpg',
      },
      {
        caption: '',
        image: '/public/international/fourseason/04_four_seasons.jpg',
      },
      {
        caption: '',
        image: '/public/international/fourseason/05_four_seasons.jpg',
      },
      {
        caption: '',
        image: '/public/international/fourseason/06_four_seasons.jpg',
      },
      {
        caption: '',
        image: '/public/international/fourseason/07_four_seasons.jpg',
      },
      {
        caption: '',
        image: '/public/international/fourseason/08_four_seasons.jpg',
      },
      {
        caption: '',
        image: '/public/international/fourseason/09_four_seasons.jpg',
      }
    ],
    agentObj: AGENT_CHAN,
    propertyDesc: [
      'A place like no other Four Seasons Private Residences, Montreal Canada.',
      'The Residences sit perched atop Montreal’s newest flagship Four Seasons Hotel.  It is enveloped by the glow of Montreal’s unique “haute joie de vivre” sensibility. It is a place like no other and one reserved for only a privileged few.',
      'Starting on the 14th floor of the Four Seasons Hotel, housing only 18 private beautiful residences, it is redefining affluent living through a modern expression of luxury, characterized by rare and original experiences and personalized comforts all in tune with the whims and desires of each of its unique inhabitants. '
    ]
  }
}

module.exports = app => {
  class International extends app.Controller {
    * list() {
      let data = {
        activeMenu: 'international',
        data: LIST_DATA,
      };
      this.ctx.body = yield this.ctx.renderView('/international/international-list.html', data);
    }

    * detail() {
      let ctx = this.ctx,
          queryObj = ctx.request.query,
          pageUrl = encodeURIComponent(`${app.config.host}${ctx.request.originalUrl}`),
          property = DETAIL_DATA[queryObj.id] || {};

      let data = {
        activeMenu: 'international',
        property,
        pageUrl,
        host: ""
      };
      ctx.body = yield ctx.renderView('/international/international.html', data);
    }
  }
  return International;
};
