import MealsGrid from "@/components/meals/meals-grid";
import { getAllMeals } from "@/lib/meals";
import Link from "next/link";
import { Suspense } from "react";
import classes from "./page.module.css";

export default async function MealsPage() {
  const meals = await getAllMeals(); // expect an array of rows
  // console.log here prints in the server terminal, not the browser
  // console.log(meals);

  return (
    <>
      <header className={classes.header}>
        <div>
          <div className={classes.hero}>
            <h1>
              Delicious meals, created{" "}
              <span className={classes.highlight}>by you</span>
            </h1>
            <p>Choose your favourite recipe and cook it yourself. It’s easy and fun.</p>
          </div>
          <div className={classes.cta}>
            <Link href="/meals/share">Share Your Favourite Recipe</Link>
            <Link href="/meals">Explore Meals</Link>
          </div>
        </div>
      </header>

      <main>
        <Suspense fallback={<p className={classes.loading}>Loading...</p>}>
        <MealsGrid meals={Array.isArray(meals) ? meals : []} />
        </Suspense>
      </main>
    </>
  );
}
