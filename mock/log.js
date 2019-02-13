import { delay } from 'roadhog-api-doc';

function getFakeUsualList(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  const list = [];
  list.push(
    {
      id: '1',
      serviceId: 'blade-auth',
      serverHost: 'blade',
      serverIp: '192.168.0.1',
      env: 'dev',
      logLevel: 'info',
      logId: 'test',
      logData: '测试日志1',
      method: 'get',
      requestUri: '/token',
    },
    {
      id: '2',
      serviceId: 'blade-auth',
      serverHost: 'blade',
      serverIp: '192.168.0.1',
      env: 'dev',
      logLevel: 'info',
      logId: 'test',
      logData: '测试日志2',
      method: 'get',
      requestUri: '/token',
    },
    {
      id: '3',
      serviceId: 'blade-auth',
      serverHost: 'blade',
      serverIp: '192.168.0.1',
      env: 'dev',
      logLevel: 'info',
      logId: 'test',
      logData: '测试日志3',
      method: 'get',
      requestUri: '/token',
    }
  );
  json.data = {
    total: 10,
    size: 10,
    current: 1,
    searchCount: true,
    pages: 1,
    records: list,
  };
  return res.json(json);
}

function getFakeUsualDetail(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  const detail = {
    id: '3',
    serviceId: 'blade-auth',
    serverHost: 'blade',
    serverIp: '192.168.0.1',
    env: 'dev',
    logLevel: 'info',
    logId: 'test',
    logData: '测试日志3',
    method: 'get',
    requestUri: '/token',
    userAgent:
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
    params: "{'name':'test'}",
    createBy: 'admin',
    createTime: '2018-12-21 12:00:00',
  };
  json.data = detail;
  return res.json(json);
}

function getFakeApiList(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  const list = [];
  list.push(
    {
      id: '1',
      serviceId: 'blade-auth',
      serverHost: 'blade',
      serverIp: '192.168.0.1',
      env: 'dev',
      title: '测试日志1',
      method: 'get',
      requestUri: '/token',
    },
    {
      id: '2',
      serviceId: 'blade-auth',
      serverHost: 'blade',
      serverIp: '192.168.0.1',
      env: 'dev',
      title: '测试日志2',
      method: 'get',
      requestUri: '/token',
    },
    {
      id: '3',
      serviceId: 'blade-auth',
      serverHost: 'blade',
      serverIp: '192.168.0.1',
      env: 'dev',
      title: '测试日志3',
      method: 'get',
      requestUri: '/token',
    }
  );
  json.data = {
    total: 10,
    size: 10,
    current: 1,
    searchCount: true,
    pages: 1,
    records: list,
  };
  return res.json(json);
}

function getFakeApiDetail(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  const detail = {
    id: '3',
    serviceId: 'blade-auth',
    serverHost: 'blade',
    serverIp: '192.168.0.1',
    env: 'dev',
    title: '测试日志3',
    method: 'get',
    requestUri: '/token',
    userAgent:
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
    remoteIp: '0:0:0:0:0:0:0:1',
    methodClass: 'org.springblade.auth.controller.AuthController',
    methodName: 'token',
    time: '19',
    params: "{'account':'test'}",
    createBy: 'admin',
    createTime: '2018-12-21 12:00:00',
  };
  json.data = detail;
  return res.json(json);
}

function getFakeErrorList(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  const list = [];
  list.push(
    {
      id: '1',
      serviceId: 'blade-auth',
      serverHost: 'blade',
      serverIp: '192.168.0.1',
      env: 'dev',
      method: 'get',
      requestUri: '/token',
    },
    {
      id: '2',
      serviceId: 'blade-auth',
      serverHost: 'blade',
      serverIp: '192.168.0.1',
      env: 'dev',
      method: 'get',
      requestUri: '/token',
    },
    {
      id: '3',
      serviceId: 'blade-auth',
      serverHost: 'blade',
      serverIp: '192.168.0.1',
      env: 'dev',
      method: 'get',
      requestUri: '/token',
    }
  );
  json.data = {
    total: 10,
    size: 10,
    current: 1,
    searchCount: true,
    pages: 1,
    records: list,
  };
  return res.json(json);
}

function getFakeErrorDetail(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  const detail = {
    id: '3',
    serviceId: 'blade-auth',
    serverHost: 'blade',
    serverIp: '192.168.0.1',
    env: 'dev',
    method: 'get',
    requestUri: '/token',
    userAgent:
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
    stackTrace:
      'java.lang.ArithmeticException: / by zero\n' +
      '\tat org.springblade.auth.controller.AuthController.token(AuthController.java:58)\n' +
      '\tat org.springblade.auth.controller.AuthController$$FastClassBySpringCGLIB$$98d484bd.invoke()\n' +
      '\tat org.springframework.cglib.proxy.MethodProxy.invoke(MethodProxy.java:204)\n' +
      '\tat org.springframework.aop.framework.CglibAopProxy$CglibMethodInvocation.invokeJoinpoint(CglibAopProxy.java:746)\n' +
      '\tat org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:163)\n' +
      '\tat org.springframework.aop.aspectj.MethodInvocationProceedingJoinPoint.proceed(MethodInvocationProceedingJoinPoint.java:88)\n' +
      '\tat org.springblade.core.log.aspect.ApiLogAspect.around(ApiLogAspect.java:42)\n' +
      '\tat sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)\n' +
      '\tat sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)\n' +
      '\tat sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)\n' +
      '\tat java.lang.reflect.Method.invoke(Method.java:498)\n' +
      '\tat org.springframework.aop.aspectj.AbstractAspectJAdvice.invokeAdviceMethodWithGivenArgs(AbstractAspectJAdvice.java:644)\n' +
      '\tat org.springframework.aop.aspectj.AbstractAspectJAdvice.invokeAdviceMethod(AbstractAspectJAdvice.java:633)\n' +
      '\tat org.springframework.aop.aspectj.AspectJAroundAdvice.invoke(AspectJAroundAdvice.java:70)\n' +
      '\tat org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:174)\n' +
      '\tat org.springframework.aop.interceptor.ExposeInvocationInterceptor.invoke(ExposeInvocationInterceptor.java:92)\n' +
      '\tat org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:185)\n' +
      '\tat org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:688)\n' +
      '\tat org.springblade.auth.controller.AuthController$$EnhancerBySpringCGLIB$$e4cbcf2e.token()\n' +
      '\tat sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)\n' +
      '\tat sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)\n' +
      '\tat sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)\n' +
      '\tat java.lang.reflect.Method.invoke(Method.java:498)\n' +
      '\tat org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:209)\n' +
      '\tat org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:136)\n' +
      '\tat org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:102)\n' +
      '\tat org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:891)\n' +
      '\tat org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:797)\n' +
      '\tat org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87)\n' +
      '\tat org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:991)\n' +
      '\tat org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:925)\n' +
      '\tat org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:974)\n' +
      '\tat org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:877)\n' +
      '\tat javax.servlet.http.HttpServlet.service(HttpServlet.java:707)\n' +
      '\tat org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:851)\n' +
      '\tat javax.servlet.http.HttpServlet.service(HttpServlet.java:790)\n' +
      '\tat io.undertow.servlet.handlers.ServletHandler.handleRequest(ServletHandler.java:74)\n' +
      '\tat io.undertow.servlet.handlers.FilterHandler$FilterChainImpl.doFilter(FilterHandler.java:129)\n' +
      '\tat org.springblade.core.tool.support.xss.XssFilter.doFilter(XssFilter.java:40)\n' +
      '\tat io.undertow.servlet.core.ManagedFilter.doFilter(ManagedFilter.java:61)\n' +
      '\tat io.undertow.servlet.handlers.FilterHandler$FilterChainImpl.doFilter(FilterHandler.java:131)\n' +
      '\tat org.springframework.boot.actuate.web.trace.servlet.HttpTraceFilter.doFilterInternal(HttpTraceFilter.java:90)\n' +
      '\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107)\n' +
      '\tat io.undertow.servlet.core.ManagedFilter.doFilter(ManagedFilter.java:61)\n' +
      '\tat io.undertow.servlet.handlers.FilterHandler$FilterChainImpl.doFilter(FilterHandler.java:131)\n' +
      '\tat org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:99)\n' +
      '\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107)\n' +
      '\tat io.undertow.servlet.core.ManagedFilter.doFilter(ManagedFilter.java:61)\n' +
      '\tat io.undertow.servlet.handlers.FilterHandler$FilterChainImpl.doFilter(FilterHandler.java:131)\n' +
      '\tat org.springframework.web.filter.HttpPutFormContentFilter.doFilterInternal(HttpPutFormContentFilter.java:109)\n' +
      '\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107)\n' +
      '\tat io.undertow.servlet.core.ManagedFilter.doFilter(ManagedFilter.java:61)\n' +
      '\tat io.undertow.servlet.handlers.FilterHandler$FilterChainImpl.doFilter(FilterHandler.java:131)\n' +
      '\tat org.springframework.web.filter.HiddenHttpMethodFilter.doFilterInternal(HiddenHttpMethodFilter.java:93)\n' +
      '\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107)\n' +
      '\tat io.undertow.servlet.core.ManagedFilter.doFilter(ManagedFilter.java:61)\n' +
      '\tat io.undertow.servlet.handlers.FilterHandler$FilterChainImpl.doFilter(FilterHandler.java:131)\n' +
      '\tat org.springframework.boot.actuate.metrics.web.servlet.WebMvcMetricsFilter.filterAndRecordMetrics(WebMvcMetricsFilter.java:155)\n' +
      '\tat org.springframework.boot.actuate.metrics.web.servlet.WebMvcMetricsFilter.filterAndRecordMetrics(WebMvcMetricsFilter.java:123)\n' +
      '\tat org.springframework.boot.actuate.metrics.web.servlet.WebMvcMetricsFilter.doFilterInternal(WebMvcMetricsFilter.java:108)\n' +
      '\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107)\n' +
      '\tat io.undertow.servlet.core.ManagedFilter.doFilter(ManagedFilter.java:61)\n' +
      '\tat io.undertow.servlet.handlers.FilterHandler$FilterChainImpl.doFilter(FilterHandler.java:131)\n' +
      '\tat org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:200)\n' +
      '\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107)\n' +
      '\tat io.undertow.servlet.core.ManagedFilter.doFilter(ManagedFilter.java:61)\n' +
      '\tat io.undertow.servlet.handlers.FilterHandler$FilterChainImpl.doFilter(FilterHandler.java:131)\n' +
      '\tat io.undertow.servlet.handlers.FilterHandler.handleRequest(FilterHandler.java:84)\n' +
      '\tat io.undertow.servlet.handlers.security.ServletSecurityRoleHandler.handleRequest(ServletSecurityRoleHandler.java:62)\n' +
      '\tat io.undertow.servlet.handlers.ServletChain$1.handleRequest(ServletChain.java:65)\n' +
      '\tat io.undertow.servlet.handlers.ServletDispatchingHandler.handleRequest(ServletDispatchingHandler.java:36)\n' +
      '\tat io.undertow.servlet.handlers.security.SSLInformationAssociationHandler.handleRequest(SSLInformationAssociationHandler.java:132)\n' +
      '\tat io.undertow.servlet.handlers.security.ServletAuthenticationCallHandler.handleRequest(ServletAuthenticationCallHandler.java:57)\n' +
      '\tat io.undertow.server.handlers.PredicateHandler.handleRequest(PredicateHandler.java:43)\n' +
      '\tat io.undertow.security.handlers.AbstractConfidentialityHandler.handleRequest(AbstractConfidentialityHandler.java:46)\n' +
      '\tat io.undertow.servlet.handlers.security.ServletConfidentialityConstraintHandler.handleRequest(ServletConfidentialityConstraintHandler.java:64)\n' +
      '\tat io.undertow.security.handlers.AuthenticationMechanismsHandler.handleRequest(AuthenticationMechanismsHandler.java:60)\n' +
      '\tat io.undertow.servlet.handlers.security.CachedAuthenticatedSessionHandler.handleRequest(CachedAuthenticatedSessionHandler.java:77)\n' +
      '\tat io.undertow.security.handlers.AbstractSecurityContextAssociationHandler.handleRequest(AbstractSecurityContextAssociationHandler.java:43)\n' +
      '\tat io.undertow.server.handlers.PredicateHandler.handleRequest(PredicateHandler.java:43)\n' +
      '\tat io.undertow.server.handlers.PredicateHandler.handleRequest(PredicateHandler.java:43)\n' +
      '\tat io.undertow.servlet.handlers.SessionRestoringHandler.handleRequest(SessionRestoringHandler.java:119)\n' +
      '\tat io.undertow.servlet.handlers.ServletInitialHandler.handleFirstRequest(ServletInitialHandler.java:292)\n' +
      '\tat io.undertow.servlet.handlers.ServletInitialHandler.access$100(ServletInitialHandler.java:81)\n' +
      '\tat io.undertow.servlet.handlers.ServletInitialHandler$2.call(ServletInitialHandler.java:138)\n' +
      '\tat io.undertow.servlet.handlers.ServletInitialHandler$2.call(ServletInitialHandler.java:135)\n' +
      '\tat io.undertow.servlet.core.ServletRequestContextThreadSetupAction$1.call(ServletRequestContextThreadSetupAction.java:48)\n' +
      '\tat io.undertow.servlet.core.ContextClassLoaderSetupAction$1.call(ContextClassLoaderSetupAction.java:43)\n' +
      '\tat io.undertow.servlet.handlers.ServletInitialHandler.dispatchRequest(ServletInitialHandler.java:272)\n' +
      '\tat io.undertow.servlet.handlers.ServletInitialHandler.access$000(ServletInitialHandler.java:81)\n' +
      '\tat io.undertow.servlet.handlers.ServletInitialHandler$1.handleRequest(ServletInitialHandler.java:104)\n' +
      '\tat io.undertow.server.Connectors.executeRootHandler(Connectors.java:336)\n' +
      '\tat io.undertow.server.HttpServerExchange$1.run(HttpServerExchange.java:830)\n' +
      '\tat java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)\n' +
      '\tat java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)\n' +
      '\tat java.lang.Thread.run(Thread.java:748)\n',
    exceptionName: 'java.lang.ArithmeticException',
    message: '/ by zero',
    lineNumber: '58',
    methodClass: 'org.springblade.auth.controller.AuthController',
    fileName: 'AuthController.java',
    methodName: 'token',
    params: "{name:'test'}",
    createBy: 'admin',
    createTime: '2018-12-21 12:00:00',
  };
  json.data = detail;
  return res.json(json);
}

const proxy = {
  'GET /api/blade-log/usual/list': getFakeUsualList,
  'GET /api/blade-log/usual/detail': getFakeUsualDetail,
  'GET /api/blade-log/api/list': getFakeApiList,
  'GET /api/blade-log/api/detail': getFakeApiDetail,
  'GET /api/blade-log/error/list': getFakeErrorList,
  'GET /api/blade-log/error/detail': getFakeErrorDetail,
};
export default delay(proxy, 500);
