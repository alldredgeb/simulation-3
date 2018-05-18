insert into helo_users (u_pic_url, u_first_name, u_last_name, u_auth_0) 
values ($1, $2, $3, $4) 
returning *;