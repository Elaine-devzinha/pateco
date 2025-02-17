local _M = {}

local mysql = require "resty.mysql"
local ngx = require "ngx"
local db_host = os.getenv("DB_HOST") or "127.0.0.1"
local db_port = tonumber(os.getenv("DB_PORT")) or 3306
local db_user = os.getenv("DB_USERNAME") or "root"
local db_password = os.getenv("DB_PASSWORD") or ""
local db_name = os.getenv("DB_DATABASE") or "nome_do_banco"
local conn = nil

-- Função para conectar ao banco de dados
function _M.connect()
    local db, err = mysql:new()
    if not db then
        ngx.log(ngx.ERR, "Erro ao criar conexão com o MySQL: " .. err)
        return nil
    end

    db:set_timeout(1000)

    local ok, err, errcode, sqlstate = db:connect{
        host = db_host,
        port = db_port,
        database = db_name,
        user = db_user,
        password = db_password,
        charset = "utf8",
        max_packet_size = 1024 * 1024,
    }

    if not ok then
        ngx.log(ngx.ERR, "Erro ao conectar ao banco de dados externo: " .. err)
        return nil
    end

    ngx.log(ngx.INFO, "Conexão com banco de dados estabelecida.")
    return db
end

-- Função para buscar usuário pelo email
function _M.find_user_by_email(email)
    -- Verifica se a conexão está ativa, caso contrário, conecta
    if conn == nil then
        conn = _M.connect()
    end
    if conn ~= nil then
        if email == nil then
            return false
        end
        -- Consulta SQL preparada
        local query = string.format(
            "SELECT `usuario`.`id`, `usuario`.`nm_usuario`, `usuario`.`ct_email`, `usuario`.`pw_usuario`, `usuario`.`createdAt`, `usuario`.`updatedAt`, `grupo`.`id` AS `grupo.id`, `grupo`.`nm_grupo` AS `grupo.nm_grupo` FROM `usuarios` AS `usuario` LEFT OUTER JOIN `grupos` AS `grupo` ON `usuario`.`cd_grupo` = `grupo`.`id` WHERE `usuario`.`ct_email` = '%s' LIMIT 1;",
            email)

        -- Executa a consulta
        local res, err, errcode, sqlstate = conn:query(query)

        if not res then
            ngx.log(ngx.ERR, "Erro ao executar consulta: " .. err)
            conn:close()
            conn = nil
            return false
        end

        if #res == 0 then

            conn:close()
            conn = nil
            return false
        end

        conn:close()
        conn = nil
        return res[1]
    end
end


-- Função para adicionar um usuário
function _M.add_user(nm_usuario, ct_email, pw_usuario)
    -- Verifica se a conexão está ativa, caso contrário, conecta
    if nm_usuario == nil or ct_email == nil or pw_usuario == nil then
        
        return false
    end
    if conn == nil then
        conn = _M.connect()
    end
    if conn ~= nil then
        
        -- local createdAt = helpers.current_time()
        -- local updatedAt = createdAt
        local query = string.format(
            "INSERT INTO usuarios (id, nm_usuario, ct_email, pw_usuario) VALUES (DEFAULT, '%s', '%s', '%s');",
            nm_usuario, ct_email, pw_usuario)

        -- Executa a consulta
        local res, err, errcode, sqlstate = conn:query(query)

        if not res then
            ngx.log(ngx.ERR, "Erro ao executar consulta: " .. err)
            conn:close()
            conn = nil
            return false
        end

        ngx.log(ngx.INFO, "Usuário adicionado com sucesso: ", ct_email)
        conn:close()
        conn = nil
        return res.insert_id
    end
end
return _M
