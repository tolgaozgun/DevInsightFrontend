import Cookies from 'js-cookie';

export const useToken = () => {
	const accessToken = Cookies.get('accessToken');
	const refreshToken = Cookies.get('refreshToken');

	return {
		accessToken: accessToken ? accessToken : null,
		refreshToken: refreshToken ? refreshToken : null,
	};
};