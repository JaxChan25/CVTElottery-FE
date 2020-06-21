/*
与后台交互模块 （依赖已封装的ajax函数）
 */
import ajax from './ajax'


const BASE_URL = 'http://47.107.119.93:8000/api/v1'



/**
 * 账号密码登录
 */
export const reqPwdLogin = ({name, pwd}) => ajax(BASE_URL + '/user/login', {"user_name":name, "password":pwd}, 'POST')
/**
 * 获取短信验证码
 */
export const reqSendCode = phone => ajax(BASE_URL + '/sendcode', {phone})

/**
 * 获取用户信息(根据会话)
 */
export const reqUserInfo = () => ajax(BASE_URL + '/userinfo')
/**
 * 请求登出
 */
export const reqLogout = () => ajax(BASE_URL + '/logout')
