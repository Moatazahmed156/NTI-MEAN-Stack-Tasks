const input = document.getElementById("searchInput");
const button = document.getElementById("searchBtn");
const result = document.getElementById("result");

button.addEventListener("click", searchMeal);

async function searchMeal() {

    const mealName = input.value.trim();

    if (mealName === "") {
        alert("Please enter a meal name");
        return;
    }

    result.innerHTML = "<h2>Loading...</h2>";

    try {

        const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
        );

        const data = await response.json();

        result.innerHTML = "";

        if (data.meals === null) {

            result.innerHTML =
                `<p class="message">No meals found.</p>`;

            return;
        }

        data.meals.forEach(meal => {

            result.innerHTML += `

            <div class="card">

                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">

                <h3>${meal.strMeal}</h3>

            </div>

            `;

        });

    } catch (error) {

        result.innerHTML =
            `<p class="message">Something went wrong.</p>`;

        console.log(error);

    }

}