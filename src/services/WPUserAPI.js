/** @format */

import { get, has } from "lodash";

import { Config, Languages } from "@common";

import { request, error } from "../Omni";

import Ajax from './ajax'
const axios = require('axios').default;

const url = Config.WooCommerce.url;
const consumerKey = Config.WooCommerce.consumerKey
const consumerSecret = Config.WooCommerce.consumerSecret
const isSecured = url.startsWith("https");
const secure = isSecured ? "" : "&insecure=cool";
const cookieLifeTime = 120960000000;

const WPUserAPI = {
  login: async (username, password) => {
    const _url = `${url}/wp-json/api/flutter_user/generate_auth_cookie`;

    return request(_url, {
      method: "POST",
      body: JSON.stringify({
        second: cookieLifeTime,
        username,
        password,
      }),
    });
  },
  loginFacebook: async (token) => {
    const _url = `${url}/wp-json/api/flutter_user/fb_connect/?second=${cookieLifeTime}&access_token=${token}${secure}`;

    return request(_url);
  },
  loginSMS: async (token) => {
    const _url = `${url}/wp-json/api/flutter_user/sms_login/?access_token=${token}${secure}`;

    return request(_url);
  },
  appleLogin: async (email, fullName, username) => {
    const _url = `${url}/wp-json/api/flutter_user/apple_login?email=${email}&display_name=${fullName}&user_name=${username}${secure}`;

    return request(_url);
  },
  //注册
  // register: async ({
  //   username,
  //   email,
  //   firstName,
  //   lastName,
  //   password = undefined,
  // }) => {
  //   try {
  //     const _url = `${url}/wp-json/wc/v3/customers?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`

  //     const resp = await request(_url, {
  //       method: "POST",
  //       body: {
  //         username,
  //         user_login: username,
  //         user_email: email,
  //         email,
  //         display_name: `${firstName} ${lastName}`,
  //         first_name: firstName,
  //         last_name: lastName,
  //         password,
  //         user_pass: password,
  //       },
  //     });

  //     if (has(resp, "user_id")) {
  //       console.log(resp,'respresp')
  //       return resp;
  //     }
  //     console.log(get(resp, "message") || Languages.CanNotRegister,'error: get(resp, "message") || Languages.CanNotRegister')
  //     return { error: get(resp, "message") || Languages.CanNotRegister };
  //   } catch (err) {
  //     console.log(err,'errrrrr')
  //     error(err);
  //     return { error: err };
  //   }
  // },

  // register: ({
  //   username,
  //   email,
  //   firstName,
  //   lastName,
  //   password = undefined,
  // }) => {
  //   const _url = `${url}/wp-json/wc/v3/customers?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`
  //   return Ajax({
  //     url: _url,
  //     method: 'post',
  //     data: {
  //       username,
  //       user_login: username,
  //       user_email: email,
  //       email,
  //       display_name: `${firstName} ${lastName}`,
  //       first_name: firstName,
  //       last_name: lastName,
  //       password,
  //       user_pass: password,
  //     }
  //   })
  // },

  register: async ({
      username,
      email,
      firstName,
      lastName,
      password = undefined,
    }) => {
    const _url = `${url}/wp-json/wc/v3/customers?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`
    const data = {
      username,
      user_login: username,
      user_email: email,
      email,
      display_name: `${firstName} ${lastName}`,
      first_name: firstName,
      last_name: lastName,
      password,
      user_pass: password,
    }
    const json = await axios.post( _url, data)
    return json
  },

  //修改用户信息
  modification: async ({
    info
  }) => {
    const _url = `${url}/wp-json/wc/v3/customers/14?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`

    const resp = await request(_url, {
      method: "PUT",
      body: JSON.stringify(info)
    })
    console.log(resp, '注册会员显示结果')
  },

  // creact: async () => {
  //   const _url = `${url}/wp-json/wc/v3/coupons?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`

  //   const resp = await request(_url, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       "code": "10olff",
  //       "discount_type": "percent",
  //       "amount": 10,
  //       "individual_use": true,
  //       "exclude_sale_items": true,
  //       "minimum_amount": "100.00"
  //     })
  //   })
  //   console.log(resp, '注册优惠券显示结果')
  // },
  creact: () => {
    const url = "https://www.mrmagicdaveunderwear.com"
    const consumerKey = "ck_9ce06c4f8ac0952e58dacebe6c071de4c7bcef1e";
    const consumerSecret = "cs_de61e6875ff989289c65594508fd76bef2a721a3";
    const _url = `${url}/wp-json/wc/v3/coupons?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`
    const data = {
      "code": "041p03",
      "discount_type": "percent",
      "amount": 10,
      "individual_use": true,
      "exclude_sale_items": true,
      "minimum_amount": "100.00"
    }
    Ajax({
      url: _url,
      method: 'post',
      data
    })
      .then(msg => { console.log(msg, '成功创建优惠券') })
      .catch(err => { console.log(err, '创建优惠券失败') })
  },
  getAll: async () => {
    const _url = `${url}/wp-json/wc/v3/coupons?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`
    const resp = await request(_url, {
      method: "GET",
    })
    return resp
  }
};

export default WPUserAPI;
