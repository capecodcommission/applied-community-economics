// Create api-root to insert into actions to easily access API function
export const API_ROOT = (process.env.NODE_ENV === 'production')
			? 'http://ccc-api-05.api.capecodcommission.org/api/'
			:'http://ccc-api-05.api.capecodcommission.org/api/'

export const CookieDomain = (process.env.NODE_ENV === 'production')
			? '.ccc.top'
			:''

