import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Recipe from "./Recipe";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";

const App = () => {
  const App_id = "df0b5373";
  const App_Key = "e83a8cec09b47857176cb16807bd2fb5";
  const [recipe, setRecipe] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  const [notfound,setNotfound11] = useState(true)

  useEffect(() => {
    getRecipe();
  }, [query]);

  console.log(recipe)
  const getRecipe = async () => {
    const response = await axios.get(
      `https://api.edamam.com/search?q=${query}&app_id=${App_id}&app_key=${App_Key}`
    );
    setRecipe(response?.data?.hits);
    setNotfound11(false)
    console.log(response);
    if(recipe.length < 1){
      setNotfound11(true);
    }
    console.log(response?.data?.hits[0].recipe.label);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  const updateQuery = (e) => {
    e.preventDefault();
    setQuery(search);
  };

  return (
    <div>
      <Paper
        onSubmit={updateQuery}
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "30%",
            margin: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <InputBase
            type="text"
            value={search}
            onChange={updateSearch}
            sx={{ ml: 1, flex: 1 }}
            style={{ margin: "auto", width: "50%" }}
            placeholder="Search You Recipes"
            inputProps={{ "aria-label": "search Recipes" }}
          />

          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </div>
      </Paper>

      {/* <form onSubmit={updateQuery}>
        <input type="text" value={search} onChange={updateSearch}></input>
        <button type="submit">Search</button>
      </form> */}

      <div style={{margin:"2rem 2rem"}}>
        <Grid container>
          {recipe.map((recipee) => (
            <Grid style={{marginBottom: "2rem"}} item xs={3}>
              <Recipe
                title={recipee.recipe.label}
                key={recipee.recipe.uri}
                calories={recipee.recipe.calories}
                image={recipee.recipe.image}
                ingredients={recipee.recipe.ingredients}
              />
            </Grid>
          ))}
          {
            notfound && "No recipes found"
          } 
        </Grid>
      </div>
    </div>
  );
};

export default App;
