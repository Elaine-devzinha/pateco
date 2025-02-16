local _M = {}
local ngx = require "ngx"
local db = require("./lib/db")
local bcrypt = require "bcrypt"
local helpers = require("./lib/helpers")

function _M.register()

   local data = helpers.receive()
   if data ~= nil then

        local ct_email = data.ct_email
        local pw_usuario = data.pw_usuario
        local nm_usuario = data.nm_usuario
        local valid_credentials = (ct_email ~= nil or ct_email ~= '') and (pw_usuario ~= nil or pw_usuario ~= '') and (nm_usuario ~= nil or nm_usuario ~= '')
        if valid_credentials == false then
            helpers.response(ngx.HTTP_FORBIDDEN, "Forbidden")
        end
        if valid_credentials then

                local hashed_password = bcrypt.digest(pw_usuario, 12)
                local user = db.add_user(nm_usuario,ct_email, pw_usuario)
                if user then
                    helpers.response(ngx.HTTP_OK, "Success Register",{
                        user_id = user
                    })
                end
            if user == false or user ~= nil then
                helpers.response(ngx.HTTP_BAD_REQUEST, "Bad Request")
            end
        end
   end
end

return _M