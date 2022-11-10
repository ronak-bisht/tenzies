export default function(props){
    const style={
        backgroundColor: props.value.isHeld ? "#59E391" : "white",
        color:props.value.isHeld?"white":"black"
    }
    return(
        <div className="die" style={style} onClick={()=>props.change(props.value.id)}>
            <button style={style}>{props.value.value}</button>
           
        </div>
    )
}