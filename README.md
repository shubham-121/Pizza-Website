How to setups a mock api?
1-install the json-server : npm i -g json-server
2-create a db.json file : put the api data inside it
3- run json server using command: json-server --watch db.json --port 4000

everytime you use the mock api, you need to manually run the server also
fetch pizza data from this: ("http://localhost:4000/pizza-data")
fetch users data from this: ("http://localhost:4000/users")
fetch orders data from this: ("http://localhost:4000/orders")
