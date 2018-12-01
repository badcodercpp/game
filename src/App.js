import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Logic} from './logic/gameLogic'
import {Image} from './public/image/images'
//import

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      gameBoard:[[]],
      t_l:1,
      curr:{
        r:0,
        c:0
      },
      r_move:true,
      c_move:true,
      total_move:0,
      eaten_food:0,
      game_open:true,
      game_started:false,
      __nr:0,
      __nc:0
    }
  }
  _start_eating=(evt)=>{
    let ret=this._lg.eatAllFood(this.state.gameBoard)
    this.setState({
      t_l:ret.length,
      gameBoard:ret.board,
      path:ret.path
    })

  }
  componentDidMount(){
    //let nr=10;
    //let nc=10;
    /*if (this.state.game_started) {
      let nr=this.state.__nr;
      let nc=this.state.__nc;
      alert(nr+","+nc)
      this._nr=nr;
      this._nc=nc;
      let lg=new Logic();
      this._lg=lg;
      let ret=lg.create_logic(nr,nc)
      lg.logger(ret)
      this.setState({
        gameBoard:ret.arr,
        pos:ret.pos
      })
    }*/
    document.addEventListener("keydown",(e=>{
      //console.log(e.keyCode)
      
      
      if (this.state.game_started) {
        switch(e.keyCode){
          case 37 :
            this.setState({
              total_move:this.state.total_move+1
            })
            if (this.state.curr.c===0) {
              this.setState({
                c_move:false,
                curr:{r:this.state.curr.r,c:this.state.curr.c+1}
              })
            } else if(this.state.curr.c>0 && this.state.curr.c<this._nc-1) {
              if(this.state.c_move){
                this.setState({
                  curr:{r:this.state.curr.r,c:this.state.curr.c-1}
                })
              }else{
                this.setState({
                  curr:{r:this.state.curr.r,c:this.state.curr.c+1}
                })
              }
            }else{
              this.setState({
                c_move:true,
                curr:{r:this.state.curr.r,c:this.state.curr.c-1}
              })
            }
            break;
          case 38 :
            this.setState({
              total_move:this.state.total_move+1
            })
            if (this.state.curr.r===0) {
              this.setState({
                r_move:false,
                curr:{r:this.state.curr.r+1,c:this.state.curr.c}
              })
            } else if(this.state.curr.r>0 && this.state.curr.r<this._nr-1) {
              if(this.state.r_move){
                this.setState({
                  curr:{r:this.state.curr.r-1,c:this.state.curr.c}
                })
              }else{
                this.setState({
                  curr:{r:this.state.curr.r+1,c:this.state.curr.c}
                })
              }
            }else{
              this.setState({
                r_move:true,
                curr:{r:this.state.curr.r-1,c:this.state.curr.c}
              })
            }
  
  
           break;
          case 39 :
            this.setState({
              total_move:this.state.total_move+1
            })
            if (this.state.curr.c===0) {
              this.setState({
                c_move:true,
                curr:{r:this.state.curr.r,c:this.state.curr.c+1}
              })
            } else if(this.state.curr.c>0 && this.state.curr.c<this._nc-1) {
              if(this.state.c_move){
                this.setState({
                  curr:{r:this.state.curr.r,c:this.state.curr.c+1}
                })
              }else{
                this.setState({
                  curr:{r:this.state.curr.r,c:this.state.curr.c-1}
                })
              }
            }else{
              this.setState({
                c_move:false,
                curr:{r:this.state.curr.r,c:this.state.curr.c-1}
              })
            }
            break;
          case 40 :
            this.setState({
              total_move:this.state.total_move+1
            })
            if (this.state.curr.r===0) {
              this.setState({
                r_move:true,
                curr:{r:this.state.curr.r+1,c:this.state.curr.c}
              })
            } else if(this.state.curr.r>0 && this.state.curr.r<this._nr-1) {
              if(this.state.r_move){
                this.setState({
                  curr:{r:this.state.curr.r+1,c:this.state.curr.c}
                })
              }else{
                this.setState({
                  curr:{r:this.state.curr.r-1,c:this.state.curr.c}
                })
              }
            }else{
              this.setState({
                r_move:false,
                curr:{r:this.state.curr.r-1,c:this.state.curr.c}
              })
            }
  
  
            break;
          default :
            console.log("please enter arrow key to move")
        }
      }else{
        if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode===39 || e.keyCode ===40) {
          this.setState({
            game_started:true
          })
          let r=prompt("Please enter number of rows");
          let c=prompt("Please enter number of columns");
          this.setState({
            __nr:Number(r),
            __nc:Number(c),
            game_open:true
          },()=>{
            if (this.state.game_started) {
              let nr=this.state.__nr;
              let nc=this.state.__nc;
              //alert(nr+","+nc)
              this._nr=nr;
              this._nc=nc;
              let lg=new Logic();
              this._lg=lg;
              let ret=lg.create_logic(this.state.__nr,this.state.__nc)
              lg.logger(ret)
              this.setState({
                gameBoard:ret.arr,
                pos:ret.pos
              })
            }
          })
        } else {
          alert("please enter arrow key to start")
        }
      }


      //console.log("("+this.state.curr.r+","+this.state.curr.c+")")
      if(this.state.gameBoard[this.state.curr.r][this.state.curr.c]===1){
        this.state.gameBoard[this.state.curr.r][this.state.curr.c]=0;
        this.setState({eaten_food:this.state.eaten_food+1},()=>{
          if (this.state.eaten_food==this.state.pos.length-1) {
            
            //alert("game over")
            this.setState({
              game_open:false
            })
          }
        })

          /*if (this.state.pos.length==0) {
            alert("game is over .... total move taken to eat all is"+this.state.total_move)
          }*/
      }
    }))
  }
  render() {
    return (
      <div className="App">
        {
          (this.state.game_started)?(
            <div>
        {
          (this.state.game_open)?(
            <table style={{borderStyle: "dashed",cellspacing:30}} >
            <tbody>
              {
                this.state.gameBoard.map( (a,b)=>{
                  return(
                    <tr key={b} >
                      {
                        a.map( (m,n)=>{
                          if (n===this.state.curr.c&& b===this.state.curr.r) {
                            return (
                              <td key={n} style={{borderColor:"red",borderWidth:"4px",width:"50px",height:"50px"}} >
                                <img style={{borderColor:"black",borderWidth:"1px",width:"50px",height:"50px",color:"white",borderRadius:"50%"}} src={Image.mario} />
                              </td>
                            )
                          } else {
                            if (m!==0) {
                              return (
                                <td key={n} style={{borderColor:"black",borderWidth:"1px",width:"50px",height:"50px",color:"white",}} >
                                  <img style={{borderRadius:"50%",width:"50px",height:"50px"}} src={Image.food} />
                                </td>
                              )
                            } else {
                              return (
                                <td key={n} style={{borderColor:"black",borderWidth:"1px",width:"50px",height:"50px",}} ></td>
                              )
                            }
                          }
                        } )
                      }
                    </tr>
                  )
                } )
              }
            </tbody>
          </table>
          ):false
        }
        
        {/*<button onClick={this._start_eating} >Click me to eat all food</button>*/}
        {
          (this.state.t_l!==0)?(
            <div>
              {
                (!this.state.game_open)?(
                  <p>game over</p>
                ):false
              }
              <p>total move is - {this.state.total_move}</p>
            </div>
          ):false
        }
      </div>
          ):(
            <p>Press any arrow key to start game</p>
          )
        }
        
      </div>
    );
  }
}

export default App;
