//function for random coloring an element's text
function randomColor(element){
    //defining an array of random colors
    const colorArray = [
        "purple",
        "blue",
        "yellow",
        "white",
        "lightgreen"
    ]
    
    //using the random array key to assign the color to the element
    setInterval(() => {
        let randomNumber = Math.floor(Math.random () * colorArray.length);
        element.style.color = colorArray[randomNumber];
    }, 1000);
    
}

//getting the random drink button and call the random color function
let randomButton = document.querySelector("#randomDrink")
randomColor(randomButton);

//get the container for the thumbnail
const thumbnailParent = document.querySelector(".randomCocktailThumb")

//setting up the function for fetch data from cocktailDB API
async function getRandomCocktail() {
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    const data = await response.json()

    //clear the container to initialize it for the next cocktail
    thumbnailParent.innerHTML = null

    //get the place of the thumbnail in the HTML and put the image inside of it
    let cocktailImg = document.createElement("img")
    cocktailImg.src = data.drinks[0].strDrinkThumb
    cocktailImg.classList.add("randomCocktail")
    
    //adding the class with the animation with the help of a setTimeout
    setTimeout(() => {
        cocktailImg.classList.add("cocktailAnimation")
    }, 10);

    thumbnailParent.appendChild(cocktailImg)

    //adding the name of the cocktail under the image
    let cocktailName = document.createElement("h5")
    cocktailName.innerHTML = data.drinks[0].strDrink
    thumbnailParent.appendChild(cocktailName)

    //getting the instructions for creating the cocktail and show it to the user
    let cocktailDescription = document.createElement("article")
    cocktailDescription.innerHTML = data.drinks[0].strInstructions
    thumbnailParent.appendChild(cocktailDescription)
}

//adding event listener to the button for fetching a random cocktail from cocktailDB API
randomButton.addEventListener("click", ()=>{
    getRandomCocktail()
})