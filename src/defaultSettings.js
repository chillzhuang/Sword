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
    publicKey: '048ecaec81db406275b5fd8a18164c4a58cc8575159b89d3cb61871cab34bd267fe0a7543277d4c9cfd13c946c507c3e8dfe0121b845ba968221eaf64a242cf7f0',
  },
  // 第三方登陆授权地址
  authUrl: 'http://localhost/blade-auth/oauth/render',
  // 报表设计器地址(cloud端口为8108,boot端口为80)
  reportUrl: 'http://localhost:8108/ureport',
};
