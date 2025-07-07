function getRecipe() {
  const box = document.getElementById("recipeBox");
  box.innerHTML = "Loading...";

  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];

      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
          ingredients.push(`${ingredient} - ${measure}`);
        }
      }

      box.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="Recipe Image" />
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <p><strong>Area:</strong> ${meal.strArea}</p>
        <h3>📝 Ingredients:</h3>
        <ul>${ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
        <h3>📖 Instructions:</h3>
        <p>${meal.strInstructions}</p>
        <p><a href="${meal.strYoutube}" target="_blank">🎥 Watch on YouTube</a></p>
      `;
    })
    .catch(() => {
      box.innerHTML = `<p style="color:red;">❌ Failed to fetch recipe. Please try again.</p>`;
    });
}
