local ngx = require "ngx"

local auth = {
    login = require("./lib/auth-flow/login").login,
    -- register = require("./lib/auth-flow/register").register,
    verify = require("./lib/auth-flow/verify").verify_token
};


-- banco de dados
local uri = ngx.var.uri

local function handle_request()

    ngx.header.content_type = "application/json" 
    if  uri == '/auth/login' then
        auth.login()
    end
    if  uri == '/auth/register' then
        ngx.say("hi from register");        
    end
    if  uri == '/auth/verify' then
        auth.verify() 
    end
end

return handle_request()
