import React, { Component } from 'react';
import web3 from '../web3';
import ipfs from '../ipfs';
import main from '../main';
import userAccount from '../userAccount';
import projectabi from '../project';


import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/file.css";
import { Button, Row, Col, Input } from "reactstrap";
import { Navbar, Card, Nav, Form, Table } from "react-bootstrap";

const quickEncrypt=require('quick-encrypt');

export default class create_project extends Component {
  constructor(props) {
  super(props);
  this.state={
    userAdd:'',
    deployedAddress:'',
    projectname:'',
    projectadd:'',
    membercount:0,
    members:[{addrs: ""}],
    showfields:[],
    projects:[],
    publickey :'',
    privatekey : '',

  }
  // this.handleChange = this.handleChange.bind(this);

}



  async componentDidMount(){
    const accounts=await web3.eth.getAccounts();
    const deployedAddress=await main.methods.userdetails(accounts[0]).call();
    if(deployedAddress==0)
      window.location.href="/";

}

  createProject=async (event) => {
   event.preventDefault();
   const accounts=await web3.eth.getAccounts();
   console.log(accounts[0]);
   const deployedAddress=await main.methods.userdetails(accounts[0]).call();
   this.setState({deployedAddress: deployedAddress, userAdd:accounts[0]});
   const userobj = await new web3.eth.Contract(userAccount, deployedAddress);
   console.log(userobj);
   let keys=quickEncrypt.generate(2048);
   this.setState({publickey:keys.public});
   this.setState({privatekey:keys.private});
   await userobj.methods.createproject(this.state.projectname,"0xDe808729673C7543f2Fc43d1663F26C64900067e",this.state.publickey,this.state.privatekey).send(
   {
          from:accounts[0],
          projectname:this.state.projectname,
          mainaddr:"0xDe808729673C7543f2Fc43d1663F26C64900067e",
          pubkey:this.state.publickey,
          privkey:this.state.privatekey
   });
   const projects =await userobj.methods.getuserprojects().call({from:accounts[0]});
   console.log(projects);
   this.setState({projects: projects});
   const deployedproject = this.state.projects['0'][this.state.projects['0'].length-1];
   console.log(this.state.members);
   for(let i=0;i<this.state.members.length;++i)
   {
     const memAddress=await main.methods.userdetails(this.state.members[i]['addrs']).call();
     console.log(memAddress);
     console.log(typeof(memAddress));
     const memobj = await new web3.eth.Contract(userAccount, memAddress);
     await memobj.methods.addrequest(deployedproject,this.state.projectname).send({
       from:accounts[0],
       addr:deployedproject,
       nam:this.state.projectname
     });
   }
   console.log("good");

   alert("Group created successfully!");
   window.location.href="/project";
 }



// handleChange(event){
//   event.preventDefault();
//   var joined=this.state.members;
//   joined[event.target.id]=event.target.value;
//   this.setState({ members:joined});
//   console.log(this.state.members[event.target.id]);
//
// };

// addMember = async(event)=>{
//   event.preventDefault();
//   var addone=this.state.membercount + 1;
//   this.setState({membercount:addone});
//
//   var joined=this.state.showfields.concat(<input value={this.state.members[`${addone}`]} id="`${addone}`" onChange={this.handleChange}></input>);
//   this.setState({showfields:joined});
//   console.log(this.state.showfields);
//
// }
//
//  showfields=()=>{
//    let inputfields = [];
//    for(let i=0;i<this.state.membercount;++i)
//    {
//        inputfields.push(<br><input value={this.state.members[i]} onChange={event=>this.setState({ members[i] : event.target.value})}></input>);
//    }
//    return inputfields;
//  };
handleMemberAddrsChange = idx => evt => {
    const newMembers = this.state.members.map((member, sidx) => {
      if (idx !== sidx) return member;
      return { ...member, addrs: evt.target.value };
    });

    this.setState({ members: newMembers });
  };
  //
  // handleSubmit = evt => {
  //   const { addrs, members } = this.state;
  //   alert(`Incorporated: ${name} with ${shareholders.length} shareholders`);
  // };

  handleAddMember = () => {
    this.setState({
      members: this.state.members.concat([{ addrs: "" }])
    });
  };

  handleRemoveMember = idx => () => {
    this.setState({
      members: this.state.members.filter((s, sidx) => idx !== sidx)
    });
  };

render(){
    return (
      <div className="App">
          <div className="navbar-section">
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/dashboard">ENIGMA</Navbar.Brand>
            <Nav className="ml-auto">
              <Nav.Link href="/dashboard">Home</Nav.Link>
              <Nav.Link href="/project">Groups</Nav.Link>
              <Nav.Link href="/files">Files</Nav.Link>
              <Nav.Link href="/home">Global Space</Nav.Link>
            </Nav>
          </Navbar>
          </div>
          <div style={{ margin: "5% auto", maxWidth: "500px" }}>
  <Card>
    <Card.Header>
      <h4 style={{ fontFamily: "Arial", textAlign: "center", marginBottom: "0" }}>
        Create New Group
      </h4>
    </Card.Header>
    <Card.Body style={{ padding: "2% 8%" }}>
      <Form onSubmit={this.createProject}>
        <Form.Group controlId="name" className="my-5">
          <Form.Label style={{ fontSize: "1.1rem" }}>Enter Group Name</Form.Label>
          <Form.Control
            value={this.state.projectname}
            placeholder="Enter Group Name.."
            onChange={event => this.setState({ projectname: event.target.value })}
          />
        </Form.Group>
    <div style={{ marginBottom: "20px" }}>
      <Button
        type="button"
        onClick={this.handleAddMember}
        className="btn-round my-4"
        color="primary"
        style={{ width: "100%" }}
      >
        Add a Member
      </Button>
    </div>

    <div>
      {this.state.members.map((member, idx) => (
        <div key={idx} className="member my-4">
          <Row>
            <Col lg="10">
              <Input
                type="text"
                placeholder={`Member #${idx + 1} addrs`}
                value={member.addrs}
                onChange={this.handleMemberAddrsChange(idx)}
                style={{ height: "35px" }}
              />
            </Col>
            <Col lg="2">
              <Button
                type="button"
                onClick={this.handleRemoveMember(idx)}
                className="btn-round mx-4"
                color="primary"
                style={{ padding: "0", width: "30px", height: "35px", lineHeight: "1.5" }}
              >
                <span className="font-weight-bold">-</span>
              </Button>
            </Col>
          </Row>
        </div>
      ))}
    </div>

    <div style={{ marginTop: "20px" }}>
      <Button className="btn-round my-4" color="primary" style={{ width: "100%" }}>
        Submit
      </Button>
    </div>
  </Form>
</Card.Body>
  </Card>
</div> 
        </div>
      );
    }
  }
