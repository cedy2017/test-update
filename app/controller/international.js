'use strict';

const LIST_DATA = [{
  name: 'The Woolworth Pinnacle Penthouse',
  address: 'New York, United States',
  pic: '/public/international/woolworth/thumb.jpg',
  id: 'woolworth'
},{
  name: 'Four Seasons Private Residences Montreal',
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
    name:'The Woolworth Pinnacle Penthouse',
    urlName: 'The Woolworth Pinnacle Penthouse',
    address: 'New York, United States',
    title: 'Castle in the air',
    queryType: 'E4',
    gallery: [
      {
        caption: '',
        video: '/public/sotheby_videos/international/woolworth01.m4v',
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
      'The Woolworth Pinnacle Penthouse located in vibrant lower Manhattan in New York City, among the same avenues and cobblestone streets often frequented by visionaries, intellectuals, artists, and celebrities of the past, this iconic architectural masterpiece combines early 20th century craftsmanship with today’s modern technology, setting a new standard for exclusive luxury living. ',
      'Ever so often, one is fortunate to witness a special moment in architectural history that sets a new standard of luxury and exclusivity. Completed in 1913, the iconic Woolworth Building was an architectural masterpiece of its time, representing an unprece-dented level of structural and artistic innovation, standing higher than any other known structure worldwide at the time of its completion. At a majestic 792 feet, this national historic landmark continues its reign as part of the iconic New York City skyline. For those seeking to own a part of the rich cultural history of this special location, one has but to witness the grandeur of The Woolworth Pinnacle Penthouse, the crowning glory of this long revered national historic landmark.',
      'The iconic residence sits atop the 50th floor of the Woolworth Building in lower Manhattan comprising five levels creating a stately 9,710 sq ft interior, not to mention a 408 sq ft private observatory terrace with 360 degree views of the Empire State Building, Brooklyn Bridge, Hudson River, and New York Harbor. Alluding to an era of old-Hollywood glamour seldom found today, this stunning home featuring twenty-four foot high ceilings and a private elevator is the result of a careful historical renovation high-lighting grand living spaces, luxury materials and contemporary appliances and electronics. Exclusive resident amenities include full-time concierge service with a 24-hour doorman, a beautifully restored indoor pool, fitness studio, and wine cellar with a tasting room, to name a few.'
    ]
  },
  fourseason: {
    name:'Four Seasons Private Residences Montreal',
    urlName: 'Four Seasons Private Residences Montreal',
    address: 'Montreal, Canada',
    title: 'World Renowned Luxury Meets Old World Art & Culture',
    queryType: 'E5',
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
      'Four Seasons Private Residences are centrally located on Rue de la Montagne, in the heart of Montreal. Developed by renowned Canadian developer, Carbonleo and sat atop Montreal’s new Four Seasons Hotel, the Philip Hazan designed units will offer new owners the styling and finishes that Four Seasons has become synonymous with. Limited to only eighteen exclusive apartments, residents will have their every need attended to by a dedicated Director of Residences working alongside a Four Seasons Private Residence Concierge. Once in residence, owners will be able to take advantage of Four Seasons Hotel facilities including a state-of-the-art spa, an indoor pool, fitness centre and extensive event spaces including a 6,000-square-foot ballroom. In addition, the hotel will play host to World Class dining venues all anchored by a renowned chef.', 
      
     'Linking directly to the ecosystem of Four Seasons Hotel and Private Residences is Canada’s iconic Ogilvy department store, which has been a landmark in Montreal for over a century while the Montreal Museum of Fine Arts is merely a block away. ',
      
     'Four Seasons Private Residences, Montreal offers residents the chance to experience the acclaimed luxury and prestige that Four Seasons Hotels are famed for in one of Canada’s most cosmopolitan and dynamic historical cities, blending historic European culture with modern style and sophistication.'
     
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
