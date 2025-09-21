 
import classes from "./meals-grid.module.css";
import MealItem from "./meals-item";

export default function MealsGrid({ meals }) {
  if (!Array.isArray(meals) || meals.length === 0) {
    return <p className={classes.empty}>No meals found.</p>;
  }

  return (
    <div className={classes.meals}>
      <ul className={classes.grid}>
      {meals.map((meal) => (
        <li key={meal.slug}>
          {/* spread fields to MealItem */}
          <MealItem
            slug={meal.slug}
            title={meal.title}
            image={meal.image}
            summary={meal.summary}
            creator={meal.creator}
          />
        </li>
      ))}
    </ul>
    </div>
  );
}
