import { routesManager } from '../interface/system/routes-manager'

import { getWeatherRoute } from './get-weather.route'

export function registerRoutes() {
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
}
