local ngx = require "ngx"

local auth = {
    login = require("./lib/auth-flow/login").login,
    -- register = require("./lib/auth-flow/register").register,
    -- verify = require("./lib/auth-flow/verify").verify
};


-- banco de dados
local uri = ngx.var.uri

local function handle_request()

    ngx.header.content_type = "application/json" 
    if  uri == '/auth/login' then
        auth.login(ngx)
    end
    if  uri == '/auth/register' then
        ngx.say("hi from register");        
    end
    if  uri == '/auth/verify' then
        ngx.say("hi from verify");     
    end
end

return handle_request()
