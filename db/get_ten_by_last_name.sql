select * from helo_users 
where id != $1 
and u_last_name like '%' || $2 || '%'  
order by id 
limit 10 offset $3;