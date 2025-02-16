local _M = {}
local ngx = require "ngx"
local db = require("./lib/db")
local helpers = require("./lib/helpers")
local bcrypt = require "bcrypt"
local json = require "cjson"


function _M.login()
    local headers = ngx.req.get_headers()
    local ct_email = headers["ct_email"]
    local pw_usuario = headers["pw_usuario"]
    local valid_credentials = (ct_email ~= nil or ct_email ~= '') and (pw_usuario ~= nil or pw_usuario ~= '')
    if valid_credentials == false then
        helpers.response(ngx.HTTP_FORBIDDEN, "Forbidden")
    end
    if valid_credentials then
        
        local search = db.find_user_by_email(ct_email)

        if (search == nil) or (search == false) then
            helpers.response(ngx.HTTP_NOT_FOUND, "Not Found")
        end
    
        if (search ~= nil) and (bcrypt.verify(pw_usuario, search.pw_usuario)) then

            helpers.response(ngx.OK, "Success")

            ngx.status = 200
            local token = helpers.generate_token(search.id, search.nm_grupo)
            ngx.say(json.encode({
                message = 'Success loggin',  
                user_id = search.id, 
                token = token
            }))
            ngx.exit(ngx.OK)
        end    
    end


end


return _M
