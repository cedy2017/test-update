'use strict';
const { LOCATIONS, REGION, DISTRICTS } = require('./options');
const { toThousands,  splitPhone } = require('./util');
const _ = require('lodash');
var moment = require('moment');

module.exports = app => {
  class HomeController extends app.Controller {

    converHomeData(res) {
      if(!res.length) return [];

      return res.map((item)=>{
        let price,
            url = '',
            type = 'buy';
        if (item.sale[0]) {
          price = item.sale[0].price_ask / 1000000 + 'M';
        } else if(item.lease[0]) {
          price = item.lease[0].rent_ask / 1000 + 'K';
          type = 'rent';
        } else {
          price = 0;
        }
        // if (item.image_gallery.length) {
        //   if (item.image_gallery[2]["600x400"][0]) {
        //     url = item.image_gallery[2]["600x400"][0].image;
        //   }
        // }
        if (item.image_gallery.length) {
          let images = item.image_gallery.find((ga) => {
            if(ga.hasOwnProperty('600x400')) {
              return true;
            }
          });
          url = images['600x400'][0].image;
        }
        return {
          url,
          type,
          id: item.id,
          name: item.name,
          location: item.district,
          sqft: toThousands(+item.saleable_size_sqft || 0),
          time: moment(new Date(item.modified_at)).fromNow(),
          price: toThousands(price),
          avatar: 'http://img5.imgtn.bdimg.com/it/u=484928903,1094087196&fm=26&gp=0.jpg',
        };
      });
    }

    * index() {
      let ctx = this.ctx;
      // 嗯 参考 mock data
      // let soleAgentsRes = yield app.curl(`${app.config.apiUrl}web_property_display/?published_type=MA&limit=12`, {
      //   dataType: 'json'
      // });
      let recomRes, newListRes;
      try {
        recomRes = yield app.curl(`${app.config.apiUrl}web_property_display/?published_type=MA`, {
          dataType: 'json',
          rejectUnauthorized: false,
          timeout: 60000
         });
        newListRes = yield app.curl(`${app.config.apiUrl}web_property_display/?published_type=LA`, {
          dataType: 'json',
          rejectUnauthorized: false,
          timeout: 60000
        });

        recomRes = this.converHomeData(recomRes.data.results);
        newListRes = this.converHomeData(newListRes.data.results);
      } catch(e) {
        console.log(e);
        recomRes = [];
        newListRes = [];
      }

      // soleAgentsRes = this.converHomeData(soleAgentsRes.data.results);
      // console.log('soleAgentsRes' + soleAgentsRes);
      let data = {
        homePage: true,
        apiUrl: app.config.apiUrl,
        DISTRICTS,
        AREA_MIN: [{ key: '0', value: 'below 1000' }, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000],
        AREA_MAX: [1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, { key: '1000000000000', value: '5000 above' }],
        BUY_BUDGET_MIN: [{ key: '0', value: 'below 20 (M)' }, { key: '20000000', value: '20 (M)' }, { key: '25000000', value: '25 (M)' }, { key: '30000000', value: '30 (M)' }, { key: '35000000', value: '35 (M)' }, { key: '40000000', value: '40 (M)' }, { key: '50000000', value: '50 (M)' }, { key: '60000000', value: '60 (M)' }, { key: '80000000', value: '80 (M)' }, { key: '100000000', value: '100 (M)' }],
        BUY_BUDGET_MAX: [{ key: '20000000', value: '20 (M)' }, { key: '25000000', value: '25 (M)' }, { key: '30000000', value: '30 (M)' }, { key: '35000000', value: '35 (M)' }, { key: '40000000', value: '40 (M)' }, { key: '50000000', value: '50 (M)' }, { key: '60000000', value: '60 (M)' }, { key: '80000000', value: '80 (M)' }, { key: '100000000', value: '100 (M)' }, { key: '100000000000000', value: '100 (M) above' }],
        RENT_BUDGET_MIN: [{ key: '0', value: 'below 80 (K)' }, { key: '80000', value: '80 (K)' }, { key: '90000', value: '90 (K)' }, { key: '100000', value: '100 (K)' }, { key: '120000', value: '120 (K)' }, { key: '140000', value: '140 (K)' }, { key: '160000', value: '160 (K)' }, { key: '180000', value: '180 (K)' }, { key: '200000', value: '200 (K)' }],
        RENT_BUDGET_MAX: [{ key: '80000', value: '80 (K)' }, { key: '90000', value: '90 (K)' }, { key: '100000', value: '100 (K)' }, { key: '120000', value: '120 (K)' }, { key: '140000', value: '140 (K)' }, { key: '160000', value: '160 (K)' }, { key: '180000', value: '180 (K)' }, { key: '200000', value: '200 (K)' }, { key: '200000000000000', value: '200 (K) above' }],
        soleAgents:  [{
          url: '/public/images/sole-agent/2.jpg',
          name: 'Property Name',
          avatar: 'http://img5.imgtn.bdimg.com/it/u=484928903,1094087196&fm=26&gp=0.jpg',
          location: 'District',
          time: '2 hr ago',
          price: '2,800(SQ FT.)|HKD 12,330,000'
        },
        {
          url: '/public/images/sole-agent/2.jpg',
          name: 'Property Name',
          avatar: 'http://img5.imgtn.bdimg.com/it/u=484928903,1094087196&fm=26&gp=0.jpg',
          location: 'District',
          time: '2 hr ago',
          price: '2,800(SQ FT.)|HKD 12,330,000'
        },
        {
          url: '/public/images/sole-agent/3.jpg',
          name: 'Property Name',
          avatar: 'http://img5.imgtn.bdimg.com/it/u=484928903,1094087196&fm=26&gp=0.jpg',
          location: 'District',
          time: '2 hr ago',
          price: '2,800(SQ FT.)|HKD 12,330,000'
        },{
          url: '/public/images/sole-agent/4.jpg',
          name: 'Property Name',
          avatar: 'http://img5.imgtn.bdimg.com/it/u=484928903,1094087196&fm=26&gp=0.jpg',
          location: 'District',
          time: '2 hr ago',
          price: '2,800(SQ FT.)|HKD 12,330,000'
        },
        {
          url: '/public/images/sole-agent/5.jpg',
          name: 'Property Name',
          avatar: 'http://img5.imgtn.bdimg.com/it/u=484928903,1094087196&fm=26&gp=0.jpg',
          location: 'District',
          time: '2 hr ago',
          price: '2,800(SQ FT.)|HKD 12,330,000'
        },
        {
          url: '/public/images/sole-agent/6.jpg',
          name: 'Property Name',
          avatar: 'http://img5.imgtn.bdimg.com/it/u=484928903,1094087196&fm=26&gp=0.jpg',
          location: 'District',
          time: '2 hr ago',
          price: '2,800(SQ FT.)|HKD 12,330,000'
        },{
          url: '/public/images/sole-agent/7.jpg',
          name: 'Property Name',
          avatar: 'http://img5.imgtn.bdimg.com/it/u=484928903,1094087196&fm=26&gp=0.jpg',
          location: 'District',
          time: '2 hr ago',
          price: '2,800(SQ FT.)|HKD 12,330,000'
        },
        {
          url: '/public/images/sole-agent/8.jpg',
          name: 'Property Name',
          avatar: 'http://img5.imgtn.bdimg.com/it/u=484928903,1094087196&fm=26&gp=0.jpg',
          location: 'District',
          time: '2 hr ago',
          price: '2,800(SQ FT.)|HKD 12,330,000'
        },
        {
          url: '/public/images/sole-agent/9.jpg',
          name: 'Property Name',
          avatar: 'http://img5.imgtn.bdimg.com/it/u=484928903,1094087196&fm=26&gp=0.jpg',
          location: 'District',
          time: '2 hr ago',
          price: '2,800(SQ FT.)|HKD 12,330,000'
        },
        {
          url: '/public/images/sole-agent/10.jpg',
          name: 'Property Name',
          avatar: 'http://img5.imgtn.bdimg.com/it/u=484928903,1094087196&fm=26&gp=0.jpg',
          location: 'District',
          time: '2 hr ago',
          price: '2,800(SQ FT.)|HKD 12,330,000'
        }
        ,
        {
          url: '/public/images/sole-agent/11.jpg',
          name: 'Property Name',
          avatar: 'http://img5.imgtn.bdimg.com/it/u=484928903,1094087196&fm=26&gp=0.jpg',
          location: 'District',
          time: '2 hr ago',
          price: '2,800(SQ FT.)|HKD 12,330,000'
        }
        ,
        {
          url: '/public/images/sole-agent/12.jpg',
          name: 'Property Name',
          avatar: 'http://img5.imgtn.bdimg.com/it/u=484928903,1094087196&fm=26&gp=0.jpg',
          location: 'District',
          time: '2 hr ago',
          price: '2,800(SQ FT.)|HKD 12,330,000'
        }
        ],
        recomendations: recomRes,
        newListing: newListRes
      }
      ctx.body = yield ctx.renderView('home/home.html', data);
    }

    * getKeywords() {
      let ctx = this.ctx,
          keyword = ctx.request.query.key;
      
      let keywords;
      try {
        const result = yield app.curl(`${app.config.apiUrl}property_search_autofill/?keyword=${keyword}`, {
          dataType: 'json',
          timeout: 60000,
          rejectUnauthorized: false
        });
        let res = result.data;
        if (!_.isArray(res)) {
          res = [];
        } else {
          res = res.slice(0, 20);
        }
        keywords = res.map((item)=>{
          // convert fxck data;
          item = item[0];
          return {
            id: item,
            value: item
          }
        });
      } catch(e) {
        keywords=[];
      }
      ctx.body = JSON.stringify({
        data: keywords
      });;
    }
    
    * ourTeam() {
      let ctx = this.ctx;
      let members = [];
      try {
        const res = yield app.curl(`${app.config.apiUrl}web_agents/`, {
          dataType: 'json',
          timeout: 60000,
          rejectUnauthorized: false
        });
        members = res.data.results;
      } catch(e) {
        console.log(e);
      }
      members = members.map((item)=>{
        item.general_line = splitPhone(item.general_line);
        item.general_line = splitPhone(item.mobile);
        return item;
      });
      members = _.sortBy(members, 'first_name').filter((item)=> item.id != 1);
      let data = {
        activeMenu: 'our-team',
        apiUrl: app.config.apiUrl,
        members,
      }
      ctx.body = yield ctx.renderView('our-team/our-team.html', data);
    }
  }
  return HomeController;
};
