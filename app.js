var express = require('express');
var app = express();

var people = [{id:1, name:"a", age:40}, {id:2, name:"b", age:35}, {id:3, name:"c", age:45}]

app.use(express.json());


app.listen(3000, () =>{

	console.log('server listening on 3000');

});

app.get('/', (req,res) => {

	res.send('Welcome to the Example Project');

});


app.get('/people', (req,res) => {

	res.send(people);

} );

app.get('/people/:id', (req,res) => {

	var person = people.find(p => p.id === parseInt(req.params.id));

	if(!person) return res.status(404).send('The person with the requested id: ' + req.params.id + ' was not found');

	res.send(person);

} );

app.post('/people', (req,res) => {

	var person = {

		id: people.length + 1,

		name: req.body.name,

		age: req.body.age

	};

	people.push(person);

	res.send(people);

});

app.put('/people/:id', (req,res) => {

	var person = people.find(p => p.id === parseInt(req.params.id));

	if(!person) return res.status(404).send('The person with the requested id: ' + req.params.id + ' was not found');

	person.name = req.body.name;

	person.age = req.body.age;

	res.send(person);

});

app.delete('/people/:id', (req,res) => {

	var person = people.find(p => p.id === parseInt(req.params.id));	

	if(!person) return res.status(404).send('The person with the requested id: ' + req.params.id + ' was not found');

	var index = people.indexOf(person);

	people.splice(index, 1);

	res.send(people);
});


