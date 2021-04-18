import React, {useState, useEffect} from 'react';
import carouselData from "../data.js";


const getClassName = (currIndex, activeIndex) => {
	if(currIndex == activeIndex){
		return "product inView selected";
	}
	else if((currIndex == activeIndex-1) || (currIndex == activeIndex+1)){
		return "product inView";
	}
	return "product outOfView";
}


const getTransitionWidth = () => {
	let productElem = document.querySelector(".product.outOfView");
	if(!productElem){
		return 0;
	}
	let style = window.getComputedStyle(productElem);
	let {marginRight, width} = style;
	return (parseInt(marginRight.split("px")[0]) + parseInt(width.split("px")[0]));
}


const getCategorisedProducts = (selectedCategory, data) => {
	return (selectedCategory == "All") ? data : data.filter(obj => obj.category==selectedCategory);
}

const getAllCategories = (data) => {
	let categoriesArr = ["All"];
	data.forEach(obj => {
		if(!categoriesArr.includes(obj.category)){
			categoriesArr.push(obj.category);
		}
	});
	return categoriesArr;
}


const CarouselComponent = () => {
	let [activeIndex, setActiveIndex] = useState(1);
	let [displacedPos, setDisplacedPos] = useState(0);
	let [selectedCategory, setSelectedCategory] = useState("All");

	let carouselContStyle = {
		transform : `translateX(${displacedPos}px)`
	}
	let categorisedData = getCategorisedProducts(selectedCategory, carouselData);

	useEffect(()=>{	
		let transitionWidth = getTransitionWidth();	
		setDisplacedPos(-1*transitionWidth*(activeIndex-1));
	},[activeIndex]);

	const slideContent = (direction,event) => {
		if((direction == "left") && (activeIndex > 0)){
			setActiveIndex((prevIndex)=>prevIndex-1);
		}
		else if((direction == "right") && (activeIndex < (categorisedData.length-1))){
			setActiveIndex((prevIndex)=>prevIndex+1);
		}
	}

	const onCategoryClick = (category,event) => {
		setSelectedCategory(category);
		setActiveIndex(1);
	}

	return (
		<div className="project">
			<h1>Product List</h1>
			<div className="viewContainer">
				<div className={`arrow left ${activeIndex==0 && "disabled"}`} onClick={slideContent.bind(null,"left")}>{"<"}</div>				
				<ul className="carouselContainer" style={carouselContStyle}>
					{
						categorisedData.map((obj,index)=>{
							let bgStyle = {
								backgroundImage: `url(${obj.imageUrl})`
							}
							return (
								<li className={getClassName(index,activeIndex)}>
									<div className="name">{obj.name}</div>
									<div className="price">Price : ${obj.price}</div>
									<div className="category">{obj.category}</div>
									<div className="bgImage" style={bgStyle}></div>
								</li>
							)
						})
					}
				</ul>
				<div className={`arrow right ${activeIndex==(categorisedData.length-1) && "disabled"}`} onClick={slideContent.bind(null,"right")}>{">"}</div>	
			</div>	
			<div className="categoriesContainer">
				
				<ul>
					<li className="label">Categories : </li>
					{
						getAllCategories(carouselData).map(category => {
							return <li className={`categoryTag ${category==selectedCategory && "selected"}`} onClick={onCategoryClick.bind(null,category)}>{category}</li>
						})
					}
				</ul>
			</div>
		</div>
	)	
}


export default CarouselComponent;