select * from helo_users 
where id != $1 
and id NOT IN (select friend_id from helo_users_and_friends where user_id = $1);