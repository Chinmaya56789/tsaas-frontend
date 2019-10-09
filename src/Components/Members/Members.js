import React,{Component} from 'react';
import Member from './Member/Member';
import Aux from '../../Hoc/Aux';
import axios from 'axios'
import classes from './Members.css';
import {withRouter} from 'react-router-dom';
import HostName from '../../assets/globalvaribles/GlobalVariables'
class Members extends Component{
    state={
        percent:null,
        landmarkString:"",
        autoCompleteArr:[],
        query:"",
        lat:null,
        lng:null,
        showMap:false,
        setMapSearchText:''
    }
    componentDidMount(){
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event){
            window.history.pushState(null, document.title,  window.location.href);
        });
    }
    componentWillMount(){
        const familyID=this.props.match.params.id
        axios.defaults.xsrfCookieName = 'csrftoken'
        axios.defaults.xsrfHeaderName = 'X-CSRFToken'
        
        axios.get(HostName+"family/"+familyID+"/")
                    .then((response)=>{
                        // if(currentID)                
                        console.log(response)
                    })
                    .catch(err =>{} 
                        
                        );
    }
    mapShowHandler=(searchText)=>{
        this.setState({showMap:true,setMapSearchText:searchText})
    }
    percentageHandler=(value)=>{
        this.setState({percent:value});
    }
    landmarkHandler=(value)=>{
        this.setState({landmarkString:value})
    }
    setMarkerQuery=(query)=>{
        this.setState({query:query})
    }
    dragLatHandler=(lat,lng)=>{
        this.setState({lat:lat,lng:lng})
    }
    autocompleteArrayHandler=(array)=>{
        this.setState({autoCompleteArr:[]})
        const displayArr=[...array];
        const displayUniqueArr=[];
        let count=0;
        let found=false; 
        let len=displayArr.length; 
        for(let i=0;i<len;i++){
            for(let j=0;j<displayUniqueArr;j++){
                if(displayArr[i]===displayUniqueArr[j])
                {
                    found=true
                }
            }
            count++;
            if(count===1&&found===false){
                displayUniqueArr.push(displayArr[i]);
            }
            count=0;
            found=false;
            
        }
        this.setState({autoCompleteArr:displayUniqueArr},()=>{
            // console.log(this.state.autoCompleteArr,"ugvytyryfrccyf")
        });
        
    }
    render(){
    return(
        <Aux>
        
        <div className={classes.MembersInner}
        // className="container-fluid my-5 mx-auto px-5" 
        >
        <div className={classes.MapMemberWrapper}
        // className="row flex-column-reverse flex-md-row" 
        style={{boxShadow: 'rgba(0, 0, 0, 0.15) 0px 27px 51.33px 7.67px', borderRadius: '10px',flexFlow:'column'}}>
            <div style={{width:'100%',boxSizing:'border-box',padding:'25px',fontSize:'32px',textAlign:'center',paddingBottom:'5px'}}><p style={{color:'rgb(41, 129, 185)'}}>Member Information</p></div>    
        {/* {this.state.showMap?<div style={{flex:'2'}} >
        <MainMaps mapLocation={this.state.setMapSearchText} dragLatHandler={this.dragLatHandler} markerQuery={this.state.query} searchText={this.state.landmarkString}  autocompleteArrayHandler={this.autocompleteArrayHandler}></MainMaps>
        </div>:null} */}
        <div className={classes.MemberWrapper}>
        {/* <ProgressBar total={10} transformValue={this.state.percent}>
        1 </ProgressBar> */}
        <Member
            lat={this.state.lat}
            lng={this.state.lng}
            familyId={this.props.match.params.id}
            setMarkerQuery={this.setMarkerQuery}
            autoCompleteArr={this.state.autoCompleteArr} 
            percentFind={this.percentageHandler}
            mapShow={this.mapShowHandler}
            landmarkTransfer={this.landmarkHandler}
        // membInfo={props.membInfo} changedMem={props.changedMems}
        >
        </Member>
        </div>
        </div>
        {/* </div> */}
        </div>
        </Aux>
    )
    }
}
export default withRouter(Members);