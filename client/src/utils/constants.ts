import { SortType } from '../types/sort'

export const CS_PHONE: string = '1600-0025'
export const CS_EMAIL: string = 'bmart_together@woowahan.com'
export const SLIDER_INTERVAL_TIME = 2000
export const GRAPHQL_URI = process.env.REACT_APP_GRAPHQL_URI
export const SEARCH_URI = process.env.REACT_APP_SEARCH_URI
export const AUTO_SUGGEST_URI = process.env.REACT_APP_AUTO_SUGGEST_URI
export const OAUTH_URI = process.env.REACT_APP_GOOGLE_OAUTH_URI
export const BAEDAL_TIP = 1000
export const MIN_ORDER_PRICE = 5000
export const SKELETON_CARD_COUNT = 10
export const CATEGORIES = [
  {
    id: 0,
    name: '채소',
    displayName: '채소',
    thumbnail:
      'https://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2020/05/07/17/1/16384cc3-f4d3-4652-9e5f-20064e610673.jpg',
  },
  {
    id: 1,
    name: '과일',
    displayName: '과일',
    thumbnail:
      'https://thumbnail7.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2020/07/09/17/9/a18e621e-ac47-433c-975e-223b2dea2727.jpg',
  },
  {
    id: 2,
    name: '생수/음료',
    displayName: '음료',
    thumbnail:
      'https://thumbnail7.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2019/02/19/16/8/ccd31354-425f-4f1f-b2cd-1a96f88e63d0.jpg',
  },
  {
    id: 3,
    name: '가루/조미료/오일',
    displayName: '조미료',
    thumbnail:
      'https://thumbnail8.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2018/12/20/10/5/843881a6-11b8-4eaa-a147-16130f80110e.jpg',
  },
  {
    id: 4,
    name: '유제품/아이스크림',
    displayName: '유제품',
    thumbnail:
      'https://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/product/image/vendoritem/2018/10/26/3822437999/837dc477-f18b-4485-98a5-b69caaf21938.jpg',
  },
  {
    id: 5,
    name: '축산/계란',
    displayName: '축산/계란',
    thumbnail:
      'https://thumbnail10.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/86412774225188-82d1d44a-b4e5-4daa-bcf3-ff264898f476.jpg',
  },
  {
    id: 6,
    name: '수산물/건어물',
    displayName: '수산물',
    thumbnail:
      'https://thumbnail7.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2019/02/22/15/5/d364c3a0-0e9a-46dd-b173-5b826ab5db5a.jpg',
  },
  {
    id: 7,
    name: '냉장/냉동/간편요리',
    displayName: '냉장/냉동',
    thumbnail:
      'https://thumbnail6.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2019/09/02/11/4/8e985aeb-5a4c-4159-b749-04b085dd3376.jpg',
  },
  {
    id: 8,
    name: '반찬/간편식/대용식',
    displayName: '반찬/간편식',
    thumbnail:
      'https://thumbnail10.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/12019442178144-5859193f-c48c-43e8-9b2f-033ebac1e25d.jpg',
  },
  {
    id: 9,
    name: '장/소스/드레싱/식초',
    displayName: '장/소스',
    thumbnail: 'https://img-cf.kurly.com/shop/data/goodsview/20181212/gv20000038467_1.jpg',
  },
  {
    id: 10,
    name: '과자/초콜릿/시리얼',
    displayName: '과자/초콜릿',
    thumbnail:
      'https://thumbnail7.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2019/12/17/16/9/68c48bf2-23dc-4a2a-941d-47550237da60.jpg',
  },
]

export const NAVIGATIONS = [
  { name: 'home', displayName: '홈', path: '/' },
  { name: 'search', displayName: '검색', path: '/search' },
  { name: 'favorite', displayName: '찜', path: '/favorite' },
  { name: 'history', displayName: '주문내역', path: '/history' },
  { name: 'cart', displayName: '장바구니', path: '/cart' },
]

export const PRODUCT_SORT_TYPE: { id: SortType; name: string }[] = [
  { id: '', name: '기본 정렬순' },
  { id: 'priceAsc', name: '가격 낮은순' },
  { id: 'priceDesc', name: '가격 높은순' },
]

export const KR_WEEKDAY = ['일', '월', '화', '수', '목', '금', '토']
// relate to CategoryListSection component's lazyloading implements
// 현재 포커싱된 카테고리 이후 몇 개의 카테고리의 loading을 진행할 것인가에 대한 상수
export const CATEGORY_SECTION_LAZYLOAD_ADDER = 2
export const DISCOUNT_PERCENTAGE_CARD_LIMIT = 30

export const CAROUSEL_BASIC_INTERSECTION_RATIO_THRESHOLD = 0.9
export const CAROUSEL_BASIC_INTERSECTION_THRESHOLD = 0.9
export const MAX_PRODUCT_PURCHASE_LIMIT = 10
export const MIN_PRODUCT_PURCHASE_LIMIT = 1
export const ONE_PAGE_LENGTH = 10
export const SPECIAL_CHAR_REGEX = /[~!@#$%^&*()_+|<>?:{}]/

export const MAX_SEARCH_QUERY_LENGTH = 30
export const TUNG_MESSAGE = {
  EMPTY_CART: '장바구니가 텅 비어있어요',
  EMPTY_HISTORY: '주문 내역이 없어요ㅠ',
}
