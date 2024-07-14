module.exports = {
  title: 'Sword企业级开发平台',
  clientId: 'sword', // 客户端id
  clientSecret: 'sword_secret', // 客户端密钥
  tenantMode: true, // 开启租户模式
  captchaMode: true, // 开启验证码模式
  navTheme: 'dark', // theme for nav menu
  primaryColor: '#1890FF', // primary color of ant design
  layout: 'sidemenu', // nav menu position: sidemenu or topmenu
  contentWidth: 'Fluid', // layout of content: Fluid or Fixed, only works when layout is topmenu
  fixedHeader: true, // sticky header
  autoHideHeader: false, // auto hide header
  fixSiderbar: true, // sticky siderbar
  collapse: true,
  menu: {
    disableLocal: false,
  },
  pwa: true,
  auth: {
    // 使用后端工程 @org.springblade.test.Sm2KeyGenerator 获取
    publicKey: '04e6862d0819ec55e9d7d8bb961ccc8c2b7d86b6845ac333d1d9ab8af6a892cebb3d30f952da4111971908eb02829459170bdd338e7a27fa57d6300dc290d052b5',
  },
  // 第三方登陆授权地址
  authUrl: 'http://localhost/blade-auth/oauth/render',
  // 报表设计器地址(cloud端口为8108,boot端口为80)
  reportUrl: 'http://localhost:8108/ureport',
};
