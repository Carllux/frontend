import React, { Component } from "react";
import Main from '../template/Main.jsx'
import axios from 'axios'
import { baseUrl } from "../../main/Config.jsx";

const headerProps = {
    icon: 'money-bill-wheat',
    title: 'Produtos',
    subtitle: 'Página de cadastro de produtos'
}


const initialState = {
    user: { name: '', quantity: 0.00, sellValue: 0.00, costValue: 0.00, type: '' },
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
                                name="email"
                                value={this.state.user.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome do produto" />
                        </div>
                    </div>

                </div>
                <div className="row">
                    <div className="col-lg col-md-6">
                        <div className="form-group">
                            <label htmlFor=""><strong>Quantidade</strong></label>
                            <input type="text" className="form-control"
                                name="email"
                                value={this.state.user.quantity}
                                onChange={e => this.updateField(e)}
                                placeholder="0.00" />
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-lg col-md-6">
                        <div className="form-group">
                            <label htmlFor=""><strong>Valor venda</strong></label>
                            <input type="text" className="form-control"
                                name="email"
                                value={this.state.user.sellValue}
                                onChange={e => this.updateField(e)}
                                placeholder="0.00" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg col-md-6">
                        <div className="form-group">
                            <label htmlFor=""><strong>Valor de custo</strong></label>
                            <input type="text" className="form-control"
                                name="email"
                                value={this.state.user.costValue}
                                onChange={e => this.updateField(e)}
                                placeholder="0.00" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <span className="ml-center p-3"><strong>Tipo de produto</strong></span>
                    <div class="form-check form-check-inline p-3">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" value="dog" />
                        <label class="form-check-label" for="inlineRadio1">Produtos Cachorros</label>
                    </div>

                    <div class="form-check form-check-inline p-3">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" value="cat" />
                        <label class="form-check-label" for="inlineRadio2">Produtos Gatos</label>
                    </div>

                    <div class="form-check form-check-inline p-3">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" value="bird" />
                        <label class="form-check-label" for="inlineRadio3">Produtos Aves</label>
                    </div>
                    <div class="form-check form-check-inline p-3">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" value="fish" />
                        <label class="form-check-label" for="inlineRadio3">Produtos Peixes</label>
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
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Valor custo</th>
                        <th>Valor venda</th>
                        <th>Tipo de produto</th>
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
        console.log("to rodando")
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.quantity}</td>
                    <td>{user.sellValue}</td>
                    <td>{user.buyValue}</td>
                    <td>{user.type}</td>
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