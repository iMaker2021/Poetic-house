/** @format */

import Images from "./Images";
import Constants from "./Constants";
import Icons from "./Icons";

const consumerKey = "ck_9ce06c4f8ac0952e58dacebe6c071de4c7bcef1e";
const consumerSecret = "cs_de61e6875ff989289c65594508fd76bef2a721a3";

export default {
  /**
   * Step 1: change to your website URL and the wooCommerce API consumeKey
   */
  WooCommerce: {
    url: "https://www.mrmagicdaveunderwear.com",
    consumerKey,
    consumerSecret,
  },

  /**
     Step 2: Setting Product Images
     - ProductSize: Explode the guide from: update the product display size: https://mstore.gitbooks.io/mstore-manual/content/chapter5.html
     The default config for ProductSize is disable due to some problem config for most of users.
     If you have success config it from the Wordpress site, please enable to speed up the app performance
     - HorizonLayout: Change the HomePage horizontal layout - https://mstore.gitbooks.io/mstore-manual/content/chapter6.html
       Update Oct 06 2018: add new type of categories
       NOTE: name is define value --> change field in Language.js
       Moved to AppConfig.json
     */
  ProductSize: {
    enable: false,
  },

  HomeCategories: [
    {
      category: 17,
      image: require("@images/categories_icon/ic_shorts.png"),
      colors: ["#4facfe", "#00f2fe"],
      label: "briefs",
    },
    {
      category: 106,
      image: require("@images/categories_icon/ic_tshirt.png"),
      colors: ["#43e97b", "#38f9d7"],
      label: "Men's shirts",
    },
    {
      category: 101,
      image: require("@images/categories_icon/ic_panties.png"),
      colors: ["#fa709a", "#fee140"],
      label: "swim briefs",
    },
    {
      category: 104,
      image: require("@images/categories_icon/ic_dress.png"),
      colors: ["#7F00FF", "#E100FF"],
      label: "Beach pants",
    },
    {
      category: 31,
      image: require("@images/categories_icon/ic_glasses.png"),
      colors: ["#30cfd0", "#330867"],
      label: "jumpsuits",
    },
  ],
  HomeCategories_AR: [
    {
      category: 17,
      image: require("@images/categories_icon/ic_shorts.png"),
      colors: ["#4facfe", "#00f2fe"],
      label: "لكن",
    },
    {
      category: 106,
      image: require("@images/categories_icon/ic_tshirt.png"),
      colors: ["#43e97b", "#38f9d7"],
      label: "تي شيرت",
    },
    {
      category: 101,
      image: require("@images/categories_icon/ic_panties.png"),
      colors: ["#fa709a", "#fee140"],
      label: "ملابس",
    },
    {
      category: 104,
      image: require("@images/categories_icon/ic_dress.png"),
      colors: ["#7F00FF", "#E100FF"],
      label: "فساتين",
    },
    {
      category: 31,
      image: require("@images/categories_icon/ic_glasses.png"),
      colors: ["#30cfd0", "#330867"],
      label: "أكياس",
    },
  ],
  HomeCategories_CN: [
    {
      category: 17,
      image: require("@images/categories_icon/ic_shorts.png"),
      colors: ["#4facfe", "#00f2fe"],
      label: "三角内裤",
    },
    {
      category: 106,
      image: require("@images/categories_icon/ic_tshirt.png"),
      colors: ["#43e97b", "#38f9d7"],
      label: "男士恤衫",
    },
    {
      category: 101,
      image: require("@images/categories_icon/ic_panties.png"),
      colors: ["#fa709a", "#fee140"],
      label: "三角泳裤",
    },
    {
      category: 104,
      image: require("@images/categories_icon/ic_dress.png"),
      colors: ["#7F00FF", "#E100FF"],
      label: "沙滩裤",
    },
    {
      category: 31,
      image: require("@images/categories_icon/ic_glasses.png"),
      colors: ["#30cfd0", "#330867"],
      label: "连体衣",
    },
  ],
  HomeCategories_TC: [
    {
      category: 17,
      image: require("@images/categories_icon/ic_shorts.png"),
      colors: ["#4facfe", "#00f2fe"],
      label: "三角内裤",
    },
    {
      category: 106,
      image: require("@images/categories_icon/ic_tshirt.png"),
      colors: ["#43e97b", "#38f9d7"],
      label: "男士恤衫",
    },
    {
      category: 101,
      image: require("@images/categories_icon/ic_panties.png"),
      colors: ["#fa709a", "#fee140"],
      label: "三角泳裤",
    },
    {
      category: 104,
      image: require("@images/categories_icon/ic_dress.png"),
      colors: ["#7F00FF", "#E100FF"],
      label: "沙滩裤",
    },
    {
      category: 31,
      image: require("@images/categories_icon/ic_glasses.png"),
      colors: ["#30cfd0", "#330867"],
      label: "连体衣",
    },
  ],
  /**
     step 3: Config image for the Payment Gateway
     Notes:
     - Only the image list here will be shown on the app but it should match with the key id from the WooCommerce Website config
     - It's flexible way to control list of your payment as well
     Ex. if you would like to show only cod then just put one cod image in the list
     * */
  Payments: {
    bacs: require("@images/payment_logo/bacs.png"),
    cheque:require("@images/payment_logo/checks.png"),
    cod: require("@images/payment_logo/cash_on_delivery.png"),
    paypal: require("@images/payment_logo/PayPal.png"),
    stripe_cc: require("@images/payment_logo/stripe.png"),
  },

  /**
     Step 4: Advance config:
     - showShipping: option to show the list of shipping method
     - showStatusBar: option to show the status bar, it always show iPhoneX
     - LogoImage: The header logo
     - LogoWithText: The Logo use for sign up form
     - LogoLoading: The loading icon logo
     - appFacebookId: The app facebook ID, use for Facebook login
     - CustomPages: Update the custom page which can be shown from the left side bar (Components/Drawer/index.js)
     - WebPages: This could be the id of your blog post or the full URL which point to any Webpage (responsive mobile is required on the web page)
     - intro: The on boarding intro slider for your app
     - menu: config for left menu side items (isMultiChild: This is new feature from 3.4.5 that show the sub products categories)
     * */
  shipping: {
    visible: true,
    zoneId: 1, // depend on your woocommerce
    time: {
      free_shipping: "4 - 7 Days",
      flat_rate: "1 - 4 Days",
      local_pickup: "1 - 4 Days",
    },
  },
  showStatusBar: true,
  LogoImage: require("@images/yesmk_shop_icon.png"),
  LogoWithText: require("@images/yesmk_shop_icon.png"),
  LogoLoading: require("@images/logo1.jpg"),

  showAdmobAds: false,
  AdMob: {
    deviceID: "pub-2101182411274198",
    rewarded: "ca-app-pub-2101182411274198/5096259336",
    interstitial: "ca-app-pub-2101182411274198/8930161243",
    banner: "ca-app-pub-2101182411274198/4100506392",
  },
  appFacebookId: "501847534057136",
  CustomPages: { contact_id: 10941 },
  WebPages: { marketing: "http://inspireui.com" },

  intro: [
    {
      key: "page1",
      title: "Welcome to MStore!",
      text: "Get the hottest fashion by trend and season right on your pocket.",
      icon: "ios-basket",
      colors: ["#0FF0B3", "#036ED9"],
    },
    {
      key: "page2",
      title: "Secure Payment",
      text: "All your payment infomation is top safety and protected",
      icon: "ios-card",
      colors: ["#13f1fc", "#0470dc"],
    },
    {
      key: "page3",
      title: "High Performance",
      text: "Saving your value time and buy product with ease",
      icon: "ios-finger-print",
      colors: ["#b1ea4d", "#459522"],
    },
  ],

  /**
   * Config For Left Menu Side Drawer
   * @param goToScreen 3 Params (routeName, params, isReset = false)
   * BUG: Language can not change when set default value in Config.js ==> pass string to change Languages
   */
  menu: {
    // has child categories
    isMultiChild: true,
    // Unlogged
    listMenuUnlogged: [
      {
        text: "Login",
        routeName: "LoginScreen",
        params: {
          isLogout: false,
        },
        icon: Icons.MaterialCommunityIcons.SignIn,
      },
    ],
    // user logged in
    listMenuLogged: [
      {
        text: "Logout",
        routeName: "LoginScreen",
        params: {
          isLogout: true,
        },
        icon: Icons.MaterialCommunityIcons.SignOut,
      },
    ],
    // Default List
    listMenu: [
      {
        text: "Shop",
        routeName: "Home",
        icon: Icons.MaterialCommunityIcons.Home,
      },
      {
        text: "News",
        routeName: "NewsScreen",
        icon: Icons.MaterialCommunityIcons.News,
      },
      {
        text: "contactus",
        routeName: "CustomPage",
        params: {
          id: 10941,
          title: "contactus",
        },
        icon: Icons.MaterialCommunityIcons.Pin,
      },
      {
        text: "About",
        routeName: "CustomPage",
        params: {
          url: "http://inspireui.com/about/",
        },
        icon: Icons.MaterialCommunityIcons.Email,
      },
    ],
  },

  // define menu for profile tab
  ProfileSettings: [
    {
      label:"MemberCenter",
      routeName:"MemberCenter"
    },
    {
      label: "WishList",
      routeName: "WishListScreen",
    },
    {
      label: "MyOrder",
      routeName: "MyOrders",
    },
    {
      label: "Address",
      routeName: "Address",
    },
    {
      label: "Currency",
      isActionSheet: true,
    },
    // only support mstore pro
    {
      label: "Languages",
      routeName: "SettingScreen",
    },
    {
      label: "PushNotification",
    },
    {
      label: "DarkTheme",
    },
    {
      label: "contactus",
      routeName: "Contactus",
      params: {
        id: 10941,
        title: "联络我们",
      },
    },
    {
      label: "Privacy",
      routeName: "CustomPage",
      params: {
        url: "https://inspireui.com/privacy",
      },
    },
    {
      label: "termCondition",
      routeName: "CustomPage",
      params: {
        url: "https://inspireui.com/term-of-service",
      },
    },
    {
      label: "About",
      routeName: "CustomPage",
      params: {
        url: "https://mrmagicdaveunderwear.com/about/",
      },
    },
  ],

  // 首页布局设置
  layouts: [
    {
      layout: Constants.Layout.card,
      image: Images.icons.iconCard,
      text: "cardView",
    },
    {
      layout: Constants.Layout.simple,
      image: Images.icons.iconRight,
      text: "simpleView",
    },
    {
      layout: Constants.Layout.twoColumn,
      image: Images.icons.iconColumn,
      text: "twoColumnView",
    },
    {
      layout: Constants.Layout.threeColumn,
      image: Images.icons.iconThree,
      text: "threeColumnView",
    },
    {
      layout: Constants.Layout.horizon,
      image: Images.icons.iconHorizal,
      text: "horizontal",
    },
    {
      layout: Constants.Layout.advance,
      image: Images.icons.iconAdvance,
      text: "advanceView",
    },
  ],

  // Default theme loading, this could able to change from the user profile (reserve feature)
  Theme: {
    isDark: false,
  },

  // new list category design
  CategoriesLayout: Constants.CategoriesLayout.card,

  // WARNING: Currently when you change DefaultCurrency, please uninstall your app and reinstall again. The redux saved store.
  DefaultCurrency: {
    symbol: "$",
    name: "US Dollar",
    code: "USD",
    name_plural: "US dollars",
    decimal: ".",
    thousand: ",",
    precision: 2,
    format: "%s%v", // %s is the symbol and %v is the value
  },

  DefaultCountry: {
    code: "en",
    RTL: false,
    language: "English",
    countryCode: "US",
    hideCountryList: false, // when this option is try we will hide the country list from the checkout page, default select by the above 'countryCode'
  },

  /**
   * Config notification onesignal, only effect for the Pro version
   */
  OneSignal: {
    appId: "43948a3d-da03-4e1a-aaf4-cb38f0d9ca51",
  },
  /**
   * Login required
   */
  Login: {
    RequiredLogin: false, // required before using the app
    AnonymousCheckout: false, // required before checkout or checkout anonymous
  },

  Layout: {
    HideHomeLogo: false,
    HideLayoutModal: false,
  },

  Affiliate: { enable: false },

  EnableOnePageCheckout: false,

  NativeOnePageCheckout: true,

  // using url from server to load AppConfig.json
  HomeCaching: {
    url: `https://demo.mstore.io/wp-json/wc/v2/flutter/cache?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`, // can change url to load another server
    enable: false, // disable load from server, and start load in local in `common/AppConfig.json`
  },

  // Stripe set up
  Stripe:{
    publishableKey:"pk_test_51KxCYwLPurHK71WaLLIpSmgZXNWeLGCSM7TCX70EddfZqTnZ1NNmljjm6quKIe9eOCebVVM0GwQXaHG7TgoRaPKB00KMrxnI3A",
  }

};