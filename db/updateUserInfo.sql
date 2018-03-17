UPDATE users
SET full_name = $1, email = $2, address = $3 , city = $4 , state = $5 , zipcode = $6 WHERE id = $7 RETURNING *;