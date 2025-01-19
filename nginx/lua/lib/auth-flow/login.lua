local _M = {}
local ngx = require "ngx"
local db = require("./lib/db")
local bcrypt = require "bcrypt"
local json = require "cjson"
local jwt = require "resty.jwt"
local secret_key = os.getenv("SECRET") or "abracadabra"

function _M.generate_token(id,role)
    local payload = {
        id = id,
        role = role,
        iat = ngx.time(),
        exp = ngx.time() + 3600
    }    local token = jwt:sign(
        secret_key,
        {
            header = { typ = "JWT", alg = "HS256"},
            payload = payload
        }
    )
    return token;
end

function _M.login(server)
    local headers = server.req.get_headers()
    -- local ct_email = headers["ct_email"]
    -- local pw_usuario = headers["pw_usuario"]
    local ct_email = "danilo@baratao.com"
    local pw_usuario = "764066"
    local valid_credentials = (ct_email ~= nil or ct_email ~= '') and (pw_usuario ~= nil or pw_usuario ~= '')
    if valid_credentials == false then
        server.status = 403
        server.say(json.encode({message = "Not Found"}))
        server.exit(server.OK)
    end
    if valid_credentials then
        
        local search = db.find_user_by_email(ct_email)
        if (search == nil) or (search == false) then
            server.status = 404
            server.say(json.encode({message = "Not Found"}))
            server.exit(server.OK)
        end
        if (search.pw_usuario ~= nil) and (bcrypt.verify(pw_usuario, search.pw_usuario)) then
            server.status = 200
            local token = _M.generate_token(search.id, search.nm_grupo)
            server.say(json.encode({
                message = 'Success loggin',  
                user_id = search.id, 
                token = token
            }))
            server.exit(server.OK)
        end
    end
        

end

return _M
