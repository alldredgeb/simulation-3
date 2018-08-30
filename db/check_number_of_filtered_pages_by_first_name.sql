select count(*) from helo_users 
where id != $1 
and u_first_name like '%' || $2 || '%';