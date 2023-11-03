import React from "react";

class ComponentUI extends React.Component{    
    count = 0;
    constructor(props){        
        super(props);
        this.state = {stateCount:this.count};
    }
    //after render the first time
    componentDidMount(){
        this.count = 1;
        console.log("props", this.props);
    }

    //after any update but not in the first render
    componentDidUpdate (prevProps, prevState, snapshot){
        console.log("current props", this.props);
        console.log("current state", this.state);
        console.log("prev props", prevProps);
        console.log("prev state", prevState);
        console.log("snapshot", snapshot);      
          
    }

    componentDidCatch(error){
        console.log("error", error);
    }

    componentWillUnmount(){

    }

    render(){
        return (
        <>
            count {this.count}
            statecount {this.state.stateCount}
            <button onClick={()=>{ this.count++; this.state.stateCount++; this.setState({stateCount: this.state.stateCount})  }}> Click</button>
        </>
        );
    }
}

export default ComponentUI;