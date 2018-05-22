select * from helo_users 
where id != $1 
and $2 like %$3% 
order by id 
limit 10 offset $4;