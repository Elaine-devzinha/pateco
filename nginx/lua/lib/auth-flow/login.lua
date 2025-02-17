local _M = {}
local ngx = require "ngx"
local db = require("./lib/db")
local helpers = require("./lib/helpers")
local json = require "cjson"

local bcrypt = require "bcrypt"


function _M.login()
    local data = helpers.receive()
    local ct_email 
    local pw_usuario 
    if data ~= nil then
       
        ct_email = data.ct_email
        pw_usuario = data.pw_usuario
        
        
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
                local token = helpers.generate_token(search["id"], search["grupo.nm_grupo"])

                helpers.response(ngx.HTTP_OK, "Success loggin", {
                    user_id = search.id,
                    token = token
                })
            end    
        end
    end


end


return _M
