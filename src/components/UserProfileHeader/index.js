/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity, Image, Button, TouchableHighlight } from "react-native";
import { connect } from "react-redux";
import { Languages, Tools, withTheme } from "@common";
import styles from "./styles";
import WPUserAPI from '../../services/WPUserAPI'
import { utils } from '@react-native-firebase/app';
import { firebase } from '@react-native-firebase/database';
import database from '@react-native-firebase/database';
import { Images } from "@common";
import { toast } from "@app/Omni";
import storage from '@react-native-firebase/storage';

class UserProfileHeader extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      avatarUrl: '',
      url: '',
      isMember: false
    }
  }
  static propTypes = {
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    user: PropTypes.object,
  };

  componentDidMount() {
    const { userInfo,isMember } = this.props;
    console.log(userInfo,'用户信息')
    if (userInfo.id) {
      database()
        .ref("/users")
        .on("value", (values) => {
          console.log(values.val()[userInfo.id].IsMember,'values.val()[userInfo.id].IsMember')
          if (values.val()[userInfo.id].IsMember) {
            this.setState({ isMember: true })
            isMember(true)
          }
        })
    }

  }

  componentWillReceiveProps() {
    this.getAvatar(this.props.user)
  }

  loginHandle = () => {
    if (this.props.userInfo.name === Languages.Guest) {
      this.props.onLogin();
    } else {
      this.props.onLogout();
    }
  };

  /**
   * 注册为会员
   * @returns 
   */
  member = () => {
    const { userInfo, isMember} = this.props;
    if (!userInfo.id) {
      toast('请登录')
      return
    }

    //注册
    firebase
      .app().database()
      .ref(`/users/${userInfo.id}`)
      .update({ usedPoints: 0, IsMember: true })
      .then((res) => {
        console.log(res,'注册会员成功')
        toast('会员注册成功')
        this.setState({isMember:true})

      })
      .catch((err) => { console.log(err,'注册会员失败') })
      isMember(true)
  }

  getAvatar(user) {
    if (user) {
      firebase
        .app()
        .database('https://poetic-house-default-rtdb.asia-southeast1.firebasedatabase.app/')
        .ref('/users/')
        .on('value', (value) => {
          let userData = value.val()
          console.log(userData, 'userData')
          if (userData[user.id]) {
            console.log(user.id, 'userID', userData[user.id])
            if (userData[user.id].avatar_url) {
              console.log(userData[user.id].avatar_url, '222222222222')
              this.setState({ avatarUrl: userData[user.id].avatar_url })
            }
          }
          // return userData[user.id] && userData[user.id].avatar_url ? userData[user.id].avatar_url : Images.defaultAvatar
        })
    }
  }

  /**
   * 
   * @param {string} name 
   * 更换头像
   */
  replaceAvatar = (name) => {
    if (Languages.Guest === name) {
      toast('请登录')
      return
    }
    this.props.openPopup(true)
  }


  render() {
    const { userInfo } = this.props;
    const avatar = Tools.getAvatar(userInfo);
    const {
      theme: {
        colors: { background, text },
      },
    } = this.props;
    return (
      <View style={[styles.container, { backgroundColor: background }]}>
        <View style={styles.header}>
          <TouchableHighlight style={styles.imgView} onPress={() => { this.replaceAvatar(userInfo.name) }}>
            <Image
              source={this.props.avatar ? Images.portrait[this.props.avatar] : ("Guest" === avatar ? Images.defaultAvatar : Images.portrait[avatar.uri])}
              resizeMethod='scale'
              style={styles.avatar}
            />
          </TouchableHighlight>
          <View style={styles.textContainer}>
            <View style={styles.line}>
              <Text style={[styles.fullName, { color: text }]}>{userInfo.name}</Text>
              <Text style={[styles.address, { color: text }]}>
                {userInfo ? userInfo.address : ""}
              </Text>
            </View>

            <TouchableOpacity onPress={this.loginHandle}>
              <Text style={styles.loginText}>
                {userInfo.name === Languages.Guest
                  ? Languages.Login
                  : Languages.Logout}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {this.state.isMember ? null : <Button title="注册会员" onPress={() => { this.member(userInfo) }}></Button>}
      </View>
    );
  }
}

export default withTheme(UserProfileHeader);
