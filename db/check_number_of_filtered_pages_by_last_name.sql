select count(*) from helo_users 
where id != $1 
and u_last_name like '%' || $2 || '%';