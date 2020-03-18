import React, { useState } from "react"
import GetList from "./GetList"
import GetItems from "./GetItems"
import ShowAllItemDetails from "./ShowAllItemDetails"
import AddItem from "./AddItem"
import Add2Items from "./Add2Items"
import Add3Items from "./Add3Items"

export default function RestAPI() {
console.log('RestAPI')

	const list = "calculations"
	let itemNumber = Math.floor(Math.random() * 1000)
	const [itemTitle, setItemTitle] = useState("testing" + itemNumber)

	const handleAddItem = increment => {
		itemNumber += increment
		setItemTitle("testing" + itemNumber)
		console.log('itemNumber', itemNumber)
	}

		return (
		<div>
			<GetList listName={list} />
			<GetItems listName={list} refresh={itemNumber}/>
			<AddItem listName={list} itemTitle={itemTitle} itemCreatedCallback={handleAddItem} />
			<Add2Items listName={list} itemTitle={itemTitle} itemCreatedCallback={handleAddItem} />
			<Add3Items listName={list} itemTitle={itemTitle} itemCreatedCallback={handleAddItem} />
			<ShowAllItemDetails listName={list} />
		</div>
	)
}
