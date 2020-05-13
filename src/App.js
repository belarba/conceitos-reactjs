import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        api.get('/repositories').then(response => {
            setRepositories(response.data);
        })
    }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Novo Repositorio ${Date.now()}`,
      url: "github.com/repositorio",
      techs: ["NodeJS","ReactJS"]
    });

  const repositorie = response.data;

  setRepositories([...repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
    var array = [...repositories];
    var index = array.findIndex(repositorie => repositorie.id === id);
    if (index !== -1) {
      api.delete(`/repositories/${id}`);
      array.splice(index, 1);
      console.log(array);
      setRepositories(array);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repositorie => 
           <li key={repositorie.id}>
             {repositorie.title}
             <button onClick={() => handleRemoveRepository(repositorie.id)}>
               Remover
             </button>
           </li>
        )}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
