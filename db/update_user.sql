update helo_users 
set u_first_name = $2, u_last_name = $3, u_gender = $4, u_hair_color = $5, u_eye_color = $6, u_hobby = $7, u_birth_day= $8, u_birth_month = $9, u_birth_year = $10
where id = $1 
returning *;