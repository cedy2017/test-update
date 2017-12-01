const LOCATIONS = [
  {key: ' ', value: 'ALL'},
  {key: 'HK', value:'Hong Kong Island'},
  {key: 'KL', value: 'Kowloon'},
  {key: 'NT', value: 'New Territories'},
  {key: 'IL', value: 'Outlying Islands'},
];

const DISTRICTS = {
  "HK": [
    {key: ' ', value: 'ALL'},
    'Aberdeen/Ap Lei Chau/Wong Chuk Hang',
    'Causeway Bay',
    'Central',
    'Chai Wan',
    'Chung Hom Kok',
    'Deep Water Bay',
    'Happy Valley',
    'Heng Fa Chuen',
    'Jardines Lookout',
    'Mid-levels Central',
    'Mid-levels East',
    'Mid-Levels North Point',
    'Mid-levels West',
    'North Point',
    'Pokfulam/Bel-air',
    'Quarry Bay',
    'Repulse Bay',
    'Shau Kei Wan',
    'Shek O',
    'Sheung Wan',
    'Shouson Hill',
    'Stanley',
    'Tai Hang',
    'Tai Tam',
    'Taikoo Shing',
    'The Peak',
    'Wan Chai',
    'Western/ Kennedy Town',
    'Wong Chuk Hang'
  ],

   "KL": [
    {key: ' ', value: 'ALL'},
    'Cheung Sha Wan/ Sham Shui Po',
    'Ho Man Tin/ Waterloo Road',
    'Hung Hom/ To Kwa Wan',
    'Kowloon City/ Yau Yat Chuen',
    'Kowloon Tong',
    'Mong Kok',
    'Fei Ngo Shan',
    'Tai Kok Tsui/ Olympic Station',
    'Tsim Sha Tsui',
    'Yau Ma Tei',
    'Kowloon Station'
  ],

   "NT": [
    {key: ' ', value: 'ALL'},
    'Castle Peak Road',
    'Clear Water Bay',
    'Gold Coast',
    'Sai Kung',
    'Sham Tseng',
    'Shatin',
    'Fo Tan',
    'Tai Wai',
    'Sheung Shui',
    'Tai Po',
    'Tseung Kwan O',
    'Tuen Mun',
    'Yuen Long'
  ],

  "IL":[
    {key: ' ', value: 'ALL'},
    'Discovery Bay',
    'Ma Wan',
    'Lantau Island',
    'Lamma Island'
  ],

  "ALL": [
    {key: ' ', value: 'ALL'},
    'Aberdeen', 
    'Ap Lei Chau', 
    'Castle Peak Road', 
    'Causeway Bay', 
    'Central', 
    'Chai Wan', 
    'Cheung Sha Wan/ Sham Shui Po', 
    'Chung Hom Kok', 
    'Clear Water Bay', 
    'Deep Water Bay', 
    'Discovery Bay', 
    'Fei Ngo Shan', 
    'Fo Tan', 
    'Gold Coast', 
    'Happy Valley', 
    'Heng Fa Chuen', 
    'Ho Man Tin/ Waterloo Road', 
    'Hung Hom/ To Kwa Wan', 
    'Jardine’s Lookout', 
    'Kowloon City/ Yau Yat Chuen', 
    'Kowloon Station', 
    'Kowloon Tong', 
    'Lamma Island', 
    'Lantau Island', 
    'Ma Wan', 
    'Mid-levels Central', 
    'Mid-levels East', 
    'Mid-levels West', 
    'Mong Kok', 
    'North Point', 
    'North Point Hill', 
    'Pokfulam/Bel-air', 
    'Quarry Bay', 
    'Repulse Bay', 
    'Sai Kung', 
    'Sai Ying Pun', 
    'Sham Tseng', 
    'Shatin', 
    'Shau Kei Wan', 
    'Shek O', 
    'Sheung Shui', 
    'Sheung Wan', 
    'Shouson Hill', 
    'Stanley', 
    'Tai Hang', 
    'Tai Kok Tsui/ Olympic Station', 
    'Tai Po', 
    'Tai Tam', 
    'Tai Wai', 
    'Taikoo Shing', 
    'The Peak', 
    'Tseung Kwan O', 
    'Tsim Sha Tsui', 
    'Tuen Mun', 
    'Wan Chai', 
    'Western/Kennedy Town/Sai Ying Pun', 
    'Yau Ma Tei', 
    'Yuen Long'
  ]
}

const PRIMARY_SCHOOL_NETWORK_CHOICES = [
//HK ISLAND
{key:'11', value: '11 Central and Western'},
{key:'12', value: '12 Wan Chai'},
{key:'14', value: '14 Eastern'},
{key:'16', value: '16 Eastern'},
{key:'18', value: '18 Southern'},
//KOWLOON 
{key:'31', value: '31 Yau Tsim Mong'},
{key:'32', value: '32 Yau Tsim Mong'},
{key:'34', value: '34 Kowloon City'},
{key:'35', value: '35 Kowloon City'},
{key:'41', value: '41 Kowloon City'},
{key:'40', value: '40 Sham Shui Po' },
{key:'43', value: '43 Wong Tai Sin' },
{key:'45', value: '45 Wong Tai Sin' },
{key:'46', value: '46 Kwun Tong'},
{key:'48', value: '48 Kwun Tong'},
//NT EAST
{key:'80', value: '80 North'},
{key:'81', value: '81 North'},
{key:'83', value: '83 North'},
{key:'84', value: '84 Tai Po'},
{key:'88', value: '88 Sha Tin'},
{key:'89', value: '89 Sha Tin'},
{key:'91', value: '91 Sha Tin'},
{key:'95', value: '95 Sai Kung'},
//NT WEST 
{key:'62', value: '62 Tsuen Wan'},
{key:'64', value: '64 Kwai Tsing'},
{key:'65', value: '65 Kwai Tsing'},
{key:'66', value: '66 Kwai Tsing'},
{key:'70', value: '70 Tuen Mun'},
{key:'71', value: '71 Tuen Mun'},
{key:'72', value: '72 Yuen Long'},
{key:'73', value: '73 Yuen Long'},
{key:'74', value: '74 Yuen Long'},
{key:'96', value: '96 Islands'},
{key:'97', value: '97 Islands'},
{key:'98', value: '98 Islands'},
{key:'99', value: '99 Islands'},
];

//Secondary school network
const DISTRICT_18_CHOICES = [
  //HK ISLAND
  {key: 'CAW', value: 'Central and Western'},
  {key: 'WC', value:'Wan Chai'},
  {key: 'ETN', value: 'Eastern'},
  {key: 'STN', value: 'Southern'},
  //KOWLOON
  {key: 'YTM', value: 'Yau Tsim Mong'},
  {key: 'KC', value:'Kowloon City'},
  {key: 'SSP', value: 'Sham Shui Po'},
  {key: 'WTS', value: 'Wong Tai Sin'},
  {key: 'KNT', value: 'Kwun Tong'},
  //NT EAST
  {key: 'NTH', value: 'North'},
  {key: 'TP', value:'Tai Po'},
  {key: 'ST', value:'Sha Tin'},
  {key: 'SK', value:'Sai Kung'},
  //NT WEST
  {key: 'TW', value:'Tsuen Wan'},
  {key: 'KT', value:'Kwai Tsing'},
  {key: 'TM', value:'Tuen Mun'},
  {key: 'YL', value:'Yuen Long'},
  {key: 'IS', value:'Islands'},
];

//region is named sub-region in backend
const REGION = [
  {key: 'CAW', value: 'Central and Western District'},
  {key: 'KAH', value: 'Kowloon Tong and Ho Man Tin'},
  {key: 'PAS', value: 'The Peak and Southside'},
  {key: 'SAC', value: 'Sai Kung and Clear Water Bay'},
  {key: 'TAJ', value: 'Tai Hang and Jardine’s Lookout'},
  {key: 'TAS', value: 'Tai Po and Shatin'},
  {key: 'TIE', value: 'The Island East'},
  {key: 'YTM', value: 'Yau Tsim Mong'},
];

const CONDITION_STATUS = [
  {key: 'FF', value: 'Fully Furnished'},
  {key: 'PF', value: 'Partially Furnished'},
  {key: 'UF', value: 'Unfurnished'},
  {key: 'OP', value: 'Optional'},
];

// search info
const AREA_MIN = [{ key: '0', value: 'below 1000' }, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000];
const AREA_MAX = [1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, { key: '1000000000000', value: '5000 above' }];
const BUY_BUDGET_MIN = [
  { key: '0', value: 'below 20 (M)' },
  { key: '20000000', value: '20 (M)' },
  { key: '25000000', value: '25 (M)' },
  { key: '30000000', value: '30 (M)' },
  { key: '35000000', value: '35 (M)' },
  { key: '40000000', value: '40 (M)' },
  { key: '50000000', value: '50 (M)' },
  { key: '60000000', value: '60 (M)' },
  { key: '80000000', value: '80 (M)' },
  { key: '100000000', value: '100 (M)' }
];
const BUY_BUDGET_MAX = [
  { key: '20000000', value: '20 (M)' },
  { key: '25000000', value: '25 (M)' },
  { key: '30000000', value: '30 (M)' },
  { key: '35000000', value: '35 (M)' },
  { key: '40000000', value: '40 (M)' },
  { key: '50000000', value: '50 (M)' },
  { key: '60000000', value: '60 (M)' },
  { key: '80000000', value: '80 (M)' },
  { key: '100000000', value: '100 (M)' },
  { key: '100000000000000', value: '100 (M) above' }
];
const RENT_BUDGET_MIN = [
  { key: '0', value: 'below 80 (K)' },
  { key: '80000', value: '80 (K)' },
  { key: '90000', value: '90 (K)' },
  { key: '100000', value: '100 (K)' },
  { key: '120000', value: '120 (K)' },
  { key: '140000', value: '140 (K)' },
  { key: '160000', value: '160 (K)' },
  { key: '180000', value: '180 (K)' },
  { key: '200000', value: '200 (K)' }
];
const RENT_BUDGET_MAX = [
  { key: '80000', value: '80 (K)' },
  { key: '90000', value: '90 (K)' },
  { key: '100000', value: '100 (K)' },
  { key: '120000', value: '120 (K)' },
  { key: '140000', value: '140 (K)' },
  { key: '160000', value: '160 (K)' },
  { key: '180000', value: '180 (K)' },
  { key: '200000', value: '200 (K)' },
  { key: '200000000000000', value: '200 (K) above' },
];

module.exports = {
  LOCATIONS,
  REGION,
  DISTRICTS,
  CONDITION_STATUS,
  AREA_MIN,
  AREA_MAX,
  BUY_BUDGET_MIN,
  BUY_BUDGET_MAX,
  RENT_BUDGET_MIN,
  RENT_BUDGET_MAX,
}
