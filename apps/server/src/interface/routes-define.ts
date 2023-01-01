import { routesManager } from './routes-manager'
import { getWeatherRoute } from './routes/get-weather.route'

routesManager.addRoute({
  path: '/',
  method: 'GET',
  callback: getWeatherRoute,
})

routesManager.addRoute({
  path: '/api/data',
  method: 'GET',
  callback: getWeatherRoute,
})
