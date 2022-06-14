/** @format */

import React, { PureComponent } from "react";
import { View, ScrollView, Text, Switch, Modal, Image, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import _ from "lodash";

import {
  UserProfileHeader,
  UserProfileItem,
  ModalBox,
  CurrencyPicker,
} from "@components";
import { Languages, Color, Tools, Config, withTheme, Images } from "@common";
import { getNotification } from "@app/Omni";
import { firebase } from '@react-native-firebase/database';
import { toast } from "@app/Omni";

import styles from "./styles";

class UserProfile extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      pushNotification: false,
      modalVisible: false,
      avatar: "",
      member: false
    };
  }

  componentDidMount() {
    this._getNotificationStatus();
    this._handleSwitchNotification(true);
  }

  _getNotificationStatus = async () => {
    const notification = await getNotification();

    this.setState({ pushNotification: notification || false });
  };

  /**
   * TODO: refactor to config.js file
   */
  _getListItem = () => {
    const { currency, wishListTotal, userProfile, isDarkTheme } = this.props;
    const listItem = [...Config.ProfileSettings];
    const items = [];
    let index = 0;
    console.log(listItem, 'firstListItem')
    for (let i = 0; i < listItem.length; i++) {
      const item = listItem[i];
      if (item.label === "PushNotification") {
        item.icon = () => (
          <Switch
            onValueChange={this._handleSwitchNotification}
            value={this.state.pushNotification}
            trackColor={Color.blackDivide}
          />
        );
      }
      // if (item.label == "memberCenter") {
      //   items.push({ label: Languages.MemberCenter })
      // }
      if (item.label === "DarkTheme") {
        item.icon = () => (
          <Switch
            onValueChange={this._onToggleDarkTheme}
            value={isDarkTheme}
            trackColor={Color.blackDivide}
          />
        );
      }
      if (item.label === "Currency") {
        item.value = currency.code;
      }

      if (item.label === "WishList") {
        items.push({
          ...item,
          label: `${Languages.WishList} (${wishListTotal})`,
        });
      } else {
        items.push({ ...item, label: Languages[item.label] });
      }
    }

    if (!userProfile.user) {
      index = _.findIndex(items, (item) => item.label === Languages.Address);
      if (index > -1) {
        items.splice(index, 1);
      }
    }

    if (!userProfile.user || Config.Affiliate.enable) {
      index = _.findIndex(items, (item) => item.label === Languages.MyOrder);
      if (index > -1) {
        items.splice(index, 1);
      }
    }
    return items;
  };

  _onToggleDarkTheme = () => {
    this.props.toggleDarkTheme();
  };

  _handleSwitchNotification = (value) => {
    AsyncStorage.setItem("@notification", JSON.stringify(value), () => {
      this.setState({
        pushNotification: value,
      });
    });
  };
  //跳转
  _handlePress = (item) => {
    const { navigation, userProfile } = this.props;
    const { routeName, isActionSheet } = item;

    console.log('--------', item.params);
    if (routeName && !isActionSheet) {
      const user = userProfile.user || {};
      const name = Tools.getName(user);
      if ('MemberCenter' === routeName) {
        if (Languages.Guest === name) {
          toast('请登录')
          return
        } else if (!this.state.member) {
          toast('您不是会员，请先注册会员')
          return
        }
      }
      navigation.navigate(routeName, item.params);
    }

    if (isActionSheet) {
      this.currencyPicker.openModal();
    }
  };

  /**
   * 判断当前用户是否为会员
   * @param {Boolean} isMember 是否为会员
   * @returns 
   */
  isMember = (isMember) => {
    this.setState({ member: isMember })
  }

  /**
   * 
   * @param {Boolean} boolean
   * 打开或关闭选择头像弹窗 
   */
  openPopup = (boolean) => {
    this.setState({ modalVisible: boolean })
  }
  /**
   * 
   * @param {object} user 
   * @param {string} url
   * 选择头像上传
   */
  selectImg = (user, url) => {
    const { userProfile, login } = this.props;
    console.log(user, 9999999999999, url)
    let userData = JSON.parse(JSON.stringify(user))
    this.setState({ avatar: url, modalVisible: false })
    let data = {}
    data = { avatar_url: url }
    userData.avatar_url = url
    console.log(data, 'dadadadad')
    firebase
      .app().database()
      .ref(`/users/${user.id}`)
      .update(data)
      .then(() => {
        login(userData, userProfile.token)
      })
      .catch((err) => { console.log(err, '上传失败') })
    console.log(login, '备份头像')
    login(userData, userProfile.token)
  }


  render() {
    console.log(this.state.avatar, 'this.state.avatar')
    const { userProfile, navigation, currency, changeCurrency } = this.props;
    console.log(userProfile, 'userProfile')
    const user = userProfile.user || {};
    const name = Tools.getName(user);
    const listItem = this._getListItem();
    console.log(listItem, 'listItem')
    const {
      theme: {
        colors: { background },
        dark,
      },
    } = this.props;
    console.log(user, 'user')
    return (
      <View style={[styles.container, { backgroundColor: background }]}>
        <ScrollView ref="scrollView">
          <UserProfileHeader
            isMember={this.isMember}
            avatar={this.state.avatar}
            openPopup={this.openPopup}
            onLogin={() => navigation.navigate("LoginScreen")}
            onLogout={() =>
              navigation.navigate("LoginScreen", { isLogout: true })
            }
            userInfo={{
              ...user,
              name,
            }}
          />

          {userProfile.user && (
            <View style={[styles.profileSection(dark)]}>
              <Text style={styles.headerSection}>
                {Languages.AccountInformations.toUpperCase()}
              </Text>
              <UserProfileItem
                label={Languages.Name}
                onPress={this._handlePress}
                value={name}
              />
              <UserProfileItem label={Languages.Email} value={user.email} />
              {/* <UserProfileItem label={Languages.Address} value={user.address} /> */}
            </View>
          )}
          {/* 用户资料列表 */}
          <View style={[styles.profileSection(dark)]}>
            {listItem.map((item, index) => {
              if (item.label) {
                return (
                  item && (
                    <UserProfileItem
                      icon
                      key={index.toString()}
                      onPress={() => this._handlePress(item)}
                      {...item}
                    />
                  )
                );
              }
            })}
          </View>
        </ScrollView>

        <ModalBox ref={(c) => (this.currencyPicker = c)}>
          <CurrencyPicker currency={currency} changeCurrency={changeCurrency} />
        </ModalBox>
        <Modal
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => { this.setState({ modalVisible: false }) }}
        >
          <View style={styles.mask}>
            <Text>弹窗</Text>
            <View style={styles.imgContent}>
              {
                Images.portrait.map((item, index) => {
                  return <TouchableOpacity key={'q' + index} onPress={() => { this.selectImg(user, index) }}>
                    <Image source={item} style={styles.imgStyle} />
                  </TouchableOpacity>
                })
              }
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = ({ user, language, currency, wishList, app }) => ({
  userProfile: user,
  language,
  currency,
  wishListTotal: wishList.wishListItems.length,
  isDarkTheme: app.isDarkTheme,
});

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const { actions: CurrencyActions } = require("@redux/CurrencyRedux");
  const { toggleDarkTheme } = require("@redux/AppRedux");
  return {
    ...ownProps,
    ...stateProps,
    changeCurrency: (currency) =>
      CurrencyActions.changeCurrency(dispatch, currency),
    toggleDarkTheme: () => {
      dispatch(toggleDarkTheme());
    },
  };
}

const mapDispatchToProps = (dispatch) => {
  const { actions } = require("@redux/UserRedux");

  return {
    login: (user, token) => dispatch(actions.login(user, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(withTheme(UserProfile));
