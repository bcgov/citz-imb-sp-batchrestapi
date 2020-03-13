import React, { useState } from "react"
import GetList from "./GetList"
import GetItems from "./GetItems"
import ShowAllItemDetails from "./ShowAllItemDetails"
import AddItem from "./AddItem"

export default function RestAPI() {
	const [itemTitle, setItemTitle] = useState("testing0")

	const list = "calculations"
	const itemNumber = 0

	const handleAddItem = () => {
		setItemTitle("testing" + itemNumber)
		itemNumber++
	}

	return (
		<div>
			<GetList listName={list} />
			<GetItems listName={list} />
			<AddItem listName={list} itemTitle={itemTitle} itemCreatedCallback={handleAddItem} />
			<ShowAllItemDetails listName={list} />
		</div>
	)
}
