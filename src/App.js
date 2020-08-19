import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(
      response =>{
        setRepositories(response.data);
        console.log(response.data)
      })    
  }, [])
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Desafio ReactJS',
      url: 'https://github.com/nathaliaassis/reponame',
      techs: ['tech1', 'tech2', 'tech3'],
      likes: 0
    });

    const newRepo = response.data;

    setRepositories([...repositories, newRepo])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const removeRepo = repositories.filter(repo => repo.id !== id );
    
    const newRepoList = removeRepo.map(repo => repo);
    
    setRepositories(newRepoList);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => 
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
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
