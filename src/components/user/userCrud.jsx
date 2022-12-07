import React, { Component } from "react";
import Main from '../template/Main.jsx'
import axios from 'axios'
import { baseUrl } from "../../main/Config.jsx";
// import BasicTimePicker from "../template/timePicker.jsx";

const headerProps = {
    icon: 'users',
    title: ' Colaboradores',
    subtitle: 'Controle de colaboradores'
}


const initialState = {
    user: { name: '', arriveTime: '', leaveTime: '', comment: ''},
    list: []
}



export default class UserCrud extends Component {

    state = { ...initialState }

    clear() {
        this.setState({ user: initialState.user })
    }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ user: initialState.user })
            })

    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })

    }

    renderForm() {
        return (

            <div className="form">
                <div className="row">
                    <div className="col-lg col-md-12">
                        <div className="form-group">
                            <label htmlFor=""><strong>Nome</strong></label>
                            <input type="text" className="form-control"
                                name="name"
                                value={this.state.user.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome do colaborador" />
                        </div>
                    </div>

                </div>
                <div className="row">
                    <div className="col-6 col-md-6">
                        <div className="form-group">
                            <label htmlFor=""><strong>Horário de entrada</strong></label>
                            <input type="text" className="form-control"
                                name="arriveTime"
                                value={this.state.user.arriveTime}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o horário de chegada do colaborador" />
                        </div>
                    </div>



                    <div className="col-6 col-md-6">
                        <div className="form-group">
                            <label htmlFor=""><strong>Horário de saída</strong></label>
                            <input type="text" className="form-control"
                                name="leaveTime"
                                value={this.state.user.leaveTime}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o horário de saída do colaborador" />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg col-md-6">
                        <div className="form-group">
                            <label htmlFor=""><strong>Observações</strong></label>
                            <input type="text" className="form-control"
                                name="comment"
                                value={this.state.user.comment}
                                onChange={e => this.updateField(e)}
                            />
                        </div>
                    </div>
                </div>
                
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={e => this.save(e)}>Salvar</button>
                        <button className="btn btn-secondary ml-2" onClick={e => this.clear(e)}>Cancelar</button>
                    </div>
                </div>
            </div>
        )
    }

    getUpdatedList(user, add = true) {
        const list = this.state.list.filter(u => u.id !== user.id)
        if (add) list.unshift(user)
        return list
    }

    load(user) {
        this.setState({ user })
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getUpdatedList(user, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Horário chegada</th>
                        <th>Horário saída</th>
                        <th>Observações</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        // console.log("to rodando")
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.arriveTime}</td>
                    <td>{user.leaveTime}</td>
                    <td>{user.comment}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps} >
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }

}