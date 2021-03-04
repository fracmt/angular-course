import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  apiUrl = '';

  constructor(private http: HttpClient, private recipeService: RecipeService) {
    this.apiUrl = environment.apiUrl;
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(this.apiUrl + 'recipes.json', recipes)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
