import React from 'react';
import UserInfo from './sectionComponents/userInfo.jsx';


class Section extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [{index: 0, firstName: "Kamil", lastName: "Sobczyk", city: "Zabrze", country: "Polska", sex: "Mężczyzna"},
                {index: 1, firstName: "Adam", lastName: "Adamowicz", city: "Sydney", country: "Australia", sex: "Mężczyzna"},
                {index: 2, firstName: "Anna", lastName: "Malinowska", city: "Gdańsk", country: "Polska", sex: "Kobieta"}],
            newUser: {index: "", firstName: "", lastName: "", city: "", country: "", sex: ""},
            showUser: false,
            showAddUser: false,
            showEditUser: false,
            chosenUser: 0
        };
    }

    setName = (event) => {
        let user = this.state.newUser;
        user.firstName = event.target.value;
        this.setState({newUser: user})
    };

    addForm = (<div>
        <form>
            <div className="form-group">
                <label>Imię</label>
                <input className="form-control form-control-lg" type="text" placeholder="Wpisz imię"  onChange={() => this.setName}></input>
            </div>
            <div className="form-group">
                <label>Nazwisko</label>
                <input className="form-control form-control-lg" type="text" placeholder="Wpisz nazwisko" ></input>

            </div>
            <div className="form-group">
                <label>Wybierz płeć</label>
                <select className="form-control" >
                    <option>Mężczyzna</option>
                    <option>Kobieta</option>
                </select>
            </div>
            <div className="form-group">
                <label>Miasto</label>
                <input className="form-control form-control-lg" type="text" placeholder="Wpisz miasto" ></input>
            </div>
            <div className="form-group">
                <label>Kraj</label>
                <input className="form-control form-control-lg" type="text" placeholder="Wpisz państwo" ></input>
            </div>
            <button type="submit" className="btn btn-primary" onSubmit={this.handleSubmit}>Dodaj</button>
        </form>
    </div>);

    showEditForm = (index) => {

        let nameValue = "";

        this.editForm = (<div>
            <form>
                <div className="form-group" onSubmit={this.handleSubmit}>
                    <label>Imię</label>
                    <input className="form-control form-control-lg" type="text" placeholder={this.state.users[index].firstName}  value={nameValue}></input>
                </div>
                <div className="form-group">
                    <label>Nazwisko</label>
                    <input className="form-control form-control-lg" type="text" placeholder={this.state.users[index].lastName} ></input>

                </div>
                <div className="form-group">
                    <label>Wybierz płeć</label>
                    <select className="form-control" >
                        <option>Mężczyzna</option>
                        <option>Kobieta</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Miasto</label>
                    <input className="form-control form-control-lg" type="text" placeholder={this.state.users[index].city} ></input>
                </div>
                <div className="form-group">
                    <label>Kraj</label>
                    <input className="form-control form-control-lg" type="text" placeholder={this.state.users[index].country} ></input>
                </div>
                <button type="submit" className="btn btn-primary" onSubmit={this.editUser(index, nameValue)}>Edytuj</button>
            </form>
        </div>);

        this.setState({showEditUser: this.state.showEditUser === true ? false : true, showAddUser: false, showUser: false})
    };

    editUser = (index, name) => {
        let users = this.state.users;
        users[index].firstName = name;
        this.setState({users: users})
    };

    handleSubmit = () => {
        event.preventDefault();
    };

    deleteUser = i => {
        let users = this.state.users;
        users.splice(i, 1);
        this.setState({users: users});
    };

    showAddForm = () => {

        this.setState({showAddUser: this.state.showAddUser === true ? false : true, showUser: false, showEditUser: false})

    };

    addUser = (firstName, lastName, city, country, sex) => {
        let users = this.state.users;
        users.push({firstName: firstName, lastName: lastName, city: city, country: country, sex: sex});
    };

    editUser = (firstName, lastName, city, country, sex, i) => {
        let users = this.state.users;

    };

    showUserInfo = (i) => {
        this.setState({showUser: this.state.showUser === true ? false : true, addUser: null, showEditUser: null, chosenUser: i})
    };


    render() {
        let showedForm = null;
        let showInfo = null;

        if (this.state.showUser !== false){
            showInfo = this.info;
        }

        if (this.state.showAddUser !== false){
            showedForm = this.addForm;
        }
        if (this.state.showEditUser !== false){
            showedForm = this.editForm;
        }

        const { users } = this.state;

        return (
            <div className="container">
                <div className="list-group">
                    <div className="list-group-item list-group-item-action active">
                        Lista użytkowników
                    </div>
                    {users.map((u, i) => (
                            <div className="list-group-item list-group-item-action" key={i}>{u.firstName + " " + u.lastName}
                                <button type="button" className="info" onClick={() => this.showUserInfo(i)}>info</button>
                                <button type="button" className="edit" onClick={() => this.showEditForm(i)}>edycja</button>
                                <button type="button" className="delete" onClick={() => this.deleteUser(i)}>-</button>
                            </div>
                        ))}
                    <div className="list-group-item list-group-item-action">Dodaj nowego użytkownika<button className="add" onClick={() => this.showAddForm()}>+</button></div>
                </div>
                <UserInfo show={this.state.showUser} users={this.state.users} chosenUser={this.state.chosenUser} country={this.state.users[this.state.chosenUser].country} city={this.state.users[this.state.chosenUser].city}/>
                {showedForm}
            </div>
        );
    }
}

export default Section;
