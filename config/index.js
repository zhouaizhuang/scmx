const ENV = 'dev' // pro - 线上
const checkUserByPhone = false //  通过手机号检查线上用户 默认 false
const hl_version = ENV === 'dev' ? 'https://crm.hangjiayun.net/' : 'https://crm.lccz.com/' // 化龙

module.exports = {
    ENV: false ? 'develop':'production',  // true- develop （开发环境，化龙独立环境)  false- production 生产环境 (客户版本)
    HOST: {
        ['HL']: 'https://crm.lccz.com/',
        ['KH']: 'https://crm1.hangjiayun.com/',
        ['CS']: hl_version,
        ['SH']: checkUserByPhone ? 'https://crm.lccz.com/' : 'https://crm.hangjiayun.net/',
    },
    SIGN_TIME: 1000,  // 签到成功停留时间
    QQMAP_KEY: 'RPABZ-5QGCV-JTKPT-U72H7-SIHP3-LQBPM', 
}