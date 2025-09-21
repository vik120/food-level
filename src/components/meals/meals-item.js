import Image from "next/image";
import Link from "next/link";
import classes from "./meal-item.module.css";

export default function MealItem({ slug, title, image, summary, creator }) {
  // If you add 'use client' here and log, it will appear in the browser console.
  // console.log("Meal item:", slug);

  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          {/* Ensure parent has position: relative if you use fill */}
          <Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, 33vw" />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>

      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
