import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {

  //alussa olevat henkilöt
  const [ persons, setPersons] = useState([]) 

  //placeholder ilmoitus
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  //placeholder, joka muutetaan ja lisätään persons-puhelinluetteloon
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  //hakee henkilöt palvelimelta
  useEffect(() => {
    personService
      .getAll()
      .then(initialPeople => { 
        setPersons(initialPeople)
      })
  }, [])

  //muuttaa placeholderia
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  //luo uuden henkilön ja lisää sen luetteloon
  const addPerson = (event) => {
      event.preventDefault()
      //estää lisäämästä nimeä kahdesti
      if(persons.find(person => person.name === newName)) {
        setErrorMessage(`${newName} is already added to phonebook`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
      else {
        const personObject = {
          name: newName,
          number: newNumber
        }

        //Lähettää muistiinpanon palvelimelle
        personService
        .create(personObject)
        .then(returnedPerson => {
          //Renderöi uudet muistiinpanot ruudulle
          setPersons(persons.concat(returnedPerson))
          //tyjentää placeholderin
          setNewName('')
          setNewNumber('')

          setMessage(`${newName} was added to phonebook`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        
      }
      
  }

  //poistaa henkilön id:n perusteella
  const removePerson = (id, name) => {
    if(window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)    
        //uudelleenrenderöinti ilman poistettua henkilöä
        .then(returnedPerson => {
          setPersons(persons.filter(p => p.id !== id))
          
          setMessage(`${name} was removed from phonebook`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <Notification message={message} />
      <ErrorNotification errorMessage={errorMessage} />
      

      <h1>Phonebook</h1>
      <PhonebookForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>

      <h1>Numbers</h1>
        <ul>
          <People persons={persons} removePerson={removePerson}/>
        </ul>
    </div>
  )

}

//lisää uuden henkilön
const PhonebookForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
    <div>
      Name: <input 
        value={newName} //lähetettävä arvo on newName
        onChange={handleNameChange} //oikea newName laitetaan placeholderin tilalle
      />
    </div>
    <div>
      Number: <input 
        value={newNumber} 
        onChange={handleNumberChange}
      />
    </div>
    <button type="submit">Save</button>
  </form> 
  )
}

//tulostaa kaikki henkilöt

const People = ({persons, removePerson}) => {
  const rows = () => persons.map(person =>
    <OnePerson 
      key={person.id} 
      name={person.name} 
      number={person.number} 
      remove={() => removePerson(person.id, person.name)} /> 
  )

  return (
    <div>
      {rows()}
    </div>
  )
}

//tulostaa yhden henkilön tiedot
const OnePerson = ({name, number, remove}) => {
  return (
    <>
      <p>{name} {number} <button onClick={remove}>Delete</button> </p>
    </>
  )
}

//alertin korvaava ilmoitus
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notification">
      {message}
    </div>
  )
}

const ErrorNotification = ({ errorMessage }) => {
  if (errorMessage === null) {
    return null
  }

  return (
    <div className="errorNotification">
      {errorMessage}
    </div>
  )
}

export default App
