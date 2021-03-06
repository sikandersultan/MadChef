import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
  Modal,
} from "react-bootstrap";

import "./RecipeBuilder.scss";

import checkList from "../../utils/checkList.json";

function App() {
  // State with list of all checked item
  const [checked, setChecked] = useState([]);
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [show, setShow] = useState(false);
  const [searchById, setSearchById] = useState([]);
  const handleClose = () => setShow(false);
  // const checkList = [
  //   "Milk",
  //   "Peppers",
  //   "Beans",
  //   "Tinned Tomatoes",
  //   "Cheese",
  //   "Cream",
  //   "Chicken",
  //   "Beef",
  //   "Eggs",
  //   "Quorn",
  //   "Bread",
  //   "Bacon",
  //   "Butter",
  //   "Ham",
  //   "Tofu",
  //   "Halloumi",
  //   "Steak",
  //   "Pasta",
  // ];
  // Add/Remove checked item from list
  const handleCheck = async (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/findByIngredients?apiKey=b622f7d1fa414549a865f90abc479acf&ingredients=${updatedList}&number=9`
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const meals = await response.json();

        const recipeData = meals.map((data) => ({
          recipeId: data.id,
          title: data.title,
          description: "",
          image: data.image || "",
        }));
        setSearchedRecipes(recipeData);
      } catch (err) {
        console.error(err);
      }
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  const showDetails = async (event) => {
    setShow(true);
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${event.currentTarget.id}/information?apiKey=b622f7d1fa414549a865f90abc479acf&includeNutrition=false`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const meal = await response.json();

      const recipeIdData = {
        description: meal.summary,
        image: meal.image || "",
      };
      console.log(JSON.stringify(recipeIdData));
      setSearchById(recipeIdData);
    } catch (err) {
      console.error(err);
    }
  };

  // Generate string of checked items
  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + "+" + item;
      })
    : "";
  // Return classes based on whether item is checked
  var isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";
  return (




    
    <div className="app">
      <div className="imgReset">
        <img
          className="recipeSplashScreen"
          // src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          src="images/custom-splash.png"
        />
        <div className="centered">
          <div className="slogan">
            <span className="sloganText1">
              COMBINE YOUR INGREDIENTS BELOW TO GENERATE A MAD RECIPE
            </span>
          </div>
        </div>
      </div>
      {/* HERE */}
      <div className="title">Ingredients to build with:</div>
        <div className="list-container">
          {checkList.map((item, index) => (
            <div className="check-list" key={index}>
              <input value={item.item} type="checkbox" onChange={handleCheck} />
              <span className={isChecked(item.item)}>
                <img
                  className="ingredients"
                  src={process.env.PUBLIC_URL + item.image}
                ></img>
              </span>
            </div>
          ))}
        </div>
      <div className="checkList">
        <div>
        <h2 className="results">
              {searchedRecipes.length
                ? `Viewing ${searchedRecipes.length} results:`
                : "Click your ingredients to generate a recipe!"}
            </h2>
          <Container>
            {/* <h2 className="results">
              {searchedRecipes.length
                ? `Viewing ${searchedRecipes.length} results:`
                : "Search for a recipe to begin"}
            </h2> */}
            <CardColumns>
              {searchedRecipes.map((data) => {
                return (
                  <Card className="recipe-card" key={data.recipeId} style={{ width: "18rem" }}>
                    <Card.Img variant="top" src={data.image} />
                    <Card.Body>
                      <Card.Title className="font-family: 'Anton';">
                        {data.title}
                      </Card.Title>
                      <Button
                      className="see-more-btn"
                        variant="dark"
                        id={data.recipeId}
                        onClick={showDetails}
                      >
                        See More
                      </Button>
                      <Modal show={show} onHide={handleClose}>
                        <Modal.Body>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: searchById.description,
                            }}
                          ></span>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </Card.Body>
                  </Card>
                );
              })}
            </CardColumns>
          </Container>
        </div>
        {/* <div className="title">Your CheckList:</div>
        <div className="list-container">
          {checkList.map((item, index) => (
            <div className="check-list" key={index}>
              <input value={item.item} type="checkbox" onChange={handleCheck} />
              <span className={isChecked(item.item)}>
                <img
                  className="ingredients"
                  src={process.env.PUBLIC_URL + item.image}
                ></img>
              </span>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}
export default App;
