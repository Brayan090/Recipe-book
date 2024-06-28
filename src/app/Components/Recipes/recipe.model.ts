import { Ingredient } from "src/app/shared/ingredient.model";

export class Recipe{
    //Properties
    public name:string;
    public description:string;
    public imagePath:string;
    public ingredients:Ingredient[];


    constructor(name:string, desc:string, imgPath:string,Ingredients:Ingredient[]){
        this.name = name;
        this.description = desc;
        this.imagePath = imgPath;
        this.ingredients = Ingredients;
    }

}