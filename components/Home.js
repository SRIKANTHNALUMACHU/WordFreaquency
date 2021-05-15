import React, { Component } from 'react'

export default class Home extends Component {

    state={
        data:''
    }
    GetTopWords=()=>{
        var passage=this.state.data;
        var words=passage.split(' ');
        var dictionary={};
        for(let i of words){
            if(dictionary[i]!=undefined){
                dictionary[i]+=1;
            }
            else{
                dictionary[i]=1;
            }
        }
        
        dictionary= Object.entries(dictionary).sort((a,b)=>b[1]-a[1]);
        let selectitems=Object.entries(dictionary).splice(0,document.getElementById('number').value)
        this.buildtable(selectitems);
    }
    buildtable=(dict)=>{
        let count=1;
        var table=document.getElementById('tbody');
        for(let i of dict){
            var column=document.createElement('tr');
            var th1=document.createElement('th');
            th1.innerHTML=i[1][0];
            var th2=document.createElement('th');
            th2.innerHTML=i[1][1];
            var th3=document.createElement('th');
            th3.innerHTML=count;
            column.appendChild(th3)
            column.appendChild(th1);
            column.appendChild(th2);
            count++;
            table.appendChild(column);
        }
    }
    getwords=()=>{
        let number=document.getElementById('number').value;
        console.log(number);
        if(number!=undefined && number!="")
        {
            this.setState({data:'loading....'});
            fetch("https://raw.githubusercontent.com/invictustech/test/main/README.md").then(response=>response.text()).then(data=>{this.setState({data});this.GetTopWords()});
    
        }
        else{
            alert("Invalid Input");
        }
            }
    render() {
        return (
            <div>
                <h1>Welcome</h1>
                <div class="card text-left bg-dark text-white m-5">
                  <div class="card-body">
                    <h4 class="card-title">Words Analyse</h4>
                    <p class="card-text">Hi lets enjoy</p>

               <div class="form-group">
                 <label for="">Enter a Number</label>
                 <input type="number"
                   class="form-control" name="" id="number" aria-describedby="helpId" placeholder=""/>
               <hr></hr>
               <button onClick={this.getwords} type="submit" class="btn btn-primary">Submit</button>
               </div>

                  </div>
                  
                </div>
                <div class="container bg-dark p-2 m-5 text-white">
                      {this.state.data!==''?<p>{this.state.data}</p>:null}
                  </div>
                  <div id='words' class="container bg-dark p-2 m-5 text-white">
                      <table class="table">
                          <thead>
                              <tr class='text-white'>
                              <th>S.No</th>
                                  <th>Word</th>
                                  <th>Frequency</th>
                              </tr>
                          </thead>
                          <tbody id='tbody' class='text-white'>
                            
                          </tbody>
                      </table>
                  </div>
            </div>
        )
    }
}
