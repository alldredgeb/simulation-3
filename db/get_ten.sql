select * from helo_users 
where id != $1 
order by id 
limit 10 offset $2;