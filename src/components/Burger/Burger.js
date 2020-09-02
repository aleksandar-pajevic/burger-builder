import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  console.log('aaaaa',props.ingredients);
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingKey) => {
      return [...Array(props.ingredients[ingKey])].map((_, i) => {
        return (
          <BurgerIngredient
            key={ingKey + i}
            className={styles.ingKey}
            type={ingKey}
          />
        );
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

    if(transformedIngredients.length === 0){
    transformedIngredients = <p>Please start adding ingredients!</p>
    }
  // console.log('transformedIngredients : ', transformedIngredients);

  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
