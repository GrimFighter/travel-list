import { useState, useEffect } from "react";



export function Header ()
{
	return (
		<h1>
			🏖️ Far Away From Home 🌄
		</h1>
	);
}

export function PackingList ( { initialItems, handleCheck, removeItem } )
{
	return (
		<div className="list">
			<ul >
				{ initialItems?.map( ( item ) => ( <Items key={ item.id } item={ item } handleCheck={ handleCheck } removeItem={ removeItem } /> ) ) }
			</ul>
		</div>
	);
}



export function Items ( { item, handleCheck, removeItem } )
{

	return (
		<>
			<li> <input type="checkbox" onClick={ () => handleCheck( item.id ) } />
				<span style={ item.packed ? { textDecoration: 'line-through' } : {} }>{ item.quantity } { item.description }</span>
				<button onClick={ () => removeItem( item.id ) }>❌</button>
			</li>
		</>
	);
}


export function Form ( { addItem, initialItems } )
{
	const [ formData, setFormData ] = useState( {

		description: '',
		quantity: 1,
		packed: false
	} );
	function handleSubmit ( e )
	{
		e.preventDefault();
		addItem( formData );
		setFormData( {
			...formData,
			description: '',
			quantity: 1
		} );
	}

	function handleChange ( e )
	{
		setFormData( {
			...formData,
			[ e.target.name ]: e.target.value
		} );

	}


	return (
		<form className="add-form" onSubmit={ handleSubmit }>
			<h3>What do you need for your trip? 😊</h3>
			<select name="quantity" value={ formData.quantity } onChange={ handleChange }>
				{ [ ...new Array( 20 ) ].map( ( _, index ) => (

					<option value={ index + 1 } key={ index + 1 }>{ index + 1 }</option>

				) ) }
			</select>
			<input name="description" type="text" placeholder="Items..." value={ formData.description } onChange={ handleChange } />
			<button>Add</button>

		</form>
	);
}

export function Stats ( { initialItems } )
{
	const totalItems = initialItems.length;
	const packedItems = initialItems.filter( ( item ) => item.packed ).length;

	//const tmp = initialItems.reduce( ( acc, item ) => { return item.packed ? acc + 1 : acc; }, 0 );

	return (
		<footer className="stats">
			<h3>
				You have { totalItems } items on your list, you have already packed { packedItems }.
			</h3>
		</footer>
	);
}

export default function App ()
{
	const [ initialItems, setInitialItems ] = useState( [] );
	const [ count, setCount ] = useState( 1 );

	function addItem ( newItem )
	{
		setInitialItems( ( prev ) => [ ...prev, { ...newItem, id: count } ] );
		setCount( prev => prev + 1 );
		console.log( initialItems );
	}

	function removeItem ( id )
	{
		setInitialItems( ( prev ) => prev?.filter( item => item.id !== id ) );

	}

	function handleCheck ( itemId )
	{
		setInitialItems( ( prevItems ) =>
		(
			prevItems?.map( ( prevItem ) =>
			(
				prevItem.id === itemId ? { ...prevItem, packed: !prevItem.packed } : prevItem

			) )
		) );
	}



	return (
		<div className="app">
			<Header />
			<Form addItem={ addItem } initialItems={ initialItems } />
			<PackingList initialItems={ initialItems } handleCheck={ handleCheck } removeItem={ removeItem } />
			<Stats initialItems={ initialItems } />
		</div>
	);
}
