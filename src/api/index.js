/*
与后台交互模块 （依赖已封装的ajax函数）
 */
import ajax from './ajax'
import axios from 'axios'

const BASE_URL = 'http://47.107.119.93:8000/api/v1'



/**
 * 账号密码登录
 */
export const reqPwdLogin = ({name, pwd}) => ajax(BASE_URL + '/user/login', {"user_name":name, "password":pwd}, 'POST')

/**
 * 账号注册
 */
export const reqPwdRegister = ({name, pwd ,pwd_confirm,mobile}) => ajax(BASE_URL + '/user/register',
     {"user_name":name, "password":pwd,"password_confirm":pwd_confirm,"mobile":mobile,}, 'POST')

 

/**
 * 获取用户信息(根据会话)
 */
export const reqUserInfo = () => ajax(BASE_URL + '/userinfo')
/**
 * 请求登出
 */
export const reqLogout = () => ajax(BASE_URL + '/logout')

/**
 * 添加地址
 */
export const reqAddressPost = ({ user_id,real_name,mobile,province,city,district,detail}) => ajax(BASE_URL + '/address',
{"game_user_id":user_id, "real_name":real_name,"mobile":mobile,"province":province,"city":city,"district":district,"detail":detail,}, 'POST')




/**
 * 获取活动
 */
export const reqActivity = ({id}) => ajax(BASE_URL + '/activity', {id}, 'GET')



//export const reqPwdLogin = ({name, pwd}) => ajax(BASE_URL + '/user/login', {"user_name":name, "password":pwd}, 'POST')
//export const reqSurplustimes = ({user_id, activity_id}) => ajax(BASE_URL + '/surplustimes', {"game_user_id":user_id, "activity_id":activity_id,}, 'POST')
export const reqSurplustimes = ({game_user_id, activity_id}) => ajax(BASE_URL + '/surplustimes', {"game_user_id":game_user_id, "activity_id":activity_id}, 'POST')
export const reqDrawLottery = ({game_user_id, activity_id}) => ajax(BASE_URL + '/drawlottery', {"game_user_id":game_user_id, "activity_id":activity_id}, 'POST')
export const reqUserPrizes = ({game_user_id, activity_id}) => ajax(BASE_URL + '/userprizes', {"game_user_id":game_user_id, "activity_id":activity_id}, 'POST')
//export const reqActivityPrizes = ({activity_id}) => ajax(BASE_URL + '/activityprizes', {"activity_id":activity_id ,"offset":0, "limit":6}, 'POST')

/*
忽哟去第
*/
export const reqAddress = id => axios.get(BASE_URL +  `/address/${id}`).then(res => res.data);
