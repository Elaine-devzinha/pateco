_M = {}
local jwt = require "resty.jwt"
local socket = require "socket" 
local ngx = require "ngx"
local secret_key = os.getenv("SECRET") or "abracadabra"
local json = require "cjson"

-- função response, usada para responder requisições HTTP
function _M.response(status, message, data)
    local response = {message = message}
    if type(data) == 'table' then 
        for k, v in pairs(data) do
            response[k] = v
        end
    end
    ngx.status = status
    ngx.say(json.encode(response))
    ngx.exit(ngx.OK)
end

function _M.receive()
    ngx.req.read_body()
    local data = ngx.req.get_body_data()
    if data ~= nil then
        return json.decode(data)
    end
    return nil
end

function _M.generate_token(id,role)
    local payload = {
        id = id,
        role = role,
        iat = ngx.time(),
        exp = ngx.time() + 3600
    }   
        local token = jwt:sign(
        secret_key,
        {
            header = { typ = "JWT", alg = "HS256"},
            payload = payload
        }
    )
    return token;
end

-- not in use
function _M.current_time()
    local time = os.time()
    local milliseconds = math.floor(socket.gettime() * 1000) % 1000
    local utc_time = os.date("!%Y-%m-%dT%H:%M:%S", time)
    return string.format("%s.%03dZ", utc_time, milliseconds)
end

return _M