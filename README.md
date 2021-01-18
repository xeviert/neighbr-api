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

This is the server side of Neighbr App. I used Node/Express to build the API. PostgreSQL/Knex was used for the database setup.

<p>This application is meant to be used as an online bulletin board for your neighborhood but focused on asking for help and helping others.
</p>

<p>
This is the client side of the application which was built using React. This is my first full stack application project for my Thinkful program. I learned a lot with this project and as I keep building I am thinking of more features that I would like to add to this. In the future I plan on adding a GPS feature tied to the address of the user profile. I would also like to add more comprehensive features to the user profile and individual favor items. For now the profile page brings back some of the information that was used while making an account.
</p>


<p>
To get started, the user registers to create an account.
</p>
<img src="\images\register-desk.png" />

<p>
The home page is where the main functionality takes place. The logged in user is able to see favor posts made by other users. At the top of the feed, the user is also able to create a favor post as well. 
</p>
<img src="\images\home-desk.png" />