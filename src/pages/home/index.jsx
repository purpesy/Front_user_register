import { useEffect, useState, useRef } from "react";
import "./style.css";
import Trash from "../../assets/lixo-icon.png";
import api from "../../services/api";

// useEffect e useState e useRef , são hooks do react(ferramentas) que auxiliam no desenvolvimento

function Home() {
  const [users, setUsers] = useState([]); // adiciono users, e o que vai entrar atraves do usestate que começa vazio

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    const usersFromApi = await api.get("/usuarios");

    setUsers(usersFromApi.data);
  }

  async function postUsers() {
    await api.post("/usuarios", {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    });
    getUsers();
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`)
    getUsers();

  }
  
  useEffect(() => {
    getUsers();
  }, []);

  return (
    // tudo que tiver fora do return é codigo do js, e dentro é codigo do html, exceto se eu colocar dentro do {}, podendo ser javascript
    <div className="container">
      <form action="">
        <h1>Cadastrar-se</h1>
        <input placeholder="Nome" name="nome" type="text" ref={inputName} />
        <input placeholder="Idade" name="idade" type="number"  ref={inputAge}/>
        <input placeholder="E-mail" name="email" type="email"  ref={inputEmail}/>
        <button type="button" onClick={postUsers}>Cadastrar</button>
      </form>
      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>
              Nome: <span>{user.name}</span>
            </p>
            <p>
              Idade: <span>{user.age}</span>
            </p>
            <p>
              Email: <span>{user.email}</span>
            </p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} className="trash-img" />
          </button>
        </div>
      ))}{" "}
      {/* Nesta linha, esta pegando todos os arrays(usuarios) do users. e mapeando, ou seja, pegando todos, e transformando em user(um usuario por vez) 
      Quando adiciono uma função com (), dentro dela coloco o html, e dentro do html, eu coloco {} que o que tiver dentro da chave, vai ser o que sera mostrado de acordo com a função users 
      sempre que usar MAP = necessito adicionar uma key para conseguir usar.
      */}
    </div>
  );
}

export default Home;
