db.createUser(
    {
        user: "user1",
        pwd: "password1",
        roles: [
            {
                role: "readWrite",
                db: "token_info_service"
            }
        ]
    }
);
db.createCollection("test");