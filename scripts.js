const cat_result = document.getElementById('cat_result');
const dog_result = document.getElementById('dog_result');
const cat_thumbnails = document.getElementById('cat_thumbnails')
const dog_thumbnails = document.getElementById('dog_thumbnails')
let prev_cats = []
let prev_dogs = []

function getRandomCat() {
	fetch('https://aws.random.cat/meow')
		.then(res => res.json())
		.then(data => {
			cat_result.innerHTML = `<img src=${data.file} alt="cat" class="img-fluid" />`
			cat_thumbnails.innerHTML = ""
			prev_cats.forEach(url => {
				let img = document.createElement('img')
				img.src = url
				console.log (img)
				img.alt = 'cat thumbnails'
				img.classList.add("img-fluid", "thumbnail")
				cat_thumbnails.append(img)
			})
			saveResult("cat", data.file)
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
				dog_result.innerHTML = `<img src=${data.url} alt="dog" class="img-fluid" />`
				dog_thumbnails.innerHTML = ""
				prev_dogs.forEach(url => {
					let img = document.createElement('img')
					img.src = url
					console.log (img)
					img.alt = 'dog thumbnails'
					img.classList.add("img-fluid", "thumbnail")
					dog_thumbnails.append(img)
				})
			saveResult("dog", data.url)
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
		prev_cats = JSON.parse(stringCats)
	}
	if (stringDogs){
		prev_dogs = JSON.parse(stringDogs)
	}
}
