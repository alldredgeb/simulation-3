delete from helo_users_and_friends 
where user_id = $1 and friend_id = $2;