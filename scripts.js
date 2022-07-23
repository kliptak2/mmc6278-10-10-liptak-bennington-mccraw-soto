const cat_result = document.getElementById('cat_result');
const dog_result = document.getElementById('dog_result');
let prev_dogs = []
let prev_cats = []

function getRandomCat() {
	fetch('https://aws.random.cat/meow')
		.then(res => res.json())
		.then(data => {
			saveResult("cat", data.file)
			cat_result.innerHTML = `<img src=${data.file} alt="cat" class="img-fluid" />`
		})
}

function getRandomDog() {
	fetch('https://random.dog/woof.json')
		.then(res => res.json())
		.then(data => {
			if(data.url.includes('.mp4')) {
				getRandomDog();
			}
			else {
				saveResult("dog", data.url)
				dog_result.innerHTML = `<img src=${data.url} alt="dog" class="img-fluid" />`
			}
		});
}

function saveResult(type, src){
	if (type === "cat"){
		if (prev_cats.length >= 5){
			prev_cats.shift()
		}
		prev_cats.push(src)
	} else {
		if (prev_dogs.length >= 5){
			prev_dogs.shift()
		}
		prev_dogs.push(src)
	}
	console.log(prev_dogs)
	localStorage.setItem("prev_dogs", JSON.stringify(prev_dogs))
	localStorage.setItem("prev_cats", JSON.stringify(prev_cats))
}

document.body.onload = async function() {
	let stringCats = localStorage.getItem("prev_cats")
	let stringDogs = localStorage.getItem("prev_dogs")
	if (stringCats){
		prev_cats = await JSON.parse(stringCats)
	}
	if (stringDogs){
		prev_dogs = await JSON.parse(stringDogs)
	}
}
