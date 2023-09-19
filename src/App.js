import { Component } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';


class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchFilter: '',
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) =>
     this.setState(() => {
        return { monsters: users };
      })
    );
  }

  // For best practices, so the class is going to initialize the function just once
  onSearchChange = (event) => {
    const searchFilter = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchFilter };
    });
  }

  render() {
    const { monsters, searchFilter } = this.state;

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchFilter);
    });

    return (
      <div className="App">
        <h1 className='app-title'> Monsters Rolodex </h1>
        <SearchBox
          className='monsters-search-box' 
          placeholder='Search Monsters'
          onChangeHandler={this.onSearchChange} 
        />
        <CardList monsters={filteredMonsters}/>
      </div>
    );
  }
}

export default App;
