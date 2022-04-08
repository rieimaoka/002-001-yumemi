import axios from 'axios'
axios.defaults.headers.common['X-API-KEY'] = process.env.RESAS_API_KEY
