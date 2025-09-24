import Image from 'next/image';
import classes from './page.module.css'
import { getMeal } from '@/lib/meals';
import { notFound } from 'next/navigation';
export default async function MealDetailPage({params}) {
    const { mealSlug } = await params;   
    const meal = await getMeal(mealSlug);
    console.log(meal)
    if(!meal) {
        notFound()
    }
    return(
        <>
            <div className={classes}>
                <header className={classes.header}>
                    <div className={classes.image}>
                        <Image fill src={meal.image} alt="image" />
                    </div>
                    <div className={classes.headerText}>
                        <h1>{meal.title}</h1>
                    <p className={classes.creator}>
                        by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                    </p>
                    <p className={classes.summary}>{meal.summary}</p>
                    </div>
                </header>
                <main className={classes.instructions}>
                    <p className={classes.instuctions} dangerouslySetInnerHTML={{
                        __html: meal.instructions.replace(/\n/g, '<br />')
                    }}>
                    </p>
                </main>
            </div>
        </>
    );
}