// decodes auth token to get user/id
import jwtDecoder from 'jwt-decode';
const getUserFromToken = () => {
  const token = window.localStorage.cocanvasAuthToken;
  return token ? jwtDecoder(token) : '';
};
export default getUserFromToken;
