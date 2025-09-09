import { handleRequest } from './interface/handle-request'
import { startServer } from './interface/start-server'

startServer(handleRequest)
