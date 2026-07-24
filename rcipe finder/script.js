const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const recipes = document.getElementById("recipes");
const resultCount = document.getElementById("resultCount");



const recipeModal = document.getElementById("recipeModal");
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalCategory = document.getElementById("modalCategory");
const modalArea = document.getElementById("modalArea");
const ingredientsList = document.getElementById("ingredientsList");
const modalInstructions = document.getElementById("modalInstructions");
const youtubeLink = document.getElementById("youtubeLink");
const closeModal = document.getElementById("closeModal");












async function getRecipes() {
    const searchValue = searchInput.value.trim();
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
    const response = await fetch(url);
    const data = await response.json();
  
    recipes.innerHTML = '';
    if (searchValue === "") {
    recipes.innerHTML = "";
    resultCount.textContent = "Found 0 recipes";
    return;
}



    if (!data.meals) {
    recipes.innerHTML = `
        <h2 class="text-center text-red-500 text-xl">
            No recipes found.
        </h2>
    `;
    resultCount.textContent = "Found 0 recipes";
    return;
}
    resultCount.textContent = `Found ${data.meals.length} recipes`;

data.meals.forEach(meal => {
        let htmlCardd = `
        <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">

    <img
        src="${meal.strMealThumb}"
        alt=""
        class="w-full h-56 object-cover">

    <div class="p-5">

        <h2 class="text-xl font-bold text-gray-800 mb-2">
            ${meal.strMeal}
        </h2>

        <div class="flex justify-between text-sm text-gray-600 mb-4">

            <span>
                ${meal.strCategory}
            </span>

            <span>
                ${meal.strArea}
            </span>

        </div>

        <button
            data-id = "${meal.idMeal}"
            class="view-btn w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition">

            View Recipe

        </button>

    </div>

                </div>`
        recipes.innerHTML += htmlCardd        
    });
   
    
}



searchBtn.addEventListener('click', getRecipes)

clearBtn.addEventListener('click', ()=>{
    searchInput.value = "";

    recipes.innerHTML = "";

    resultCount.textContent = "Found 0 recipes";

    searchInput.focus();

   
    
})





recipes.addEventListener("click", async (event) => {

    if (!event.target.classList.contains("view-btn")) return;

    const id = event.target.dataset.id;

    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    console.log(url)

    const response = await fetch(url);
    const data = await response.json();
    console.log(data)


     const meal = data.meals[0];

    modalTitle.textContent = meal.strMeal;
    modalImage.src = meal.strMealThumb;
    modalCategory.textContent = meal.strCategory;
    modalArea.textContent = meal.strArea;
    modalInstructions.textContent = meal.strInstructions;
    youtubeLink.href = meal.strYoutube;

    ingredientsList.innerHTML = "";

    for (let i = 1; i <= 20; i++) {

        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "") {

            ingredientsList.innerHTML += `
                <li>${measure} ${ingredient}</li>
            `;

        }
    }

    recipeModal.classList.remove("hidden");
    recipeModal.classList.add("flex");
});





closeModal.addEventListener("click", () => {
    recipeModal.classList.add("hidden");
recipeModal.classList.remove("flex");
});

recipeModal.addEventListener("click", (event) => {

    if (event.target === recipeModal) {
        recipeModal.classList.add("hidden");
    }

});