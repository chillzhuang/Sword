// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authorityString =
    typeof str === 'undefined' ? localStorage.getItem('sword-authority') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority || ['guest'];
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? authority.split(',') : authority;
  return localStorage.setItem('sword-authority', JSON.stringify(proAuthority));
}

export function getToken() {
  return localStorage.getItem('sword-token');
}

export function setToken(token) {
  localStorage.setItem('sword-token', token);
}

export function getRoutes() {
  return JSON.parse(localStorage.getItem('sword-routes')) || [];
}

export function setRoutes(routes) {
  localStorage.removeItem('sword-routes');
  localStorage.setItem('sword-routes', JSON.stringify(routes));
}

export function getButton(code) {
  const buttons = getButtons();
  const data = buttons.filter(d => {
    return d.code === code;
  });
  return data.length === 0 ? [] : data[0].buttons;
}

export function getButtons() {
  return JSON.parse(localStorage.getItem('sword-buttons')) || [];
}

export function setButtons(buttons) {
  localStorage.removeItem('sword-buttons');
  localStorage.setItem('sword-buttons', JSON.stringify(buttons));
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('sword-current-user'));
}

export function setCurrentUser(account) {
  localStorage.setItem('sword-current-user', JSON.stringify(account));
}

export function removeAll() {
  localStorage.removeItem('sword-authority');
  localStorage.removeItem('sword-token');
  localStorage.removeItem('sword-routes');
  localStorage.removeItem('sword-buttons');
  localStorage.removeItem('sword-current-user');
}
