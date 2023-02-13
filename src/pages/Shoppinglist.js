import { useEffect, useState } from 'react'
import React from 'react';

export default function Home() {
  const [liste, setListe] = useState([]);
  const [element, setElement] = useState("");
  const [quantity , setQuantity] = useState(0);
  const [index, setIndex] = useState(-1); 
  const [id, setId] = useState("");
  const deleteItem = index => {
    const updatedListe = [...liste];
    updatedListe.splice(index, 1);
    setListe(updatedListe);
    localStorage.setItem("liste", JSON.stringify(updatedListe));
  };
  
  useEffect(() => {
    const data = localStorage.getItem("liste");
    if (data) {
      setListe(JSON.parse(data));
    }
  }, []);

  function modif(i) {
    setIndex(i);
    setQuantity(liste[i].qte);
    setElement(liste[i].produit);
  }
  function modifyQuantity(index, newQuantity) {
    const updatedListe = [...liste];
    updatedListe[index].qte = newQuantity;
    setListe(updatedListe);
    localStorage.setItem("liste", JSON.stringify(updatedListe));
  }
  
  async function ScrapAPI(){
    setListe([]);
    try{
    const handleClick = await
    fetch("https://esilv.olfsoftware.fr/td5/register")
      .then((result) => result.json())
      .then((get) => {
      setId(get.id);
      setListe(get.courses);
      localStorage.setItem("liste", JSON.stringify(liste));
      });
    
  } 
  catch (err) {
    console.log(err);
  }
};

  function addToList(product, qty) {
    setListe([...liste, { produit: product, qte: qty }]);
    localStorage.setItem("liste", JSON.stringify(liste));
  }
  async function Saveserveur(){
    const data = localStorage.getItem("liste");
    try{
      const handleClick = await
      fetch("https://esilv.olfsoftware.fr/td5/courses", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id : id , chg: liste}),
  
      })
        .then((result) => result.json())
        .then((get) => {
          console.log(get);
        });
      
    }
    catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <div>
        <br></br> 
        <h1>Votre liste de course !</h1>
        <div>
        {index === -1 && (
        <div>
          <input type="text" value={element} onChange={e => setElement(e.target.value)} placeholder="Nom du produit"/>
          <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="Quantité"/>
          <button onClick={() => addToList(element, quantity)}>Ajouter produit à la liste</button>
        </div>
        )}
        {index !== -1 && (
        <div>
          <input type="text" value={element} placeholder="Nom du produit"/>
          <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="Nouvelle quantité"/>
          <button onClick={() => modifyQuantity(index, quantity) && setIndex(-1)}>Modifier la quantité</button>
          <br></br>
          <button onClick={() => setIndex(-1)}>Ajouter d'autres produits à la liste</button>
        </div>
      )}
      <br></br>
        <button onClick={() => Saveserveur()}>Sauvegarder la liste</button>
      <br></br>
      </div>
        <br></br>
        <button onClick={() => ScrapAPI()}>Affichage de la liste de course actuelle</button>
        <br></br>
        <div>
        {liste.map((item, index) => (
        <div>
          <button onClick={() => modif(index)}>
            {item.produit} : {item.qte}
          </button>
          <button onClick={() => deleteItem(index)}>X</button>
        </div>
      ))}
        </div>
        </div>
    </div>
  )
}
