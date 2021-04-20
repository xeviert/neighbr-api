# Neighbr API

## Created for [Neighbr Client](https://neighbr.vercel.app/)

### Full Stack Application using Express, Knex, NodeJS, and React.

---

### API ENDPOINTS

```
/login
-- POST - login user

/register
-- POST - register a user

/profile
-- GET - get logged in user information 

/favors
-- GET - get all favors in order from most to least recent.
-- POST - creates a favor from logged in user.
```

This application is meant to be used as an online bulletin board for your neighborhood but focused on asking for help and helping others. User is able to view posts from other users, similar to social media feed. User can post themselves with details about what they need help with including the title of post, payment, and description. 

This is the server side of Neighbr App. I used Node/Express to build the API. PostgreSQL/Knex was used for the database setup.