import React, {Component, Fragment} from 'react'
import { Link } from 'react-router-dom'


class People extends Component {


    state = {
      people: [],
      name: '',
      address: '',
      password: ''
    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
  handleUpdate = async (_id) => {
    const update = JSON.stringify({ ...this.state })                                                                                                              
    await fetch('http://localhost:4000/' + _id, {
      method: 'PUT',
      body: update,
      headers: {
        "Content-Type": "application/json"
      }
    });
    await this.getPeople()
  };


    handleSubmit = async (_id) => {
      await fetch('http://localhost:4000/' + _id, {
      method: 'delete'
    });
    await this.getPeople()
  };


  getPeople = async () => {

    return fetch('http://localhost:4000')
      .then(results => {
        return results.json();
      })
      .then(data => {
        this.setState({people: data})
      })
  }
  filterSenators= (e) => {
    let senators = this.state.people
    senators = senators.filter(senator => {
      return senator.name.toLowerCase().search(
        e.target.value.toLowerCase()) !== -1;
    });
    this.setState({people: senators});
  }



  async componentWillMount() {

    await this.getPeople()
  }

  


  render() {
    console.log(this);
    console.log(this.state);
    console.log(this.state.people);
    return (
      <Fragment>
        <div>
          <Link to="/"><button type="button" className="btn btn-primary">Home</button></Link>
        <br/>
        <form>
        <fieldset className="form-group">
        <input type="text" className="form-control form-control-sm" placeholder="Search" onChange={ this.filterSenators}/>
        </fieldset>
        </form>
        <br/>
        <div>
            {this.state.people.map
            ((people,index) =>
              <div className="border" key={index}>
                <h3> Name: {people.name}</h3>
                <p> Phone: {people.phone}</p>
                <p> Address: {people.address}</p>

                <button type="button" className="btn btn-primary" onClick={() => this.handleSubmit(people._id)}>Delete</button>


                <button type="button" className="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-sm">Update
                </button>

                <div className="modal fade bd-example-modal-sm" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
                     aria-hidden="true">
                  <div className="modal-dialog modal-sm">
                    <div className="modal-content">

                      <form onSubmit={e =>this.handleUpdate(people._id)}>
                        <div className="form-group">
                          <label htmlFor="InputName">Name</label>
                          <input type="text" className="form-control" id="InputName" aria-describedby="NameHelp"
                                 placeholder="Name" onChange={e => this.setState({name: e.target.value})}/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="InputAddress">Address</label>
                          <input type="address" className="form-control" id="InputAddress" placeholder="Address"
                                 onChange={e => this.setState({ address: e.target.value })}/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="InputPhone">Password</label>
                          <input type="text" className="form-control" id="InputPhone" placeholder="Phone"
                                 onChange={e => this.setState({ phone: e.target.value })}/>
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                      </form>


                    </div>
                  </div>
                </div>

              </div>

            )}
          </div>
        </div>
      </Fragment>
    )
  }
}

export default People