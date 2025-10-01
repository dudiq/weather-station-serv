import { handleRequest } from './interface/system/handle-request'
import { startServer } from './interface/system/start-server'

startServer(handleRequest)
