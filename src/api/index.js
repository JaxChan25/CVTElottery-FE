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
 * 账号注册
 */
export const reqPwdRegister = ({name, pwd ,pwd_confirm,real_name,mobile}) => ajax(BASE_URL + '/user/register',
     {"user_name":name, "password":pwd,"password_confirm":pwd_confirm,"real_name":real_name,"mobile":mobile,}, 'POST')

 

/**
 * 获取用户信息(根据会话)
 */
export const reqUserInfo = () => ajax(BASE_URL + '/userinfo')
/**
 * 请求登出
 */
export const reqLogout = () => ajax(BASE_URL + '/logout')
