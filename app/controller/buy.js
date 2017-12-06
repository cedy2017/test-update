'use strict';
const { LOCATIONS, REGION, DISTRICTS, CONDITION_STATUS } = require('./options');
const { toThousands,  splitPhone } = require('./util');
var moment = require('moment');
var MobileDetect = require('mobile-detect');
var _ = require('lodash');
// const { result } = require('./mock-data')
const buildInfoFilterKey = [
  'op_date',
  // 'have_sauna',
  // 'have_jacuzzi',
  // 'have_sun_bathing_area',
  // 'have_massage_room',
  // 'have_beauty_salon',
  // 'have_steam_suite',
  // 'have_spa_gallery',
  // 'have_karaoke',
  // "have_model_boat_pools",
  // "have_model_car_racing_circuit",
  // "have_barbecue_area",
  // "have_bar",
  // "have_theatre",
  // "have_mahjong_rooms",
  // "have_indoor_swimming_pool",
  // "have_outdor_swimming_pool",
  // "have_childrens_pool",
  // "have_table_tennis",
  // "have_squash_court",
  // "have_gym",
  // "have_aerobics_exercise_room",
  // "have_bowling_court",
  // "have_rock_climbing_wall",
  // "have_changing_rooms",
  // "have_judo_or_yoga_room",
  // "have_snooker_or_lard_room",
  // "have_basketball_court",
  // "have_tennis_court",
  // "have_badminton_court",
  // "have_dance_room",
  // "have_jogging_path",
  // "have_indoor_play_area_or_game_room",
  // "have_golf_simulator",
  // "have_golf_driving_range",
  // "have_childrens_playground_or_children_exercise",
  // "have_library",
  // "have_function_rooms",
  // "have_tai_chi_corner",
  // "have_reading_room",
  // "have_music_room",
  // "have_computer_room",
  // "have_sky_garden",
  // "have_landscapped_garden",
  // "have_podium_garden",
  // "have_lounge",
  // "have_shuttle_bus",
  // 'close_to_mtr',
  // 'close_to_bus_stop',
  // 'close_to_minibus_stop',
  // 'close_to_tram_station',
  // 'close_to_peak_tram_station',
  // 'close_to_escalator',
  // 'close_to_airport_express',
  // 'close_to_train_station',
  // 'close_to_express_rail_link',
  // 'close_to_ferry_pier',
  // 'close_to_airport',
  // 'close_to_light_rail_station',
  // 'close_to_wet_market',
  // 'close_to_shopping_arcade',
  // 'close_to_supermarket',
  'facilities_display',
  'developer',
];

const districtFilterKey = [
  'kindergarten_network',
  'primary_school_network',
  'secondary_school_network',
  'international_school_network',
];

module.exports = app => {
  class BuyController extends app.Controller {

    * buySearch() {
      let ctx = this.ctx;
      let data = {
        apiUrl: app.config.apiUrl,
        activeMenu: 'buy',
        LOCATIONS,
        REGION,
        DISTRICTS,
        CONDITION_STATUS,
        AREA_MIN: [{ key: '0', value: 'below 1000' }, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000],
        AREA_MAX: [1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, { key: '1000000000000', value: '5000 above' }],
        BUDGET_MIN: [{ key: '0', value: 'below 20 (M)' }, { key: '20000000', value: '20 (M)' }, { key: '25000000', value: '25 (M)' }, { key: '30000000', value: '30 (M)' }, { key: '35000000', value: '35 (M)' }, { key: '40000000', value: '40 (M)' }, { key: '50000000', value: '50 (M)' }, { key: '60000000', value: '60 (M)' }, { key: '80000000', value: '80 (M)' }, { key: '100000000', value: '100 (M)' }],
        BUDGET_MAX: [{ key: '20000000', value: '20 (M)' }, { key: '25000000', value: '25 (M)' }, { key: '30000000', value: '30 (M)' }, { key: '35000000', value: '35 (M)' }, { key: '40000000', value: '40 (M)' }, { key: '50000000', value: '50 (M)' }, { key: '60000000', value: '60 (M)' }, { key: '80000000', value: '80 (M)' }, { key: '100000000', value: '100 (M)' }, { key: '100000000000000', value: '100 (M) above' }],
        BED_MIN: [0, 1, 2, 3, 4,5,6,7,8,9,10],
        BED_MAX: [0, 1, 2, 3, 4,5,6,7,8,9,10],
        BATH_MIN: [0, 1, 2, 3, 4,5,6,7,8,9,10],
        BATH_MAX: [0, 1, 2, 3, 4,5,6,7,8,9,10],
        CAR_MIN: [0, 1, 2, 3, 4,5,6,7,8,9,10],
        CAR_MAX: [0, 1, 2, 3, 4,5,6,7,8,9,10],
        districtSource: JSON.stringify(DISTRICTS),
      }
      ctx.body = yield ctx.renderView('search/search.html', data);
    }

    * listProperty() {
      let ctx = this.ctx;
      ctx.body = yield ctx.renderView('search/list-property.html');
    }

    * buyResult() {
      yield this.findResult('buy');
    }

    * rentSearch() {
      let ctx = this.ctx;
      let data = {
        apiUrl: app.config.apiUrl,
        activeMenu: 'rent',
        LOCATIONS,
        REGION,
        DISTRICTS,
        CONDITION_STATUS,
        AREA_MIN: [{ key: '0', value: 'below 1000' }, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000],
        AREA_MAX: [1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, { key: '1000000000000', value: '5000 above' }],
        BUDGET_MIN: [{ key: '0', value: 'below 80 (K)' }, { key: '80000', value: '80 (K)' }, { key: '90000', value: '90 (K)' }, { key: '100000', value: '100 (K)' }, { key: '120000', value: '120 (K)' }, { key: '140000', value: '140 (K)' }, { key: '160000', value: '160 (K)' }, { key: '180000', value: '180 (K)' }, { key: '200000', value: '200 (K)' }],
        BUDGET_MAX: [{ key: '80000', value: '80 (K)' }, { key: '90000', value: '90 (K)' }, { key: '100000', value: '100 (K)' }, { key: '120000', value: '120 (K)' }, { key: '140000', value: '140 (K)' }, { key: '160000', value: '160 (K)' }, { key: '180000', value: '180 (K)' }, { key: '200000', value: '200 (K)' }, { key: '200000000000000', value: '200 (K) above' }],
        BED_MIN: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        BED_MAX: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        BATH_MIN: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        BATH_MAX: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        CAR_MIN: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        CAR_MAX: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        districtSource: JSON.stringify(DISTRICTS),
      }
      ctx.body = yield ctx.renderView('search/search.html', data);
    }

    * rentResult() {
      let exData = {
        BUDGET_MIN: [{ key: '0', value: 'below 80 (K)' }, { key: '80000', value: '80 (K)' }, { key: '90000', value: '90 (K)' }, { key: '100000', value: '100 (K)' }, { key: '120000', value: '120 (K)' }, { key: '140000', value: '140 (K)' }, { key: '160000', value: '160 (K)' }, { key: '180000', value: '180 (K)' }, { key: '200000', value: '200 (K)' }],
        BUDGET_MAX: [{ key: '80000', value: '80 (K)' }, { key: '90000', value: '90 (K)' }, { key: '100000', value: '100 (K)' }, { key: '120000', value: '120 (K)' }, { key: '140000', value: '140 (K)' }, { key: '160000', value: '160 (K)' }, { key: '180000', value: '180 (K)' }, { key: '200000', value: '200 (K)' }, { key: '200000000000000', value: '200 (K) above' }]
      };
      yield this.findResult('rent', exData);
    }

    * findResult(type, exData) {
      let ctx = this.ctx,
          queryObj = ctx.request.query,
          queryStr = '?',
          result = [],
          pages = {},
          queryArr = ['search_type=' + type, 'limit=8'],
          pagesQuery = [];
      for(let key in queryObj) {
        if(queryObj[key] != '' && queryObj[key] != ' ' && queryObj[key] != 0) {
          let queryRes = key + '=' + queryObj[key];
          queryArr.push(queryRes);
          if(key!=='offset') {
            pagesQuery.push(queryRes);
          } 
        }
      }
      queryStr += queryArr.join('&');
      try {
        let searchUrl = `${app.config.apiUrl}web_property_search/${queryStr}`;
        const res = yield app.curl(searchUrl, {
          dataType: 'json',
          rejectUnauthorized: false,
          timeout: 60000
        });
        let pagesQueryStr = pagesQuery.join('&');
        result = this.convertFxckData(res.data.results, type);
        pages.total = res.data.count;
        pages.totalPages = Math.ceil(res.data.count / 8);
        pages.currPage = (queryObj.offset || 0) / 8 + 1;
        pages.prevUrl = pages.currPage == 1 ? 'javascript:void(0);' : type + '-result?' + pagesQueryStr + '&offset=' + (pages.currPage - 2) * 8;
        pages.nextUrl = pages.currPage == pages.totalPages ? 'javascript:void(0);' : type + '-result?' + pagesQueryStr + '&offset=' + (pages.currPage) * 8;
        pages.pagination = [];

        for(let i = Math.max(1, pages.currPage - 3); i < pages.currPage; i++) {
          let pageItem = {
            params: type + '-result?' + 'offset=' + (i - 1) * 8 + '&' + pagesQueryStr,
            page: i
          }
          pages.pagination.push(pageItem);
        }

        for(let i = pages.currPage; i <= Math.min(pages.totalPages, pages.currPage + 3); i++) {
          let pageItem = {
            params: type + '-result?' + 'offset=' + (i - 1) * 8 + '&' + pagesQueryStr,
            page: i
          }
          pages.pagination.push(pageItem);
        }

      } catch(e) {
        console.log(e);
        result = [];
      }
      let distType, autoValues;
      if (queryObj.location && queryObj.location == ' ' ) {
        distType = 'ALL';
      } else {
        distType = queryObj.location
      }
      let data = {
        apiUrl: app.config.apiUrl,
        activeMenu: type,
        query: queryObj,
        LOCATIONS,
        REGION,
        DISTRICTS: DISTRICTS[distType],
        CONDITION_STATUS,
        AREA_MIN: [{ key: '0', value: 'below 1000' }, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000],
        AREA_MAX: [1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, { key: '1000000000000', value: '5000 above' }],
        BUDGET_MIN: [{ key: '0', value: 'Below 20 (M)' }, { key: '20000000', value: '20 (M)' }, { key: '25000000', value: '25 (M)' }, { key: '30000000', value: '30 (M)' }, { key: '35000000', value: '35 (M)' }, { key: '40000000', value: '40 (M)' }, { key: '50000000', value: '50 (M)' }, { key: '60000000', value: '60 (M)' }, { key: '80000000', value: '80 (M)' }, { key: '100000000', value: '100 (M)' }],
        BUDGET_MAX: [{ key: '20000000', value: '20 (M)' }, { key: '25000000', value: '25 (M)' }, { key: '30000000', value: '30 (M)' }, { key: '35000000', value: '35 (M)' }, { key: '40000000', value: '40 (M)' }, { key: '50000000', value: '50 (M)' }, { key: '60000000', value: '60 (M)' }, { key: '80000000', value: '80 (M)' }, { key: '100000000', value: '100 (M)' }, { key: '100000000000000', value: '100 (M) above' }],
        result: result,
        pages,
        districtSource: JSON.stringify(DISTRICTS)
      }
      ctx.body = yield ctx.renderView('buy/buy.html', Object.assign(data, exData));
    }

    * previewDetail() {
        let ctx = this.ctx,
            res,
            rateInfo,
            resData = {},
            queryObj = ctx.request.query;

        try {
          rateInfo = yield ctx.service.rate.get();
          res = yield app.curl(`${app.config.apiUrl}web_units/${queryObj.unit_id}/webpage/${queryObj.page_id}/get_preview/?what_to_do=get_preview`, {
            dataType: 'json',
            rejectUnauthorized: false,
            timeout: 60000
          });
          queryObj.id = queryObj.unit_id;
          resData = res.data.unit;
          // preview data 更合适~    '_'
          let unit_array = [];
          for (let key in res.data.descriptions) {
            let descArray = res.data.descriptions[key];
            for(let i = 0; i < descArray.length; i++) {
              var item = descArray[i];
              item.caption_value_bak = item.caption_value;
              item.caption_value = item.feature_value;
            }
            unit_array.push({[key]: res.data.descriptions[key]});
          }
          resData.unit_features = unit_array;
          resData.image_gallery[0]["1800x1200"] = res.data.photos;
          res = this.convertPropertyDetail(resData);
        } catch(e) {
          console.log(e);
          resData = {};
          res = {
            position: {
              lat: 0,
              lng:0
            },
            showMap: false
          };
        }

        let mobileDetect = new MobileDetect(ctx.req.headers['user-agent']);

        let data = {
          apiUrl: app.config.apiUrl,
          host: app.config.host,
          activeMenu: queryObj['search_type'] || 'buy',
          googleMap: app.config.googleMap,
          rateInfo,
          property: res,
          unitId: queryObj.id,
          preEmail: queryObj.email || '',
          preName: queryObj.name || '',
          preMobile: queryObj.mobile || '',
          preMessage: queryObj.message || '',
          pageUrl: encodeURIComponent(`${app.config.host}${ctx.request.originalUrl}`),
          isMobile: mobileDetect.is('iPhone') || mobileDetect.is('AndroidOS')
        }
        ctx.body = yield ctx.renderView('/buy/detail.html', data);
    }

    * detail() {
      let ctx = this.ctx,
          res,
          rateInfo,
          queryObj = ctx.request.query;
      try {
        rateInfo = yield ctx.service.rate.get();
        res = yield app.curl(`${app.config.apiUrl}web_units/${queryObj.id}/`, {
          dataType: 'json',
          rejectUnauthorized: false
        });
        res = this.convertPropertyDetail(res.data);
      } catch(e) {
        console.log(e);
        res = {
          position: {
            lat: 0,
            lng:0,
          },
          showMap: false,
        };
      }

      let mobileDetect = new MobileDetect(ctx.req.headers['user-agent']);

      let data = {
        apiUrl: app.config.apiUrl,
        host: app.config.host,
        activeMenu: queryObj['search_type'] || 'buy',
        googleMap: app.config.googleMap,
        rateInfo,
        property: res,
        unitId: queryObj.id,
        preEmail: queryObj.email || '',
        preName: queryObj.name || '',
        preMobile: queryObj.mobile || '',
        preMessage: queryObj.message || '',
        pageUrl: encodeURIComponent(`${app.config.host}${ctx.request.originalUrl}`),
        isMobile: mobileDetect.is('iPhone') || mobileDetect.is('AndroidOS')
      }
      ctx.body = yield ctx.renderView('/buy/detail.html', data);
    }

    // * search() {
    //   let ctx = this.ctx;
    //   let queryObj = ctx.request.query;

    //   const result = yield app.curl(`${app.config.apiUrl}web_property_searchl/`, {
    //     dataType: 'json',
    //   });
    // }

    convertFxckData(res, type) {
      if(!res) return [];
      return res.map((item)=>{
        let price,
            url = '',
            images = [],
            buildInfo = [],
            gallery;
        if (item.sale[0]) {
          price = +item.sale[0].price_ask;
        } else if(item.lease[0]) {
          price = +item.lease[0].rent_ask;
        } else {
          price = 0
        }

        if (type == 'rent'){
          price = +item.lease[0].rent_ask;
        }

        price = price === 0 ? 'Price Upon Request' : 'HKD ' + toThousands(price);
        
        if (item.image_gallery.length) {
          url = item.image_gallery[2]["600x400"][0].image;
        }
        gallery = item.image_gallery[2]["600x400"];
        images = gallery.map(function(item) {
          return item.image;
        });
        let sqft = toThousands(+item.saleable_size_sqft || 0)
        return {
          url,
          id: item.id,
          name: item.name,
          location: item.district,
          loveValue: [item.id, url, item.name, item.address, sqft, toThousands(+price)].join('|_|'),
          sqft,
          time: moment(new Date(item.modified_at)).fromNow(),
          price,
          images,
          avatar: 'http://img5.imgtn.bdimg.com/it/u=484928903,1094087196&fm=26&gp=0.jpg',
        };
      });
    }

    convertPropertyDetail(res) {
      if(!res) return {};
      let price,
          url = '',
          images = [],
          saleObj = {},
          rentObj = {},
          agentObj = {},
          gallery = [],
          unitDesc = {},
          buildInfo = [],
          districtInfo = [],
          exitAgent = false;

      if (res.sale[0]) {
        saleObj = res.sale[0];
      }
      if (res.lease[0]) {
        rentObj = res.lease[0];
      }
      if(!!res.sale[0]) {
        agentObj = saleObj.listing_agent || {};
        if(saleObj.listing_agent || saleObj.sole_agent) {
          exitAgent = true;
        }
      } else if(!!res.lease[0]) {
        agentObj = rentObj.listing_agent || {};
        if(rentObj.listing_agent || rentObj.sole_agent) {
          exitAgent = true;
        }
      } else {
        agentObj = {};
      }
      if(!exitAgent) {
        agentObj.showEnquiry = true;  
      }
      agentObj.general_line = splitPhone(agentObj.general_line);
      agentObj.mobile = splitPhone(agentObj.mobile);
      if (res.image_gallery.length) {
        images = res.image_gallery.find((item) => {
          if(item.hasOwnProperty('1800x1200')) {
            return true;
          }
        });
        gallery = images['1800x1200'];
      }
      if(gallery.length) {
        url = gallery[0].image;
      }
      if (res.unit_features && res.unit_features.length) {
        unitDesc.vi = res.unit_features.find((item) => {
          if(item.hasOwnProperty('VI')) {
            return true;
          }
        });
        unitDesc.vi = unitDesc.vi ? unitDesc.vi.VI : [];

        unitDesc.ic = res.unit_features.find((item) => {
          if(item.hasOwnProperty('IC')) {
            return true;
          }
        });
        unitDesc.ic = unitDesc.ic ? unitDesc.ic.IC : [];

        unitDesc.od = res.unit_features.find((item) => {
          if(item.hasOwnProperty('OD')) {
            return true;
          }
        });
        unitDesc.od = unitDesc.od ? unitDesc.od.OD : [];
      }

      if(res.block) {
        for(let key in res.block) {
          if (buildInfoFilterKey.indexOf(key) < 0) continue;
          let value = res.block[key]
          if(value !== false && value !== '' && value !== null) {
            if(_.isBoolean(value)) { value = ''; }
            if(key === 'op_date') {
              value = moment(value).format('YYYY-MM');
            }
            buildInfo.push({key, value});
          }
        }
        for(let key in res.block) {
          if(districtFilterKey.indexOf(key) < 0) continue;
          let value = res.block[key]
          if(value !== false && value !== '' && value !== null) {
            if(_.isBoolean(value)) { value = ''; }
            districtInfo.push({key, value});
          }
        }
      }
      let areaSqft = toThousands(+res.saleable_size_sqft);
      return {
        id: res.id,
        name: res.name,
        address: res.address,
        areaSqft,
        bed: res.bedroom_include_ensuite,
        bath: +res.bathroom,
        carPark: res.num_car_park || 0,
        unitDesc,
        buildInfo,
        districtInfo,
        loveValue: [res.id, url, res.name, res.address, areaSqft, toThousands(+saleObj.price_ask || +rentObj.rent_ask)].join('|_|'),
        sale: {
          show: !!res.sale[0],
          price: saleObj.price_ask,
          tPrice: toThousands(+saleObj.price_ask),
          sqft: (+saleObj.price_ask / +res.saleable_size_sqft).toFixed(0),
          agent: saleObj.listing_agent
        },
        rent: {
          show: !!res.lease[0],
          price: rentObj.rent_ask,
          tPrice: toThousands(+rentObj.rent_ask),
          sqft: (+rentObj.rent_ask / +res.saleable_size_sqft).toFixed(0),
          agent: rentObj.listing_agent
        },
        agentObj,
        position: {
          lat: res.latitude || 0,
          lng: res.longtitude || 0
        },
        showMap: !!(res.latitude || 0),
        gallery
      };
    }

  }
  return BuyController;
};
