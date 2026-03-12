import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function AdminMap({ complaints }) {

return (

<MapContainer
center={[20.5937,78.9629]}
zoom={5}
style={{height:"400px",width:"100%"}}
>

<TileLayer
url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>

{complaints.map((c)=>{

if(!c.latitude || !c.longitude) return null;

return(

<Marker key={c._id} position={[c.latitude,c.longitude]}>

<Popup>

<b>Complaint</b><br/>
{c.description}<br/>
Status: {c.status}

</Popup>

</Marker>

);

})}

</MapContainer>

);

}

export default AdminMap;