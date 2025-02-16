local _M = {}
local ngx = require "ngx"
local secret_key = os.getenv("SECRET") or "abracadabra"
local json = require "cjson"
local jwt = require "resty.jwt"


local function respond(status, message)
    ngx.status = status
    ngx.header.content_type = 'application/json'
    ngx.say(json.encode({status=status,message=message}))
    ngx.exit(status);
end

function _M.verify_token()
    local auth_header = ngx.req.get_headers()["Authorization"]
    if not auth_header then
        
        respond(ngx.HTTP_UNAUTHORIZED, "Token ausente")
    end

    local token = auth_header:match("^Bearer%s+(.+)$")
    if not token then
        respond(ngx.HTTP_UNAUTHORIZED, "Token invalid ou ausente")
    end

    local auth = jwt:verify(secret_key, token)
    if not auth.verified then
        respond(ngx.HTTP_UNAUTHORIZED, "Token JWT inválido: " .. auth.reason)
    end
    ngx.log(ngx.INFO, "Usuário autorizado")
end

if not pcall(debug.getlocal, 4, 1) then
    _M.verify_token()
end

return _M

