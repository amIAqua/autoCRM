import axios from 'axios'

export default axios.create({
  baseURL: 'https://morning-castle-83919.herokuapp.com/api',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
})
